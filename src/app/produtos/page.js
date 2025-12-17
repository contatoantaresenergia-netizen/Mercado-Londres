'use client'

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/app/components/ProductCard';
import { Search, Filter } from 'lucide-react';

function ProdutosContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoriaAtiva = searchParams.get('categoria') || 'Todos';
  
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');

  const categorias = ['Todos', 'Bebidas', 'Doces', 'Mercearia', 'Congelados', 'Higiene'];

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        let query = supabase.from('produtos').select('*');

        // Filtro de Categoria
        if (categoriaAtiva !== 'Todos') {
          query = query.ilike('category', categoriaAtiva);
        }

        // Filtro de Busca por Texto
        if (busca) {
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
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* MENU LATERAL (Categorias) */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-xl shadow-md sticky top-24">
            <h2 className="flex items-center gap-2 font-bold text-lg mb-4 text-gray-800">
              <Filter className="w-5 h-5 text-green-600" /> Categorias
            </h2>
            <ul className="space-y-2">
              {categorias.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => router.push(cat === 'Todos' ? '/produtos' : `/produtos?categoria=${cat.toLowerCase()}`)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      categoriaAtiva.toLowerCase() === cat.toLowerCase()
                        ? 'bg-green-600 text-white font-bold'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* ÁREA PRINCIPAL (Busca + Produtos) */}
        <main className="flex-1">
          {/* BARRA DE PESQUISA */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-none shadow-md focus:ring-2 focus:ring-green-500 outline-none text-lg"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
          </div>

          <h2 className="text-2xl font-bold mb-6 text-gray-700 capitalize">
            {categoriaAtiva === 'Todos' ? 'Todos os Produtos' : categoriaAtiva}
          </h2>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {produtos.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
              {produtos.length === 0 && (
                <div className="col-span-full text-center py-20 bg-white rounded-xl shadow-sm">
                  <p className="text-gray-500 text-lg">Nenhum produto encontrado para sua busca.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ProdutosPage() {
  return (
    <Suspense fallback={<div className="container mx-auto p-10">Carregando interface...</div>}>
      <ProdutosContent />
    </Suspense>
  );
}
