'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import ProductCard from '@/app/components/ProductCard';
import { supabase } from '@/lib/supabase';
import { getDictionary } from '@/lib/get-dictionary';

export default function ProdutosPage({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [dict, setDict] = useState(null);
  const [lang, setLang] = useState('pt');

  const categories = [
    { id: 'todos', name: { pt: 'Todos', en: 'All' } },
    { id: 'bebidas', name: { pt: 'Bebidas', en: 'Beverages' } },
    { id: 'doces', name: { pt: 'Doces', en: 'Sweets' } },
    { id: 'mercearia', name: { pt: 'Mercearia', en: 'Grocery' } },
    { id: 'congelados', name: { pt: 'Congelados', en: 'Frozen' } },
    { id: 'higiene', name: { pt: 'Higiene', en: 'Hygiene' } }
  ];

  useEffect(() => {
    async function loadData() {
      try {
        const resolvedParams = await params;
        const currentLang = resolvedParams?.lang || 'pt';
        setLang(currentLang);

        const dictionary = await getDictionary(currentLang);
        setDict(dictionary);

        // Buscar produtos do Supabase
        const { data, error } = await supabase
          .from('produtos')
          .select('*')
          .order('name', { ascending: true });

        if (error) throw error;
        if (data) {
          setProducts(data);
          setFilteredProducts(data);
        }

        // Verificar se há categoria na URL
        const categoryParam = searchParams.get('categoria');
        if (categoryParam) {
          setSelectedCategory(categoryParam);
        }
      } catch (error) {
        console.error('Erro ao carregar produtos:', error.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [params, searchParams]);

  // Filtrar produtos
  useEffect(() => {
    let filtered = products;

    // Filtrar por categoria
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(p => 
        p.categoria?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filtrar por busca
    if (searchTerm.trim()) {
      filtered = filtered.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, products]);

  if (!dict) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar - Categorias */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 lg:sticky lg:top-4">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-xl">🛒</span>
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  {lang === 'pt' ? 'Categorias' : 'Categories'}
                </h2>
              </div>

              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all font-medium ${
                      selectedCategory === category.id
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.name[lang]}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            
            {/* Barra de Busca */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={lang === 'pt' ? 'Buscar produtos...' : 'Search products...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Header com contador */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {lang === 'pt' ? 'Produtos' : 'Products'}
              </h1>
              <p className="text-gray-600">
                {loading ? (
                  lang === 'pt' ? 'Carregando...' : 'Loading...'
                ) : (
                  `${filteredProducts.length} ${lang === 'pt' ? 'produtos encontrados' : 'products found'}`
                )}
              </p>
            </div>

            {/* Grid de Produtos */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
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
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
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
