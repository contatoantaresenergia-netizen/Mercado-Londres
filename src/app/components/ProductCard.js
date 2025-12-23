'use client'
import React, { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext'; // ✅ CORRIGIDO

export default function ProductCard({ product }) {
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

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border">
      <div className="relative h-48 bg-white flex items-center justify-center p-4">
        {product?.image_url && (
          <img src={product.image_url} alt={product.name} className="h-full w-full object-contain" />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 h-10">
          {product?.name || 'Produto'}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-green-700">£{price.toFixed(2)}</span>
          <span className={`text-[10px] px-2 py-1 rounded ${stock > 0 ? 'b
