'use client'

import React, { useState, useEffect } from 'react';
import ProductCard from '@/app/components/ProductCard';
import { Search, Filter } from 'lucide-react';
import { supabase } from '@/lib/supabase'; // Importando a conexão

export default function ProdutosPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // BUSCA REAL DO SUPABASE
  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('produtos')
          .select('*');

        if (error) throw error;
        if (data) {
          setProducts(data);
          setFilteredProducts(data);
        }
      } catch (error) {
        console.error('Erro ao carregar produtos:', error.message);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  // LÓGICA DE FILTRO (Permanece igual, mas agora com dados reais)
  useEffect(() => {
    let filtered = products;

    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, category, products]);

  // Extrai categorias únicas do banco de dados automaticamente
  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

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
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-800"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
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
              <p className="mt-4 text-gray-600">Carregando mercado...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-600 mb-4">Nenhum produto encontrado</p>
              <button
                onClick={() => { setSearchTerm(''); setCategory('all'); }}
                className="bg-green-600 text-white font-bold px-6 py-3 rounded-lg"
              >
                Ver Tudo
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 text-gray-600">
                Mostrando <span className="font-bold text-gray-900">{filteredProducts.length}</span> produtos
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
