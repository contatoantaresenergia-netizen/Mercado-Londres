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
      {/* CORREÇÃO 1: Mudei 'bg-white-100' para 'bg-white' (o anterior não existe no Tailwind e causava o fundo cinza) */}
      <div className="relative h-48 bg-white flex items-center justify-center p-4">
        
        <div className="flex items-center justify-center w-full h-full">
          {/* Foto 1 */}
          {product.id === '1' && (
            <img 
              src="https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/FEE9A1D6-CDD6-4436-8E46-212F2C4F3A34.webp" 
              alt={product.name}
              className="h-full w-full object-contain" 
            />
          )}

          {/* Foto 2 */}
          {product.id === '2' && (
            <img 
              src="https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/lata%20de%20guarana%206%20un.webp" 
              alt={product.name}
              className="h-full w-full object-contain" 
            />
          )}

          {/* Foto 3 */}
          {product.id === '3' && (
            <img 
              src="https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/lata%20de%20guarana%206%20un.webp" 
              alt={product.name}
              className="h-full w-full object-contain" 
            />
          )}

          {/* Foto 4 */}
          {product.id === '4' && (
            <img 
              src="https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/lata%20de%20guarana%206%20un.webp" 
              alt={product.name}
              className="h-full w-full object-contain" 
            />
          )}
        {/* CORREÇÃO 2: Faltava fechar a DIV interna das imagens aqui */}
        </div>

        {product.origin === 'Brasil' && (
          <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
            🇧🇷 Brasil
          </span>
        )}
      {/* CORREÇÃO 3: Faltava fechar a DIV principal da imagem (a que tem o h-48) aqui */}
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
