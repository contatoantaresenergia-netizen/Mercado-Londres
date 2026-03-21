'use client'
import React from 'react';
import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ product, lang = 'pt' }) {
  if (!product) return null;

  const price = Number(product?.price || 0);
  const stock = product?.stock ?? 0;

  const handleAddToCart = () => {
    console.log('Adicionar ao carrinho:', product?.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 flex flex-col h-full">
      {/* Imagem */}
      <div className="relative w-full bg-gray-50 flex items-center justify-center overflow-hidden h-[36rem] sm:h-[30rem] lg:h-[34rem]">
        {product?.image_url ? (
          <img
            src={product.image_url}
            alt={product?.name || 'Produto'}
            className="w-full h-full object-contain p-8 hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
            📦
          </div>
        )}

        {stock !== undefined && (
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
            stock > 50
              ? 'bg-green-100 text-green-800'
              : stock > 0
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          }`}>
            {stock > 0
              ? `${stock} ${lang === 'pt' ? 'em estoque' : 'in stock'}`
              : lang === 'pt' ? 'Esgotado' : 'Out of stock'}
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
          {product?.name || 'Produto'}
        </h3>

        {product?.category && (
          <span className="text-xs text-gray-500 mb-3 capitalize">
            {product.category}
          </span>
        )}

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-green-600">
              £{price.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={stock === 0}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all ${
              stock === 0
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
