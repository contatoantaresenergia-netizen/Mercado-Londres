'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Truck, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import ProductCard from '@/app/components/ProductCard';

export default function HomePage() {
  const router = useRouter();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        image_url: '/images/produtos/guarana.jpg',
        origin: 'Brasil',
        stock: 100,
      },
      {
        id: '3',
        name: 'Açaí Puro (1kg)',
        description: 'Polpa de açaí congelada 100% natural',
        price: 12.99,
        image_url: '/images/produtos/acai.jpg',
        origin: 'Brasil',
        stock: 30,
      },
      {
        id: '4',
        name: 'Brigadeiro Gourmet (12 unidades)',
        description: 'Brigadeiros artesanais feitos com chocolate belga',
        price: 9.99,
        image_url: '/images/produtos/brigadeiro.jpg',
        origin: 'Brasil',
        stock: 25,
      },
    ];

    setTimeout(() => {
      setFeaturedProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-r from-green-700 via-green-600 to-yellow-500 text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            🇧🇷 Sabor Brasileiro em Londres!
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Os melhores produtos brasileiros entregues na sua porta. Açaí, pão de queijo, guaraná e muito mais!
          </p>
          <button
            onClick={() => router.push('/produtos')}
            className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold px-8 py-4 rounded-lg text-lg transition inline-flex items-center gap-2"
          >
            Ver Todos os Produtos
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
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

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-gray-600 text-lg">
              Os queridinhos dos nossos clientes
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Carregando produtos...</p>
            </div>
          ) : (
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

      <section className="bg-green-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Saudade do Brasil? 🇧🇷
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Receba produtos brasileiros frescos e autênticos na sua casa em Londres
          </p>
          <button
            onClick={() => router.push('/produtos')}
            className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold px-8 py-4 rounded-lg text-lg transition"
          >
            Comece a Comprar Agora
          </button>
        </div>
      </section>
    </div>
  );
}
