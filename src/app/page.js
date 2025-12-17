'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Truck, ShieldCheck, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/app/components/ProductCard';
import { supabase } from '@/lib/supabase';

export default function HomePage() {
  const router = useRouter();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      title: 'TRADITIONAL CHRISTMAS CAKES 🎄',
      subtitle: 'Bolos de Natal Tradicionais Portugueses',
      image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=1200&h=500&fit=crop',
      bgColor: 'from-green-700 to-green-600',
    },
    {
      id: 2,
      title: 'OFERTAS DE NATAL 🎁',
      subtitle: 'Até 30% OFF em produtos selecionados',
      image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1200&h=500&fit=crop',
      bgColor: 'from-red-700 to-red-600',
    },
    {
      id: 3,
      title: 'FRETE GRÁTIS 🚚',
      subtitle: 'Compras acima de £50 - Todo o Reino Unido',
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&h=500&fit=crop',
      bgColor: 'from-blue-700 to-blue-600',
    },
  ];

  const featuredCategories = [
    { id: 1,
     name: 'BEBIDAS',
     subtitle: 'Embutidos e Enchidos',
     image: 'https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/bebida%20400x300.webpv=2'',
     link: '/produtos?categoria=bebidas' },
    { id: 2,
     name: 'DOCES',
     subtitle: 'Cafés e Chás Premium',
     image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop',
     link: '/produtos?categoria=doces' },
    { 
      id: 3,
      name: 'CONFECTIONERY',
      subtitle: 'Doces e Biscoitos', 
      image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&h=300&fit=crop',
      link: '/produtos?categoria=doces' },
    { 
      id: 4, 
      name: 'MERCEARIA', 
      subtitle: 'Queijos e Laticínios', 
      // CORRIGIDO: Aspas fechadas corretamente abaixo
      image: 'https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/mercearia%20%281%29.webp?v=2', 
      link: '/produtos?categoria=mercearia' 
    },
  ];

  useEffect(() => {
    async function carregarProdutos() {
      setLoading(true);
      try {
        const { data, error } = await supabase.from('produtos').select('*').limit(8);
        if (error) throw error;
        if (data) setFeaturedProducts(data);
      } catch (error) {
        console.error('Erro ao conectar ao Supabase:', error.message);
      } finally {
        setLoading(false);
      }
    }
    carregarProdutos();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

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
                <button onClick={() => router.push('/produtos')} className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold px-8 py-4 rounded-lg text-lg transition inline-flex items-center gap-2 shadow-xl">
                  Comprar Agora <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Categorias */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nossas Categorias</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map(category => (
              <div 
                key={category.id} 
                onClick={() => router.push(category.link)} 
                className="relative h-80 rounded-xl overflow-hidden cursor-pointer group shadow-lg"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                  style={{ backgroundImage: `url(${category.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 p-6 text-white w-full">
                  <h3 className="text-2xl font-black uppercase mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-200 mb-3">{category.subtitle}</p>
                  <div className="inline-flex items-center gap-2 text-yellow-400 font-semibold group-hover:translate-x-2 transition-transform">
                    Ver Produtos <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">Produtos em Destaque</h2>
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
