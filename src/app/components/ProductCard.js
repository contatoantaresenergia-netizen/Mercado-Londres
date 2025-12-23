'use client'
import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, lang = 'pt' }) {
  const context = useCart();
  const addToCart = context ? context.addToCart : null;
  const [added, setAdded] = useState(false);
  
  const stock = product?.stock ?? 0;
  const price = Number(product?.price || 0);
  
  const handleAddToCart = () => {
    if (stock > 0 && addToCart) {
      addToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const texts = {
    pt: {
      inStock: 'em estoque',
      outOfStock: 'Esgotado',
      addToCart: 'Adicionar ao Carrinho',
      added: 'Adicionado!'
    },
    en: {
      inStock: 'in stock',
      outOfStock: 'Out of Stock',
      addToCart: 'Add to Cart',
      added: 'Added!'
    }
  };

  const t = texts[lang] || texts.pt;
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border flex flex-col h-full">
      {/* Imagem do Produto */}
      <div className="relative h-48 bg-gray-50 flex items-center justify-center p-4">
        {product?.image_url ? (
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="text-gray-300 text-4xl">📦</div>
        )}
      </div>
      
      {/* Conteúdo do Card */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Nome do Produto */}
        <h3 className="font-bold text-gray-800 mb-3 line-clamp-2 min-h-[3rem] text-base">
          {product?.name || 'Produto'}
        </h3>
        
        {/* Preço e Estoque */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-green-700">
            £{price.toFixed(2)}
          </span>
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${
            stock > 0 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {stock > 0 ? `${stock} ${t.inStock}` : t.outOfStock}
          </span>
        </div>
        
        {/* Botão Adicionar ao Carrinho */}
        <button
          onClick={handleAddToCart}
          disabled={stock === 0 || !addToCart || added}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm mt-auto ${
            added 
              ? 'bg-green-500 text-white'
              : stock > 0 && addToCart
              ? 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {added ? (
            <>
              <Check className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">{t.added}</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">
                {stock > 0 ? t.addToCart : t.outOfStock}
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
