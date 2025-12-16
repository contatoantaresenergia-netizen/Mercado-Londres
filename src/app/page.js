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

  // NOVO CÓDIGO: Efeito para fazer a troca automática do Slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      // Avança para o próximo slide
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000); // Troca a cada 5 segundos

    // Limpa o intervalo para evitar erros
    return () => clearInterval(interval);
  }, [banners.length]);


  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="min-h-screen">
      {/* Banner */}
      <section className="relative h-[500px] overflow-hidden">
        {banners.map((banner, index) => (
          <div key={banner.id} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            {/* O resto do código do banner aqui */}
          </div>
        ))}

        {/* CONTROLES (Adicionei para que as setas funcionem, se desejar) */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-30 text-white hover:bg-opacity-50 transition z-10"
          aria-label="Anterior"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-30 text-white hover:bg-opacity-50 transition z-10"
          aria-label="Próximo"
        >
          <ChevronRight size={24} />
        </button>

        {banners.map((banner, index) => (
          <div 
            key={banner.id} 
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgColor} opacity-90`}></div>
            <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: `url(${banner.image})` }}></div>
            <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
              <div className="text-white">
                <h2 className="text-5xl md:text-7xl font-black mb-4">{banner.title}</h2>
                <h3 className="text-2xl font-medium mb-8">{banner.subtitle}</h3> {/* Adicionei o subtítulo aqui para exibição */}
                <button onClick={() => router.push('/produtos')} className="bg-yellow-400 text-green-900 font-bold px-8 py-4 rounded-lg text-lg">Comprar Agora</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Seção de Vantagens (Para substituir os banners laterais ausentes) */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <Truck className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-xl mb-1">Entrega Rápida</h3>
              <p className="text-gray-600">Enviamos para todo o país.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <ShieldCheck className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-xl mb-1">Pagamento Seguro</h3>
              <p className="text-gray-600">Transações protegidas.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <Clock className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-xl mb-1">Suporte 24h</h3>
              <p className="text-gray-600">Estamos aqui para ajudar!</p>
            </div>
          </div>
        </div>
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
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            // Mensagem de fallback quando não há produtos
            <p className="text-center text-xl text-gray-500">Nenhum produto encontrado no banco de dados.</p>
          )}
        </div>
      </section>
    </div>
  );
}
