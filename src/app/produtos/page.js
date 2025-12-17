'use client'

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Check, Minus, Plus } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart, cart, updateQuantity } = useCart();
  
  const [quantity, setQuantity] = useState(1); 
  const [added, setAdded] = useState(false);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);

  // 🛡️ TRAVA DE SEGURANÇA 1: Se o produto for nulo, não renderiza nada
  if (!product) return null;

  useEffect(() => {
    const currentItem = cart.find(item => item.id === product?.id);
    if (currentItem) {
      setQuantity(currentItem.quantity);
      setShowQuantitySelector(true);
    } else {
      setQuantity(1);
      setShowQuantitySelector(false);
    }
  }, [cart, product?.id]);

  const handleQuantityChange = (delta) => {
    let newQuantity;
    if (typeof delta === 'number') {
      newQuantity = quantity + delta;
    } else {
      const value = parseInt(delta.target.value, 10);
      newQuantity = isNaN(value) ? 1 : value;
    }

    newQuantity = Math.max(1, newQuantity); 
    newQuantity = Math.min(99, newQuantity);

    setQuantity(newQuantity);
    setAdded(false);
    if (showQuantitySelector) {
      updateQuantity(product.id, newQuantity);
    }
  };
  
  const handleFirstAddToCart = () => {
    if (!product || product.stock === 0) return;
    
    addToCart(product, 1);
    setShowQuantitySelector(true);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      
      {/* Container da Imagem */}
      <div className="relative h-72 md:h-48 bg-white flex items-center justify-center p-4">
        <div className="flex items-center justify-center w-full h-full">
          {/* 🛡️ TRAVA DE SEGURANÇA 2: Uso do ?. para evitar erro se image_url for undefined */}
          {product?.image_url ? (
            <img 
              src={product.image_url} 
              alt={product?.name || "Produto"}
              className="h-full w-full object-contain" 
            />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <ShoppingCart className="w-8 h-8 opacity-20" />
              <span className="text-[10px] mt-2">Sem imagem</span>
            </div>
          )}
        </div>

        {(product?.origin === 'Brasil' || product?.category === 'Brasileiros') && (
          <span className="absolute top-2 right-2 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10 shadow-sm">
            🇧🇷 Brasil
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
            {product?.name || product?.title || "Produto sem nome"}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 h-10">
            {product?.description || 'Produto de qualidade selecionada.'}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-green-700">
                £{Number(product?.price || 0).toFixed(2)}
              </span>
            </div>
            {product?.stock > 0 ? (
              <span className="text-xs text-green-600 font-medium"> ✓ Em estoque </span>
            ) : (
              <span className="text-xs text-red-600 font-medium"> ✗ Indisponível </span>
            )}
          </div>

          {showQuantitySelector && (product?.stock > 0) ? (
            <div className="flex items-center w-full h-10 mb-2">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="w-1/3 h-full rounded-l-full bg-gray-100 flex items-center justify-center text-gray-700 border border-gray-200"
              >
                <Minus className="w-4 h-4" />
              </button>
              
              <input
                type="number"
                readOnly
                value={quantity}
                className="w-1/3 h-full text-center text-base font-semibold border-y border-gray-200 focus:outline-none" 
              />

              <button
                onClick={() => handleQuantityChange(1)}
                className="w-1/3 h-full rounded-r-full bg-gray-100 flex items-center justify-center text-gray-700 border border-gray-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleFirstAddToCart}
              disabled={!product || product.stock === 0 || added}
              className={`w-full py-2.5 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                product?.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : added
                ? 'bg-green-600 text-white'
                : 'bg-yellow-400 hover:bg-yellow-500 text-green-900'
              }`}
            >
              {added ? (
                <><Check className="w-5 h-5" /> Adicionado!</>
              ) : (
                <><ShoppingCart className="w-5 h-5" /> Adicionar</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
