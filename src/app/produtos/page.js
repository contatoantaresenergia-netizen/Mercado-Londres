'use client'

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/app/components/ProductCard';

// 1. Criamos um componente que lida apenas com a lista
function ListaDeProdutos() {
  const searchParams = useSearchParams();
  const categoriaAtiva = searchParams.get('categoria');
  
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        let query = supabase.from('produtos').select('*');

        if (categoriaAtiva) {
          query = query.ilike('category', categoriaAtiva);
        }

        const { data, error } = await query;
        if (error) throw error;
        setProdutos(data || []);
      } catch (err) {
        console.error("Erro ao carregar:", err);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, [categoriaAtiva]);

  if (loading) {
    return <div className="text-center p-20">Carregando produtos...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {produtos.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
      {produtos.length === 0 && (
        <p className="col-span-full text-center py-10 text-gray-500">
          Nenhum produto encontrado.
        </p>
      )}
    </div>
  );
}

// 2. O componente principal ENVOLVE tudo em Suspense para não dar erro na Vercel
export default function ProdutosPage() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Produtos</h1>
      <Suspense fallback={<div className="text-center">Preparando vitrine...</div>}>
        <ListaDeProdutos />
      </Suspense>
    </div>
  );
}
