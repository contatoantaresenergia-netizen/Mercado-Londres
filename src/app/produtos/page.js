'use client'

// ⬇️ ADICIONA ESTA LINHA AQUI
export const dynamic = 'force-dynamic'

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
                onChange={(e) => setSearchT
