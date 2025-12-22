'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../../components/ProductCard'; 
import { supabase } from '../../lib/supabase';
import { getDictionary } from '../../lib/get-dictionary';

export default function HomePage({ params }) {
  const router = useRouter();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dict, setDict] = useState(null);
  const [lang, setLang] = useState('pt');

  useEffect(() => {
    async function loadData() {
      try {
        const resolvedParams = await params;
        const currentLang = resolvedParams.lang || 'pt';
        setLang(currentLang);

        const dictionary = await getDictionary(currentLang);
        setDict(dictionary);

        const { data, error } = await supabase.from('produtos').select('*').limit(8);
        if (error) throw error;
        setFeaturedProducts(data || []);
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params]);

  if (!dict) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;

  return (
    <div className="min-h-screen">
      <section className="relative h-[500px] flex items-center justify-center bg-green-700 text-white">
        <div className="text-center">
          <h2 className="text-5xl font-black mb-4">
            {lang === 'pt' ? 'BOLOS DE NATAL 🎄' : 'CHRISTMAS CAKES 🎄'}
          </h2>
          <button 
            onClick={() => router.push(`/${lang}/produtos`)}
            className="bg-yellow-400 text-green-900 font-bold px-8 py-4 rounded-lg flex items-center gap-2 mx-auto"
          >
            {lang === 'pt' ? 'Comprar Agora' : 'Shop Now'} <ArrowRight />
          </button>
        </div>
      </section>

      <section className="py-16 text-center">
        <h2 className="text-4xl font-bold mb-8">
          {lang === 'pt' ? 'Produtos em Destaque' : 'Featured Products'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 container mx-auto px-4">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
