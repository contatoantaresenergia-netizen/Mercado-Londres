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
    }
  ];

  useEffect(() => {
    async function carregarProdutos() {
      setLoading(true);
      try {
        // Busca os dados da tabela 'produtos' que vi no seu painel
        const { data, error } = await supabase
          .from('produtos')
          .select('*')
          .limit(8);

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

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <section className="relative h-[500px] overflow-hidden">
        {banners.map((banner, index) => (
          <div key={banner.id} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgColor} opacity-90`}></div>
            <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: `url(${banner.image})` }}></div>
            <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
              <div className="text-white">
                <h2 className="text-5xl md:text-7xl font-black mb-4">{banner.title}</h2>
                <button onClick={() => router.push('/produtos')} className="bg-yellow-400 text-green-900 font-bold px-8 py-4 rounded-lg text-lg">Comprar Agora</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Produtos em Destaque */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Produtos em Destaque</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">A carregar produtos do mercado...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
