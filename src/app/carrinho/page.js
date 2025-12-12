'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/app/context/cartContext';

export default function CartPage() {
  const router = useRouter();
  const { cart, cartCount, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();

  const shippingCost = cartTotal >= 50 ? 0 : 5;
  const total = cartTotal + shippingCost;

  if (cartCount === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white rounded-xl shadow-lg p-12 max-w-md mx-auto">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Seu carrinho está vazio
            </h2>
            <p className="text-gray-600 mb-8">
              Adicione produtos para começar suas compras!
            </p>
            <button
              onClick={() => router.push('/produtos')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-lg transition"
            >
              Ver Produtos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          🛒 Meu Carrinho
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row items-center gap-6"
              >
                <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center text-4xl">
                  {item.id === '1' && '🥐'}
                  {item.id === '2' && '🥤'}
                  {item.id === '3' && '🍇'}
                  {item.id === '4' && '🍫'}
                  {item.id === '5' && '🍲'}
                  {item.id === '6' && '🥞'}
                  {item.id === '7' && '🧃'}
                  {item.id === '8' && '🥜'}
                </div>

                <div className="flex-grow text-center sm:text-left">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-green-700 font-semibold text-xl">
                    £{item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  
                  <span className="font-bold text-lg w-12 text-center">
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <p className="font-bold text-xl text-gray-800">
                    £{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 font-medium transition"
            >
              Limpar Todo o Carrinho
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Resumo do Pedido
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({cartCount} itens):</span>
                  <span className="font-semibold">£{cartTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Frete:</span>
                  <span className={`font-semibold ${shippingCost === 0 ? 'text-green-600' : 'text-gray-800'}`}>
                    {shippingCost === 0 ? 'GRÁTIS' : `£${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                {cartTotal < 50 && (
                  <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                    💡 Faltam £{(50 - cartTotal).toFixed(2)} para frete grátis!
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-green-700">£{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2"
              >
                Finalizar Compra
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => router.push('/produtos')}
                className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
