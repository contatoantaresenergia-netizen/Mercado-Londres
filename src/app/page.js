'use client'

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/app/components/ProductCard';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        // Esta linha liga-se à sua tabela 'produtos' e puxa tudo (Barra de Chocolate, etc.)
        const { data, error } = await supabase
          .from('produtos')
          .select('*');

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error.message);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  if (loading) {
    return <div className="flex justify-center py-20">A carregar produtos do mercado...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Nossos Produtos
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              Nenhum produto encontrado no banco de dados.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
