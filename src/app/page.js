'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Truck, ShieldCheck, Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '@/app/components/ProductCard';

export default function HomePage() {
  const router = useRouter();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Banners do carrossel
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

  // Categorias em destaque
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

  useEffect(() => {
    // Array aumentado para 8 produtos (2 fileiras de 4)
    const mockProducts = [
      {
        id: '1',
        name: 'Pão de Queijo (500g)',
        description: 'Pão de queijo mineiro congelado, pronto para assar',
        price: 8.99,
        image_url: '/images/produtos/pao-queijo.jpg',
        origin: 'Brasil',
        stock: 50,
      },
      {
        id: '2',
        name: 'Guaraná Antarctica (2L)',
        description: 'O refrigerante brasileiro mais famoso',
        price: 3.99,
        image_url: 'https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/lata%20de%20guarana%206%20un.webp',
        origin: 'Brasil',
        stock: 100,
      },
      {
        id: '3',
        name: 'Açaí Puro (1kg)',
        description: 'Polpa de açaí congelada 100% natural',
        price: 12.99,
        image_url: 'https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/4ADDD686-459C-4CF8-861E-98BB34EAA224%20(1).webp',
        origin: 'Brasil',
        stock: 30,
      },
      {
        id: '4',
        name: 'Brigadeiro Gourmet (1 un)',
        description: 'Brigadeiros artesanais feitos com chocolate belga',
        price: 9.99,
        image_url: '/images/produtos/brigadeiro.jpg',
        origin: 'Brasil',
        stock: 25,
      },
      {
        id: '5',
        name: 'Feijão Preto (1kg)',
        description: 'Feijão tipo 1 para feijoada premium',
        price: 4.50,
        image_url: '/images/produtos/feijao.jpg',
        origin: 'Brasil',
        stock: 40,
      },
      {
        id: '6',
        name: 'Farofa Temperada (500g)',
        description: 'Farofa crocante com tempero caseiro',
        price: 3.80,
        image_url: '/images/produtos/farofa.jpg',
        origin: 'Brasil',
        stock: 60,
      },
      {
        id: '7',
        name: 'Doce de Leite (400g)',
        description: 'Doce de leite cremoso tradicional',
        price: 7.50,
        image_url: '/images/produtos/doce-leite.jpg',
        origin: 'Brasil',
        stock: 15,
      },
      {
        id: '8',
        name: 'Coração de Frango (1kg)',
        description: 'Coração de frango temperado para churrasco',
        price: 11.99,
        image_url: 'https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/663D3233-E1D0-4FE7-AE11-34D2BD69EAC4.webp',
        origin: 'Brasil',
        stock: 20,
      },
    ];

    setTimeout(() => {
      setFeaturedProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="min-h-screen">
      {/* Banner Carousel */}
      <section className="relative h-[500px] overflow-hidden">
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
                <button
                  onClick={() => router.push('/produtos')}
                  className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold px-8 py-4 rounded-lg text-lg transition inline-flex items-center gap-2 shadow-xl"
                >
                  Comprar Agora <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 p-3 rounded-full z-10"><ChevronLeft className="w-8 h-8 text-white" /></button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 p-3 rounded-full z-10"><ChevronRight className="w-8 h-8 text-white" /></button>
      </section>

      {/* Categories */}
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
                className="relative h-80 rounded-xl overflow-hidden cursor-pointer group shadow-lg"
              >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${category.image})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-2xl font-black uppercase">{category.name}</h3>
                  <p className="text-sm text-gray-200 mb-4">{category.subtitle}</p>
                  <div className="inline-flex items-center gap-2 text-yellow-400 font-semibold">Ver Produtos <ArrowRight className="w-5 h-5" /></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <BenefitItem icon={<Truck />} title="Entrega Rápida" desc="Frete grátis acima de £50" />
            <BenefitItem icon={<ShieldCheck />} title="Produtos Autênticos" desc="Importados direto do Brasil" />
            <BenefitItem icon={<Clock />} title="Atendimento Dedicado" desc="Suporte em português" />
          </div>
        </div>
      </section>

      {/* Featured Products - AQUI É ONDE AS 2 FILEIRAS APARECEM */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Produtos em Destaque</h2>
            <p className="text-gray-600 text-lg">Os queridinhos dos nossos clientes</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            /* O segredo está aqui: lg:grid-cols-4 com 8 produtos gera 2 linhas */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <button
              onClick={() => router.push('/produtos')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-lg transition"
            >
              Ver Todos os Produtos
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Saudade do Brasil? 🇧🇷</h2>
          <p className="text-xl mb-8">Receba produtos brasileiros frescos e autênticos em casa</p>
          <button onClick={() => router.push('/produtos')} className="bg-yellow-400 text-green-900 font-bold px-8 py-4 rounded-lg text-lg">Comece a Comprar Agora</button>
        </div>
      </section>
    </div>
  );
}

// Componente auxiliar para os benefícios
function BenefitItem({ icon, title, desc }) {
  return (
    <div className="text-center">
      <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
