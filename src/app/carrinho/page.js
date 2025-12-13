'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CarrinhoPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-20">
            <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Seu carrinho está vazio
            </h2>
            <p className="text-gray-600 mb-8">
              Adicione produtos ao carrinho para continuar comprando
            </p>
            <button
              onClick={() => router.push('/produtos')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-lg transition inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Ver Produtos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              🛒 Meu Carrinho
            </h1>
            <p className="text-gray-600">
              {cart.length} {cart.length === 1 ? 'item' : 'itens'} no carrinho
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Lista de Produtos */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow p-6 flex gap-4"
                >
                  {/* Emoji do Produto */}
                  <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-4xl">
                    {item.id === '1' && '🥐'}
                    {item.id === '2' && '🥤'}
                    {item.id === '3' && '🍇'}
                    {item.id === '4' && '🍫'}
                    {item.id === '5' && '🥘'}
                    {item.id === '6' && '🍵'}
                    {item.id === '7' && '🥞'}
                    {item.id === '8' && '🍮'}
                  </div>

                  {/* Info do Produto */}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between">
                      {/* Controles de Quantidade */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-lg w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Preço */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-700">
                          £{(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          £{item.price.toFixed(2)} cada
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Botão Remover */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex-shrink-0 text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}

              {/* Botão Limpar Carrinho */}
              <button
                onClick={clearCart}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-medium py-3 rounded-lg transition"
              >
                Limpar Carrinho
              </button>
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Resumo do Pedido
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>£{getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Frete</span>
                    <span className="text-green-600 font-medium">
                      {getCartTotal() >= 50 ? 'GRÁTIS' : '£4.99'}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-green-700">
                      £{(getCartTotal() + (getCartTotal() >= 50 ? 0 : 4.99)).toFixed(2)}
                    </span>
                  </div>
                </div>

                {getCartTotal() < 50 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-sm text-yellow-800">
                    Faltam £{(50 - getCartTotal()).toFixed(2)} para frete grátis!
                  </div>
                )}

                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition mb-3"
                >
                  Finalizar Compra
                </button>

                <button
                  onClick={() => router.push('/produtos')}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 rounded-lg transition"
                >
                  Continuar Comprando
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
