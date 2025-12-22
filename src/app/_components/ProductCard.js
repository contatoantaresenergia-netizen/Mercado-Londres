'use client'

import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
// Caminho relativo para a pasta com sublinhado
import { useCart } from '../_context/CartContext'; 

export default function ProductCard({ product }) {
  // Adicionamos um fallback {} para evitar que o código quebre se o contexto for nulo
  const { addToCart } = useCart() || {};
  const [added, setAdded] = useState(false);

  // Verificação de segurança para o preço e estoque
  const stock = product?.stock ?? 0;
  const price = Number(product?.price || 0);

  const handleAddToCart = () => {
    if (stock > 0 && addToCart) {
      addToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border">
      
      {/* Container da Imagem */}
      <div className="relative h-48 bg-white flex items-center justify-center p-4">
        {product?.image_url ? (
          <img 
            src={product.image_url} 
            alt={product.name}
            className="h-full w-full object-contain" 
          />
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <ShoppingCart className="w-8 h-8 opacity-20" />
            <span className="text-[10px] mt-2">Sem imagem</span>
          </div>
        )}

        {/* Selo de Origem Brasil */}
        {(product?.origin === 'Brasil' || product?.category === 'Brasileiros') && (
          <span className="absolute top-2 right-2 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10 shadow-sm">
            🇧🇷 Brasil
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-sm text-gray-800 mb-2 line-clamp-2 h-10">
          {product?.name || 'Produto sem nome'}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-green-700">
            £{price.toFixed(2)}
          </span>
          
          {stock > 0 ? (
            <span className="text-[10px] text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
              ✓ Disponível
            </span>
          ) : (
            <span className="text-[10px] text-red-600 font-medium bg-red-50 px-2 py-1 rounded">
              ✗ Esgotado
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={stock === 0 || added}
          className={`w-full py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
            stock === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : added
              ? 'bg-green-600 text-white'
              : 'bg-yellow-400 hover:bg-yellow-500 text-green-900 shadow-sm'
          }`}
        >
          {added ? (
            <><Check className="w-4 h-4" /> Adicionado</>
          ) : (
            <><ShoppingCart className="w-4 h-4" /> Adicionar</>
          )}
        </button>
      </div>
    </div>
  );
}
