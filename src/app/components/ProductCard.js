'use client'

import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 bg-gray-100 flex items-center justify-center">
        <div className="text-6xl">
          {product.id === '1' && '🥐'}
          {product.id === '2' && '🥤'}
          {product.id === '3' && '🍇'}
          {product.id === '4' && '🍫'}
        </div>
        {product.origin === 'Brasil' && (
          <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            🇧🇷 Brasil
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-green-700">
              £{product.price.toFixed(2)}
            </span>
          </div>
          
          {product.stock > 0 ? (
            <span className="text-xs text-green-600 font-medium">
              ✓ Em estoque
            </span>
          ) : (
            <span className="text-xs text-red-600 font-medium">
              ✗ Indisponível
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || added}
          className={`w-full py-2.5 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : added
              ? 'bg-green-600 text-white'
              : 'bg-yellow-400 hover:bg-yellow-500 text-green-900'
          }`}
        >
          {added ? (
            <>
              <Check className="w-5 h-5" />
              Adicionado!
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              Adicionar ao Carrinho
            </>
          )}
        </button>
      </div>
    </div>
  );
}
