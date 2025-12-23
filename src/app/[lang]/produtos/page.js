'use client'
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ProductCard from '../components/ProductCard'; // ✅ CORRIGIDO
import { Search, Filter } from 'lucide-react';

function ProdutosContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const lang = params.lang || 'pt';
  
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
        if (categoriaAtiva !== 'Todos') query = query.ilike('category', categoriaAtiva);
        if (busca) query = query.ilike('name', `%${busca}%`);
        const { data, error } = await query;
        if (error) throw error;
        setProdutos(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, [categoriaAtiva, busca]);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64">
          <div className="bg-white p-6 rounded-xl shadow-md sticky top-24">
            <h2 className="flex items-center gap-2 font-bold mb-4">
              <Filter className="w-5 h-5 text-green-600" /> Categorias
            </h2>
            <ul className="space-y-2">
              {categorias.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => router.push(cat === 'Todos' ? `/${lang}/produtos` : `/${lang}/produtos?categoria=${cat.toLowerCase()}`)}
                    className={`w-full text-left px-4 py-2 rounded-lg ${categoriaAtiva.toLowerCase() === cat.toLowerCase() ? 'bg-green-600 text-white font-bold' : 'text-gray-600 hover:bg-gray-100'}`} // ✅ CORRIGIDO
                  >
                    {cat}
