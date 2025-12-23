'use client'
import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, lang }) {
  const context = useCart();
  const addToCart = context ? context.addToCart : null;
  const [added, setAdded] = useState(false);
  
  const currentLang = lang || 'pt';
  const stock = product?.stock ?? 0;
  const price = Number(product?.price || 0);
  
  // Traduções
  const t = {
    inStock: currentLang === 'pt' ? 'em estoque' : 'in stock',
    outOfStock: currentLang === 'pt' ? 'Esgotado' : 'Out of Stock',
    addToCart: currentLang === 'pt' ? 'Adicionar ao Carrinho' : 'Add to Cart',
    added: currentLang === 'pt' ? 'Adicionado!' : 'Added!',
    product: currentLang === 'pt' ? 'Produto' : 'Product'
  };
  
  const handleAddToCart = () => {
    if (stock > 0 && addToCart) {
      addToCart(product);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border flex flex-col h-full">
      {/* Imagem do Produto */}
      <div className="relative h-48 bg-white flex items-center justify-center p-4">
        {product?.image_url ? (
          <img 
            src={product.image_url} 
            alt={product.name || t.product} 
            className="max-h-full max-w-full object-contain"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=Sem+Imagem';
            }}
          />
        ) : (
          <div className="text-gray-400 text-center">
            <div className="text-4xl mb-2">📦</div>
            <div className="text-sm">{t.product}</div>
          </div>
        )}
      </div>
      
      {/* Informações do Produto */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Nome do Produto */}
        <h3 className="font-bold text-gray-800 mb-3 line-clamp-2 min-h-[3rem]">
          {product?.name || t.product}
        </h3>
        
        {/* Preço e Estoque */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-green-700">
            £{price.toFixed(2)}
          </span>
          <span className={`text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap ${
            stock > 0 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {stock > 0 ? `${stock} ${t.inStock}` : t.outOfStock}
          </span>
        </div>
        
        {/* Botão - sempre no final */}
        <button
          onClick={handleAddToCart}
          disabled={stock === 0 || !addToCart || added}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 mt-auto ${
            added 
              ? 'bg-green-500 text-white'
              : stock > 0 && addToCart
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {added ? (
            <>
              <Check className="w-5 h-5" />
              {t.added}
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              {stock > 0 ? t.addToCart : t.outOfStock}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
