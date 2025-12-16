'use client'

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Check, Minus, Plus } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart, cart, updateQuantity } = useCart();
  
  const [quantity, setQuantity] = useState(1); 
  const [added, setAdded] = useState(false);
  // NOVO ESTADO: Controla se o seletor deve ser exibido
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);

  // Verifica se o produto já está no carrinho ao carregar o componente
  useEffect(() => {
    const currentItem = cart.find(item => item.id === product.id);
    if (currentItem) {
      setQuantity(currentItem.quantity);
      setShowQuantitySelector(true); // Se já está no carrinho, mostra o seletor
    } else {
      setQuantity(1);
      setShowQuantitySelector(false); // Se não está no carrinho, mostra o botão Adicionar
    }
  }, [cart, product.id]);


  // Lógica para mudar a quantidade
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
    // ATUALIZA A QUANTIDADE NO CONTEXTO IMEDIATAMENTE APÓS A MUDANÇA
    if (showQuantitySelector) {
      updateQuantity(product.id, newQuantity);
    }
  };
  
  // Lógica para o primeiro clique em "Adicionar"
  const handleFirstAddToCart = () => {
    if (product.stock === 0) return;
    
    addToCart(product, 1); // Adiciona 1 unidade
    setShowQuantitySelector(true); // Mostra o seletor
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      
      {/* Container da Imagem */}
      <div className="relative h-72 md:h-48 bg-white flex items-center justify-center p-4">
        <div className="flex items-center justify-center w-full h-full">
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

      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          {/* Nome do Produto */}
          <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
            {product.name || product.title}
          </h3>
          
          {/* Descrição */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 h-10">
            {product.description || 'Produto de qualidade selecionada.'}
          </p>
        </div>

        <div>
          {/* Linha do Preço e Estoque */}
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

          {/* LÓGICA DE EXIBIÇÃO: Se o seletor está visível OU o botão Adicionar */}
          {showQuantitySelector && product.stock > 0 ? (
            // 1. Seletor de Quantidade (NOVO LAYOUT LIMPO)
            <div className="flex items-center w-full h-10 mb-2">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="w-1/3 h-full rounded-l-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 disabled:opacity-50 transition border border-r-0 border-gray-200"
              >
                <Minus className="w-4 h-4" />
              </button>
              
              <input
                type="number"
                min="1"
                max="99"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-1/3 h-full text-center text-base font-semibold border-y border-gray-200 focus:outline-none" 
              />

              <button
                onClick={() => handleQuantityChange(1)}
                className="w-1/3 h-full rounded-r-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition border border-l-0 border-gray-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ) : (
            // 2. Botão de Compra (Visível no estado inicial ou se estiver fora de estoque)
            <button
              onClick={handleFirstAddToCart}
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
          )}
        </div>
      </div>
    </div>
  );
}
