'use client'

import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

export default function CheckoutForm({ onOrderComplete }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onOrderComplete();
    } else {
      setMessage("Ocorreu um erro inesperado.");
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {message && <div className="p-4 bg-red-50 text-red-600 rounded-xl font-bold text-sm">{message}</div>}
      <button
        disabled={isProcessing || !stripe || !elements}
        className="w-full bg-black text-white py-5 rounded-2xl font-black text-xl uppercase italic hover:bg-green-600 transition-all shadow-lg disabled:bg-gray-300"
      >
        {isProcessing ? "VALIDANDO CARTÃO..." : "CONFIRMAR PAGAMENTO AGORA"}
      </button>
      <p className="text-center text-[10px] text-gray-400 uppercase font-bold tracking-widest">
        💳 Pagamento processado com criptografia SSL
      </p>
    </form>
  );
}
