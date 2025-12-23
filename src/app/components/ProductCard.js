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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border">
      <div className="relative h-48 bg-gray-50 flex items-center justify-center p-4">
        {product?.image_url ? (
          <img 
            src={product.image_url} 
            alt={product.name || t.product} 
            className="h-full w-full object-contain"
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
      
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 h-10">
          {product?.name || t.product}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-green-700">
            £{price.toFixed(2)}
          </span>
          <span className={`text-[10px] px-2 py-1 rounded font-semibold ${
            stock > 0 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {stock > 0 ? `${stock} ${t.inStock}` : t.outOfStock}
          </span>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={stock === 0 || !addToCart || added}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
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
