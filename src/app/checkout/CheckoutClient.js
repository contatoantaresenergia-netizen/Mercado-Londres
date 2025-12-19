'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { CreditCard, Truck, CheckCircle, Info, Calendar } from 'lucide-react';

const MAINLAND_PREFIXES = ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'N1', 'NW1', 'SE1', 'SW1', 'W', 'WC', 'BR', 'CR', 'HA', 'IG', 'KT', 'RM', 'SM', 'TW', 'UB', 'AB', 'AL', 'B', 'BA', 'BB', 'BD', 'BH', 'BL', 'BN', 'BS', 'CA', 'CB', 'CF', 'CH', 'CM', 'CO', 'CT', 'CV', 'CW', 'DA', 'DD', 'DE', 'DG', 'DH', 'DL', 'DN', 'DT', 'DY', 'EN', 'EH', 'EX', 'FK', 'FY', 'G', 'GL', 'GU', 'HD', 'HG', 'HP', 'HR', 'HU', 'HX', 'IP', 'KA', 'KY', 'L', 'LA', 'LD', 'LE', 'LL', 'LN', 'LS', 'LU', 'M', 'ME', 'MK', 'ML', 'NE', 'NG', 'NN', 'NP', 'NR', 'OL', 'OX', 'PA', 'PE', 'PH', 'PL', 'PO', 'PR', 'RG', 'RH', 'S', 'SA', 'SG', 'SK', 'SL', 'SN', 'SO', 'SP', 'SR', 'SS', 'ST', 'SY', 'TA', 'TD', 'TF', 'TN', 'TQ', 'TR', 'TS', 'WA', 'WD', 'WF', 'WN', 'WR', 'WS', 'WV', 'YO'];

export default function CheckoutClient() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [deliveryDay, setDeliveryDay] = useState('weekday');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: '', email: '', telefone: '', endereco: '', postcode: '', cidade: ''
  });

  useEffect(() => {
    setIsClient(true);
    setOrderNumber(Math.random().toString(36).substr(2, 9).toUpperCase());
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const subtotal = getCartTotal();
  const deliveryInfo = useMemo(() => {
    const pc = formData.postcode.toUpperCase().trim();
    if (pc.length < 2) return { cost: 5.99, valid: true };
    const isMainland = MAINLAND_PREFIXES.some(prefix => pc.startsWith(prefix));
    if (!isMainland) return { cost: 0, valid: false, message: 'Offshore - Sob Consulta' };
    const cost = deliveryDay === 'saturday' ? (subtotal >= 100 ? 0 : 6.99) : (subtotal >= 70 ? 0 : 5.99);
    return { cost, valid: true };
  }, [formData.postcode, subtotal, deliveryDay]);

  const totalGeral = subtotal + deliveryInfo.cost + 1.99;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          customer: formData,
          orderNumber: orderNumber,
          total: totalGeral
        }),
      });

      if (response.ok) {
        setStep(4);
        clearCart();
      } else {
        alert("Erro ao processar pedido. Verifique as chaves na Vercel.");
      }
    } catch (err) {
      alert("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) return null;

  if (step === 4) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold">Pedido Confirmado! 🎉</h2>
          <p className="mt-4 text-gray-600">Obrigado pela sua compra.</p>
          <div className="bg-gray-100 p-4 rounded-lg my-6">
            <p className="text-sm">Número do Pedido</p>
            <p className="text-2xl font-bold text-green-600">#{orderNumber}</p>
          </div>
          <button onClick={() => router.push('/')} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold">Voltar ao Início</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>
