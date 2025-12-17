'use client'

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/app/components/ProductCard';

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('produtos').select('*');
        if (error) throw error;
        // 🛡️ Filtra apenas itens válidos para evitar que a tela fique branca
        setProdutos(data?.filter(p => p && p.id) || []);
      } catch (err) {
        console.error("Erro:", err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProdutos();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Nossos Produtos</h1>
      {produtos.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum produto disponível no momento.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {produtos.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
}
