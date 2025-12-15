'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { CreditCard, Truck, CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isClient, setIsClient] = useState(false);

  // 1. Primeiro useEffect: Marca que estamos no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 2. Segundo useEffect: Lida com redirecionamento APENAS no cliente
  useEffect(() => {
    if (isClient && cart.length === 0 && step !== 4) {
      router.push('/produtos');
    }
  }, [isClient, cart.length, step, router]);

  // 3. ESTA É A CHAVE: Se não for cliente, retorna null ou loading 
  // para evitar que o servidor tente executar a lógica abaixo
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">A carregar...</div>
      </div>
    );
  }

  // ... restante do seu código (handleSubmit, formulários, etc)
