'use client'
import React, { useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutClient() {
  const { cart, getCartTotal, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderedItems, setOrderedItems] = useState([]); // BACKUP PARA O SUCESSO
  const [clientSecret, setClientSecret] = useState('');
  const [formData, setFormData] = useState({ nome: '', email: '', postcode: '', endereco: '' });

  const handleStartPayment = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Carrinho vazio!");

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        total: getCartTotal() + 5.99, 
        orderNumber: Math.random().toString(36).substr(2, 7).toUpperCase(), 
        customer: formData, 
        items: cart // Enviando o carrinho atual
      }),
    });
    const data = await res.json();
    if (res.ok) setClientSecret(data.clientSecret);
  };

  const onComplete = () => {
    setOrderedItems([...cart]); // 1. Salva cópia do que foi comprado
    setIsSuccess(true);         // 2. Muda a tela
    clearCart();                // 3. Limpa o carrinho global
  };

  if (isSuccess) return (
    <div className="p-10 text-center bg-white">
      <h2 className="text-2xl font-bold mb-4">Pagamento Aprovado!</h2>
      <div className="text-left max-w-md mx-auto bg-gray-50 p-6 rounded-lg">
        <p className="font-bold border-b mb-2">Produtos:</p>
        {orderedItems.map((item, i) => (
          <div key={i} className="flex justify-between py-1">
            <span>{item.quantity}x {item.name}</span>
            <span>£{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {!clientSecret ? (
        <form onSubmit={handleStartPayment}>
           {/* Seus inputs de nome, email, etc aqui */}
           <button type="submit" className="bg-green-600 text-white p-4 w-full">PAGAR AGORA</button>
        </form>
      ) : (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm onOrderComplete={onComplete} />
        </Elements>
      )}
    </div>
  );
}
