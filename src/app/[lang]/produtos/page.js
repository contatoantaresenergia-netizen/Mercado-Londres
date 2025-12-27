import React from 'react';
import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ product, lang }) {
  const handleAddToCart = () => {
    // Lógica de adicionar ao carrinho
    console.log('Adicionar ao carrinho:', product.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 flex flex-col h-full">
      {/* Imagem do Produto - RESPONSIVA */}
      <div className="relative w-full bg-gray-50 flex items-center justify-center overflow-hidden h-[28rem] sm:h-[30rem] lg:h-[34rem]">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-contain p-8 hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
            📦
          </div>
        )}
        
        {/* Badge de Estoque */}
        {product.stock !== undefined && (
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
            product.stock > 50 
              ? 'bg-green-100 text-green-800' 
              : product.stock > 0 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-red-100 text-red-800'
          }`}>
            {product.stock > 0 
              ? `${product.stock} ${lang === 'pt' ? 'em estoque' : 'in stock'}`
              : lang === 'pt' ? 'Esgotado' : 'Out of stock'}
          </div>
        )}
      </div>

      {/* Conteúdo do Card */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Nome do Produto */}
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        {/* Categoria */}
        {product.category && (
          <span className="text-xs text-gray-500 mb-3 capitalize">
            {product.category}
          </span>
        )}

        {/* Preço e Botão */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-green-600">
              £{product.price.toFixed(2)}
            </span>
          </div>

          {/* Botão Adicionar ao Carrinho */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all ${
              product.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700 active:scale-95'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            {lang === 'pt' ? 'Adicionar ao Carrinho' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
