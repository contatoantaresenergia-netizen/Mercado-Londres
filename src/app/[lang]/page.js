'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Truck, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import ProductCard from '@/app/components/ProductCard';
import { supabase } from '@/lib/supabase';
import { getDictionary } from '@/lib/get-dictionary'; // Importe a função que você criou

// Adicione params aqui para receber o idioma da URL
export default function HomePage({ params }) {
  const router = useRouter();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dict, setDict] = useState(null); // Estado para guardar as traduções

  // O params é uma Promise no Next.js 15+, por isso usamos o unwrap ou useEffect
  const [lang, setLang] = useState('pt');

  useEffect(() => {
    async function loadData() {
      // 1. Resolve o idioma
      const resolvedParams = await params;
      const currentLang = resolvedParams.lang || 'pt';
      setLang(currentLang);

      // 2. Carrega o dicionário JSON
      const dictionary = await getDictionary(currentLang);
      setDict(dictionary);

      // 3. Carrega os produtos do Supabase
      setLoading(true);
      try {
        const { data, error } = await supabase.from('produtos').select('*').limit(8);
        if (error) throw error;
        if (data) setFeaturedProducts(data);
      } catch (error) {
        console.error('Erro:', error.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params]);

  // Se o dicionário ainda não carregou, mostramos um loading simples
  if (!dict) return <div className="min-h-screen animate-pulse bg-gray-100" />;

  const banners = [
    {
      id: 1,
      title: lang === 'pt' ? 'BOLOS DE NATAL 🎄' : 'CHRISTMAS CAKES 🎄',
      subtitle: lang === 'pt' ? 'Tradição Portuguesa' : 'Portuguese Tradition',
      image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=1200&h=500&fit=crop',
      bgColor: 'from-green-700 to-green-600',
    },
    // ... você pode fazer o mesmo para os outros banners
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        {banners.map((banner, index) => (
          <div key={banner.id} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgColor} opacity-90`}></div>
            <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: `url(${banner.image})` }}></div>
            <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center text-white">
              <div>
                <h2 className="text-5xl md:text-7xl font-black mb-4 drop-shadow-lg">{banner.title}</h2>
                <p className="text-2xl md:text-3xl mb-8 drop-shadow-md">{banner.subtitle}</p>
                <button onClick={() => router.push(`/${lang}/produtos`)} className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold px-8 py-4 rounded-lg text-lg transition inline-flex items-center gap-2 shadow-xl">
                  {lang === 'pt' ? 'Comprar Agora' : 'Shop Now'} <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Categorias - Usando o Dicionário */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {lang === 'pt' ? 'Nossas Categorias' : 'Our Categories'}
            </h2>
          </div>
          {/* ... restante do código das categorias */}
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">
          {lang === 'pt' ? 'Produtos em Destaque' : 'Featured Products'}
        </h2>
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto px-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
