// ============================================
// 1. HOMEPAGE (app/[lang]/page.js)
// ============================================
'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/app/components/ProductCard';
import { supabase } from '@/lib/supabase';
import { getDictionary } from '@/lib/get-dictionary';

export default function HomePage() {
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang || 'pt';
  
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dict, setDict] = useState(null);

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
        if (data) setFeaturedProducts(data);
      } catch (error) {
        console.error('Erro:', error.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [lang]);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (!dict) return <div className="min-h-screen animate-pulse bg-gray-100" />;

  const banners = [
    {
      id: 1,
      title: lang === 'pt' ? 'BOLOS DE NATAL 🎄' : 'CHRISTMAS CAKES 🎄',
      subtitle: lang === 'pt' ? 'Tradição Portuguesa' : 'Portuguese Tradition',
      image: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=1200&h=500&fit=crop',
      bgColor: 'from-green-700 to-green-600',
    },
    {
      id: 2,
      title: lang === 'pt' ? 'VINHOS PORTUGUESES 🍷' : 'PORTUGUESE WINES 🍷',
      subtitle: lang === 'pt' ? 'Seleção Premium' : 'Premium Selection',
      image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1200&h=500&fit=crop',
      bgColor: 'from-red-800 to-red-700',
    },
    {
      id: 3,
      title: lang === 'pt' ? 'QUEIJOS ARTESANAIS 🧀' : 'ARTISAN CHEESES 🧀',
      subtitle: lang === 'pt' ? 'Sabor Autêntico' : 'Authentic Flavor',
      image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=1200&h=500&fit=crop',
      bgColor: 'from-yellow-600 to-yellow-500',
    }
  ];

  const categories = [
    {
      name: lang === 'pt' ? 'Bolos' : 'Cakes',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
      link: `/${lang}/produtos?categoria=bolos`
    },
    {
      name: lang === 'pt' ? 'Biscoitos' : 'Cookies',
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=300&fit=crop',
      link: `/${lang}/produtos?categoria=biscoitos`
    },
    {
      name: lang === 'pt' ? 'Doces' : 'Sweets',
      image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&h=300&fit=crop',
      link: `/${lang}/produtos?categoria=doces`
    },
    {
      name: lang === 'pt' ? 'Bebidas' : 'Beverages',
      image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
      link: `/${lang}/produtos?categoria=bebidas`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section com Banner Rotativo */}
      <section className="relative h-[500px] overflow-hidden">
        {banners.map((banner, index) => (
          <div 
            key={banner.id} 
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgColor} opacity-90`}></div>
            <div 
              className="absolute inset-0 bg-cover bg-center mix-blend-overlay" 
              style={{ backgroundImage: `url(${banner.image})` }}
            ></div>
            <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center text-white">
              <div>
                <h2 className="text-5xl md:text-7xl font-black mb-4 drop-shadow-lg">
                  {banner.title}
                </h2>
                <p className="text-2xl md:text-3xl mb-8 drop-shadow-md">
                  {banner.subtitle}
                </p>
                <button 
                  onClick={() => router.push(`/${lang}/produtos`)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold px-8 py-4 rounded-lg text-lg transition inline-flex items-center gap-2 shadow-xl"
                >
                  {lang === 'pt' ? 'Comprar Agora' : 'Shop Now'} 
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Indicadores */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-yellow-400 w-8' : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categorias */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {lang === 'pt' ? 'Nossas Categorias' : 'Our Categories'}
            </h2>
            <p className="text-gray-600 text-lg">
              {lang === 'pt' 
                ? 'Explore nossa variedade de produtos portugueses' 
                : 'Explore our variety of Portuguese products'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div 
                key={index}
                onClick={() => router.push(category.link)}
                className="group relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.image})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-2xl font-bold drop-shadow-lg">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-gray-800 text-center">
            {lang === 'pt' ? 'Produtos em Destaque' : 'Featured Products'}
          </h2>
          
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  lang={lang}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


// ============================================
// 2. PÁGINA DE PRODUTOS (app/[lang]/produtos/page.js)
// ============================================
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

        if (categoriaAtiva !== 'todos') {
          query = query.ilike('category', categoriaAtiva);
        }

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
            <div className="bg-white p-6 rounded-lg shadow-md lg:sticky lg:top-4">
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
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
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
                  ? (lang === 'pt' ? 'Todos Os Produtos' : 'All Products')
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
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
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
