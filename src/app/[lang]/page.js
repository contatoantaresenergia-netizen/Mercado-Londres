'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../../_components/ProductCard'; 
import { supabase } from '../../lib/supabase';
import { getDictionary } from '../../lib/get-dictionary';

export default function HomePage() {
  const router = useRouter();
  const params = useParams(); // Use useParams hook em vez de receber via props
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dict, setDict] = useState(null);
  const lang = params.lang || 'pt'; // Acesso direto, sem await

  useEffect(() => {
    async function loadData() {
      try {
        const dictionary = await getDictionary(lang);
        setDict(dictionary);
        
        const { data, error } = await supabase
          .from('produtos')
          .select('*')
          .limit(8);
          
        if (error) throw error;
        
        setFeaturedProducts(data || []);
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [lang]);

  if (!dict) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="relative h-[500px] flex items-center justify-center bg-green-700 text-white">
        <div className="text-center">
          <h2 className="text-5xl font-black mb-4">
            {dict.home?.hero?.title || (lang === 'pt' ? 'BOLOS DE NATAL 🎄' : 'CHRISTMAS CAKES 🎄')}
          </h2>
          <button 
            onClick={() => router.push(`/${lang}/produtos`)}
            className="bg-yellow-400 text-green-900 font-bold px-8 py-4 rounded-lg flex items-center gap-2 mx-auto hover:bg-yellow-500 transition-colors"
          >
            {dict.home?.hero?.cta || (lang === 'pt' ? 'Comprar Agora' : 'Shop Now')} 
            <ArrowRight />
          </button>
        </div>
      </section>

      <section className="py-16 text-center">
        <h2 className="text-4xl font-bold mb-8">
          {dict.home?.featuredTitle || (lang === 'pt' ? 'Produtos em Destaque' : 'Featured Products')}
        </h2>
        
        {loading ? (
          <div className="text-lg">Carregando produtos...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 container mx-auto px-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} lang={lang} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
