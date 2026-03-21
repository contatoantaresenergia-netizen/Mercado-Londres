'use client'
import React, { useState, useEffect } from 'react';
import ProductCard from '@/app/components/ProductCard';
import { supabase } from '@/lib/supabase';

export default function ProdutosPage({ params }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('pt');

  useEffect(() => {
    async function loadData() {
      try {
        const resolvedParams = await params;
        const currentLang = resolvedParams?.lang || 'pt';
        setLang(currentLang);

        const { data, error } = await supabase.from('produtos').select('*');
        if (error) throw error;
        if (data) setProducts(data);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
          {lang === 'pt' ? 'Todos os Produtos' : 'All Products'}
        </h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            {lang === 'pt' ? 'Nenhum produto encontrado.' : 'No products found.'}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
