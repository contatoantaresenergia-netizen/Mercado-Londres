'use client'
import React, { useState, useEffect } from 'react';
import { useCart } from '@/app/context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutClient() {
  const { cart, getCartTotal, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderedItems, setOrderedItems] = useState([]); // Backup para a tela
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ nome: '', email: '', postcode: '', endereco: '' });

  // Função para processar o sucesso do pagamento
  const handleOrderComplete = () => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || cart;
    setOrderedItems(currentCart); // Salva os itens antes de limpar
    setIsSuccess(true);
    clearCart();
  };

  const handleStartPayment = async (e) => {
    e.preventDefault();
    
    // BLINDAGEM: Se o estado do React falhar, lê do localStorage
    let itemsFinal = cart;
    if (itemsFinal.length === 0) {
      const saved = localStorage.getItem('cart');
      if (saved) itemsFinal = JSON.parse(saved);
    }

    if (!itemsFinal || itemsFinal.length === 0) {
      alert("Carrinho vazio! Adicione produtos novamente.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          total: getCartTotal() + 5.99, 
          orderNumber: Math.random().toString(36).substr(2, 9).toUpperCase(), 
          customer: formData, 
          items: itemsFinal // Garante que não vai []
        }),
      });
      const data = await res.json();
      if (res.ok) setClientSecret(data.clientSecret);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-3xl font-bold text-green-600">Sucesso!</h2>
        <div className="mt-4 bg-gray-50 p-6 rounded-xl">
          <p className="font-bold mb-4">Produtos do seu pedido:</p>
          {orderedItems.map((item, i) => (
            <div key={i} className="flex justify-between border-b py-2">
              <span>{item.quantity}x {item.name || item.title}</span>
              <span>£{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {!clientSecret ? (
        <form onSubmit={handleStartPayment} className="max-w-md mx-auto space-y-4">
          <input placeholder="Nome" required className="w-full p-3 border rounded" onChange={e => setFormData({...formData, nome: e.target.value})} />
          <input placeholder="Email" type="email" required className="w-full p-3 border rounded" onChange={e => setFormData({...formData, email: e.target.value})} />
          <input placeholder="Postcode" required className="w-full p-3 border rounded" onChange={e => setFormData({...formData, postcode: e.target.value})} />
          <input placeholder="Endereço" required className="w-full p-3 border rounded" onChange={e => setFormData({...formData, endereco: e.target.value})} />
          <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-4 rounded font-bold">
            {loading ? "CARREGANDO..." : "IR PARA O PAGAMENTO"}
          </button>
        </form>
      ) : (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm onOrderComplete={handleOrderComplete} />
        </Elements>
      )}
    </div>
  );
}
