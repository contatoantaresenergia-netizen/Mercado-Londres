'use client'

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/app/components/ProductCard';
import { Search, Filter } from 'lucide-react';

function ProdutosContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const lang = params.lang || 'pt';
  
  const categoriaAtiva = searchParams.get('categoria') || 'todos';
  
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');

  const categorias = [
    { id: 'todos', name: { pt: 'Todos', en: 'All' } },
    { id: 'bebidas', name: { pt: 'Bebidas', en: 'Beverages' } },
    { id: 'doces', name: { pt: 'Doces', en: 'Sweets' } },
    { id: 'mercearia', name: { pt: 'Mercearia', en: 'Grocery' } },
    { id: 'congelados', name: { pt: 'Congelados', en: 'Frozen' } },
    { id: 'higiene', name: { pt: 'Higiene', en: 'Hygiene' } }
  ];

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        let query = supabase.from('produtos').select('*');

        // Filtro de Categoria
        if (categoriaAtiva !== 'todos') {
          query = query.ilike('category', categoriaAtiva);
        }

        // Filtro de Busca por Texto
        if (busca.trim()) {
          query = query.ilike('name', `%${busca}%`);
        }

        const { data, error } = await query;
        if (error) throw error;
        setProdutos(data?.filter(p => p && p.id) || []);
      } catch (err) {
        console.error("Erro ao carregar:", err);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, [categoriaAtiva, busca]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* SIDEBAR - Categorias */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-md lg:sticky lg:top-4 border">
              <h2 className="flex items-center gap-2 font-bold text-xl mb-6 text-gray-800">
                <Filter className="w-5 h-5 text-green-600" /> 
                {lang === 'pt' ? 'Categorias' : 'Categories'}
              </h2>
              <div className="space-y-2">
                {categorias.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      const link = cat.id === 'todos' 
                        ? `/${lang}/produtos` 
                        : `/${lang}/produtos?categoria=${cat.id}`;
                      router.push(link);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all font-medium ${
                      categoriaAtiva.toLowerCase() === cat.id.toLowerCase()
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {cat.name[lang]}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 min-w-0">
            
            {/* Barra de Busca */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 border">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={lang === 'pt' ? 'Buscar produtos...' : 'Search products...'}
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2 capitalize">
                {categoriaAtiva === 'todos' 
                  ? (lang === 'pt' ? 'Todos os Produtos' : 'All Products')
                  : categorias.find(c => c.id === categoriaAtiva)?.name[lang] || categoriaAtiva}
              </h1>
              <p className="text-gray-600">
                {loading 
                  ? (lang === 'pt' ? 'Carregando...' : 'Loading...') 
                  : `${produtos.length} ${lang === 'pt' ? 'produtos encontrados' : 'products found'}`}
              </p>
            </div>

            {/* Grid de Produtos */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600"></div>
              </div>
            ) : produtos.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center border">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {lang === 'pt' ? 'Nenhum produto encontrado' : 'No products found'}
                </h3>
                <p className="text-gray-600">
                  {lang === 'pt' 
                    ? 'Tente ajustar os filtros ou a busca' 
                    : 'Try adjusting the filters or search'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {produtos.map((produto) => (
                  <ProductCard 
                    key={produto.id} 
                    product={produto} 
                    lang={lang} 
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function ProdutosPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600"></div>
      </div>
    }>
      <ProdutosContent />
    </Suspense>
  );
}
