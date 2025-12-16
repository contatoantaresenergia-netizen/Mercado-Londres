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
      
      {/* Container da Imagem */}
      <div className="relative h-72 md:h-48 bg-white flex items-center justify-center p-4">
        <div className="flex items-center justify-center w-full h-full">
          {/* LÓGICA DINÂMICA: Se houver link na coluna image_url, ele mostra a foto */}
          {product.image_url ? (
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
        </div>

        {/* Selo de Origem Brasil */}
        {(product.origin === 'Brasil' || product.category === 'Brasileiros') && (
          <span className="absolute top-2 right-2 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10 shadow-sm">
            🇧🇷 Brasil
          </span>
        )}
      </div>

      <div className="p-4">
        {/* Nome do Produto (agora puxando da coluna 'name') */}
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
          {product.name || product.title}
        </h3>
        
        {/* Descrição */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 h-10">
          {product.description || 'Produto de qualidade selecionada.'}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-green-700">
              £{Number(product.price).toFixed(2)}
            </span>
          </div>
          
          {/* Status de Estoque */}
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

        {/* Botão de Compra */}
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
              Adicionar
            </>
          )}
        </button>
      </div>
    </div>
  );
}
