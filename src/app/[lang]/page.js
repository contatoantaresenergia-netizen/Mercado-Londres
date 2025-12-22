'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Truck, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import ProductCard from '@/app/components/ProductCard'; // Verifique se este caminho está correto
import { supabase } from '@/lib/supabase';
import { getDictionary } from '@/lib/get-dictionary';

export default function HomePage({ params }) {
  const router = useRouter();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dict, setDict] = useState(null);
  const [lang, setLang] = useState('pt');

  useEffect(() => {
    async function loadData() {
      try {
        // Resolve o idioma dos parâmetros (necessário no Next.js 15)
        const resolvedParams = await params;
        const currentLang = resolvedParams.lang || 'pt';
        setLang(currentLang);

        // Carrega o dicionário JSON correspondente
        const dictionary = await getDictionary(currentLang);
        setDict(dictionary);

        // Carrega produtos
        const { data, error } = await supabase.from('produtos').select('*').limit(8);
        if (error) throw error;
        setFeaturedProducts(data || []);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params]);

  // Enquanto o dicionário carrega, mostra um estado de loading para evitar erro de undefined
  if (!dict) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const banners = [
    {
      id: 1,
      title: lang === 'pt' ? 'BOLOS DE NATAL 🎄' : 'CHRISTMAS CAKES 🎄',
      subtitle: lang === 'pt' ? 'Tradição Portuguesa' : 'Portuguese Tradition',
      image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=1200&h=500&fit=crop',
      bgColor: 'from-green-700 to-green-600',
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-[500px] overflow-hidden">
        {banners.map((banner, index) => (
          <div key={banner.id} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgColor} opacity-90`}></div>
            <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center text-white">
              <div>
                <h2 className="text-5xl md:text-7xl font-black mb-4">{banner.title}</h2>
                <p className="text-2xl md:text-3xl mb-8">{banner.subtitle}</p>
                <button 
                  onClick={() => router.push(`/${lang}/produtos`)} 
                  className="bg-yellow-400 text-green-900 font-bold px-8 py-4 rounded-lg flex items-center gap-2 mx-auto"
                >
                  {lang === 'pt' ? 'Comprar Agora' : 'Shop Now'} <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="py-16 bg-white text-center">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">
          {lang === 'pt' ? 'Produtos em Destaque' : 'Featured Products'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto px-4">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
