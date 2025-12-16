'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Truck, ShieldCheck, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/app/components/ProductCard';
import { supabase } from '@/lib/supabase'; // Certifique-se que o caminho está correto

export default function HomePage() {
  const router = useRouter();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Banners do carrossel principal
  const banners = [
    {
      id: 1,
      title: 'TRADITIONAL CHRISTMAS CAKES 🎄',
      subtitle: 'Bolos de Natal Tradicionais Portugueses',
      image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=1200&h=500&fit=crop', // Placeholder
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
  
  // Categorias em destaque (o segundo banner que estava ausente)
  const featuredCategories = [
    {
      id: 1,
      name: 'CHARCUTERIE',
      subtitle: 'Embutidos e Enchidos',
      image: 'https://images.unsplash.com/photo-1542030750-a9adf03b3710?w=400&h=300&fit=crop',
      link: '/produtos?categoria=charcuterie',
    },
    {
      id: 2,
      name: 'COFFEE_TEA',
      subtitle: 'Cafés e Chás Premium',
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop',
      link: '/produtos?categoria=cafe-cha',
    },
    {
      id: 3,
      name: 'CONFECTIONERY',
      subtitle: 'Doces e Biscoitos',
      image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&h=300&fit=crop',
      link: '/produtos?categoria=doces',
    },
    {
      id: 4,
      name: 'DAIRY & CHEESE',
      subtitle: 'Queijos e Laticínios',
      image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400&h=300&fit=crop',
      link: '/produtos?categoria=laticinios',
    },
  ];
  
  // 1. Efeito para carregar produtos do Supabase
  useEffect(() => {
    async function carregarProdutos() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('produtos')
          .select('*')
          .limit(8);

        if (error) throw error;
        if (data) setFeaturedProducts(data);
      } catch (error) {
        // Este erro é vital para saber se a conexão com o Supabase falhou
        console.error('Erro ao conectar ao Supabase:', error.message);
      } finally {
        setLoading(false);
      }
    }
    carregarProdutos();
  }, []);

  // 2. Efeito para fazer o Carrossel rodar automaticamente (Slideshow)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000); // Troca a cada 5 segundos

    return () => clearInterval(interval);
  }, [banners.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="min-h-screen">
      
      {/* 🛑 SEÇÃO 1: BANNER CAROUSEL (Slideshow) 🛑 */}
      <section className="relative h-[500px] overflow-hidden">
        
        {/* Renderização dos Slides */}
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgColor} opacity-90`}></div>
            <div
              className="absolute inset-0 bg-cover bg-center mix-blend-overlay"
              style={{ backgroundImage: `url(${banner.image})` }}
            ></div>
            <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
              <div className="text-white">
                <h2 className="text-5xl md:text-7xl font-black mb-4 drop-shadow-lg">{banner.title}</h2>
                <p className="text-2xl md:text-3xl mb-8 drop-shadow-md">{banner.subtitle}</p>
                <button onClick={() => router.push('/produtos')} className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold px-8 py-4 rounded-lg text-lg transition inline-flex items-center gap-2 shadow-xl">
                  Comprar Agora
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-3 rounded-full transition z-10" aria-label="Anterior">
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-3 rounded-full transition z-10" aria-label="Próximo">
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {banners.map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition ${ index === currentSlide ? 'bg-white scale-125' : 'bg-white/50' }`} aria-label={`Slide ${index + 1}`} />
          ))}
        </div>
      </section>

      {/* 🛑 SEÇÃO 2: FEATURED CATEGORIES (O segundo banner que estava faltando) 🛑 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nossas Categorias</h2>
            <p className="text-gray-600 text-lg">Explore nossos produtos por categoria</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map(category => (
              <div
                key={category.id}
                onClick={() => router.push(category.link)}
                className="relative h-80 rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.image})` }}
                ></div>
                
                {/* Overlay Gradient and Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-black mb-2 uppercase tracking-wide">{category.name}</h3>
                  <p className="text-sm text-gray-200 mb-4">{category.subtitle}</p>
                  <div className="inline-flex items-center gap-2 text-yellow-400 font-semibold group-hover:gap-3 transition-all">
                    Ver Produtos
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 3: PRODUTOS EM DESTAQUE (Conexão Supabase) */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Produtos em Destaque</h2>
            <p className="text-gray-600 text-lg">Os queridinhos dos nossos clientes</p>
          </div>
          
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
            // Mensagem de fallback quando não há produtos (Problema Supabase)
            <p className="text-center text-xl text-gray-500">Nenhum produto encontrado no banco de dados.</p>
          )}

          <div className="text-center mt-12">
            <button onClick={() => router.push('/produtos')} className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-lg transition">
              Ver Todos os Produtos
            </button>
          </div>
        </div>
      </section>
      
      {/* SEÇÃO 4: BENEFÍCIOS (Pequenos banners/ícones) */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">Frete grátis acima de £50</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Produtos Autênticos</h3>
              <p className="text-gray-600">Importados direto do Brasil</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Atendimento Dedicado</h3>
              <p className="text-gray-600">Suporte em português</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: CALL TO ACTION */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Saudade do Brasil? 🇧🇷</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Receba produtos brasileiros frescos e autênticos na sua casa em Londres</p>
          <button onClick={() => router.push('/produtos')} className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold px-8 py-4 rounded-lg text-lg transition">
            Comece a Comprar Agora
          </button>
        </div>
      </section>
      
    </div>
  );
}
