'use client'

import React, { useState, useEffect } from 'react';
import ProductCard from '@/app/components/ProductCard';
import { Search, Filter } from 'lucide-react';

export default function ProdutosPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock de produtos - substitua por API real futuramente
    const mockProducts = [
      {
        id: '1',
        name: 'Pão de Queijo (500g)',
        description: 'Pão de queijo mineiro congelado, pronto para assar',
        price: 8.99,
        origin: 'Brasil',
        stock: 50,
        category: 'Congelados',
      },
      {
        id: '2',
        name: 'Guaraná Antarctica (300ml)',
        description: 'O refrigerante brasileiro mais famoso',
        price: 3.99,
        origin: 'Brasil',
        stock: 100,
        category: 'Bebidas',
      },
      {
        id: '3',
        name: 'Açaí Puro (1kg)',
        description: 'Polpa de açaí congelada 100% natural',
        price: 12.99,
        origin: 'Brasil',
        stock: 30,
        category: 'Congelados',
      },
      {
        id: '4',
        name: 'Brigadeiro Gourmet (1 un)',
        description: 'Brigadeiros artesanais feitos com chocolate belga',
        price: 9.99,
        origin: 'Brasil',
        stock: 25,
        category: 'Doces',
      },
      {
        id: '5',
        name: 'Farofa Pronta (500g)',
        description: 'Farofa temperada pronta para servir',
        price: 5.99,
        origin: 'Brasil',
        stock: 40,
        category: 'Alimentos',
      },
      {
        id: '6',
        name: 'Mate Leão (1.5L)',
        description: 'Chá mate gelado sabor limão',
        price: 3.49,
        origin: 'Brasil',
        stock: 80,
        category: 'Bebidas',
      },
      {
        id: '7',
        name: 'Tapioca Granulada (500g)',
        description: 'Tapioca granulada para preparar crepiocas',
        price: 4.99,
        origin: 'Brasil',
        stock: 35,
        category: 'Alimentos',
      },
      {
        id: '8',
        name: 'Goiabada Cascão (600g)',
        description: 'Goiabada tradicional em pasta',
        price: 6.99,
        origin: 'Brasil',
        stock: 20,
        category: 'Doces',
      },
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filtrar por categoria
    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    // Filtrar por busca
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, category, products]);

  const categories = ['all', 'Bebidas', 'Congelados', 'Doces', 'Alimentos'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🇧🇷 Nossos Produtos
          </h1>
          <p className="text-xl">
            Produtos brasileiros autênticos direto para sua casa
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Busca */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
              />
            </div>

            {/* Categorias */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                    category === cat
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {cat === 'all' ? 'Todos' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Produtos */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Carregando produtos...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-600 mb-4">
                Nenhum produto encontrado
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCategory('all');
                }}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg transition"
              >
                Ver Todos os Produtos
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  Mostrando <span className="font-bold">{filteredProducts.length}</span> produto(s)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
