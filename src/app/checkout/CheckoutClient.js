'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { CreditCard, CheckCircle, MapPin } from 'lucide-react';

const MAINLAND_PREFIXES = ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'N1', 'NW1', 'SE1', 'SW1', 'W', 'WC', 'BR', 'CR', 'HA', 'IG', 'KT', 'RM', 'SM', 'TW', 'UB', 'AB', 'AL', 'B', 'BA', 'BB', 'BD', 'BH', 'BL', 'BN', 'BS', 'CA', 'CB', 'CF', 'CH', 'CM', 'CO', 'CT', 'CV', 'CW', 'DA', 'DD', 'DE', 'DG', 'DH', 'DL', 'DN', 'DT', 'DY', 'EN', 'EH', 'EX', 'FK', 'FY', 'G', 'GL', 'GU', 'HD', 'HG', 'HP', 'HR', 'HU', 'HX', 'IP', 'KA', 'KY', 'L', 'LA', 'LD', 'LE', 'LL', 'LN', 'LS', 'LU', 'M', 'ME', 'MK', 'ML', 'NE', 'NG', 'NN', 'NP', 'NR', 'OL', 'OX', 'PA', 'PE', 'PH', 'PL', 'PO', 'PR', 'RG', 'RH', 'S', 'SA', 'SG', 'SK', 'SL', 'SN', 'SO', 'SP', 'SR', 'SS', 'ST', 'SY', 'TA', 'TD', 'TF', 'TN', 'TQ', 'TR', 'TS', 'WA', 'WD', 'WF', 'WN', 'WR', 'WS', 'WV', 'YO'];

export default function CheckoutClient() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [orderNumber, setOrderNumber] = useState('');
  const [deliveryDay, setDeliveryDay] = useState('weekday');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ nome: '', email: '', postcode: '', endereco: '' });

  useEffect(() => {
    setOrderNumber(Math.random().toString(36).substr(2, 9).toUpperCase());
  }, []);

  const subtotal = getCartTotal();

  const deliveryInfo = useMemo(() => {
    const pc = formData.postcode.toUpperCase().trim();
    if (pc.length < 2) return { cost: 5.99, valid: true };
    const isMainland = MAINLAND_PREFIXES.some(prefix => pc.startsWith(prefix));
    if (!isMainland) return { cost: 0, valid: false };
    
    let cost = (deliveryDay === 'saturday') 
      ? (subtotal >= 100 ? 0 : 6.99) 
      : (subtotal >= 70 ? 0 : 5.99);
    
    return { cost, valid: true, isFree: cost === 0 };
  }, [formData.postcode, subtotal, deliveryDay]);

  const totalGeral = subtotal + deliveryInfo.cost + 1.99;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ total: totalGeral, orderNumber, customer: formData }),
      });
      if (res.ok) {
        setStep(4);
        clearCart();
      } else {
        alert("Erro no checkout.");
      }
    } catch (err) {
      alert("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  if (step === 4) return (
    <div className="min-h-screen flex items-center justify-center p-10">
      <div className="text-center bg-white p-8 rounded-2xl shadow-xl border">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold">Pedido Confirmado!</h2>
        <p className="mt-2 font-bold text-green-700">#{orderNumber}</p>
        <button onClick={() => router.push('/')} className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg font-bold">Voltar</button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-black mb-8">FINALIZAR COMPRA</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2"><MapPin size={20}/> Entrega</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input placeholder="Nome *" onChange={e => setFormData({...formData, nome: e.target.value})} required className="p-3 border rounded-lg" />
              <input placeholder="E-mail *" type="email" onChange={e => setFormData({...formData, email: e.target.value})} required className="p-3 border rounded-lg" />
              <input placeholder="Postcode *" onChange={e => setFormData({...formData, postcode: e.target.value})} required className="p-3 border rounded-lg uppercase" />
              <input placeholder="Endereço *" onChange={e => setFormData({...formData, endereco: e.target.value})} required className="p-3 border rounded-lg" />
            </div>

            <div className="pt-4">
              <p className="font-bold mb-3">Dia de Entrega:</p>
              <div className="grid grid-cols-2 gap-4">
                <button type="button" onClick={() => setDeliveryDay('weekday')} className={`p-4 border rounded-xl text-left ${deliveryDay === 'weekday' ? 'border-green-600 bg-green-50' : ''}`}>
                  <p className="font-bold text-sm">Terça a Sexta</p>
                  <p className="text-xs text-gray-500 font-medium">£5.99 (Grátis acima de £70)</p>
                </button>
                <button type="button" onClick={() => setDeliveryDay('saturday')} className={`p-4 border rounded-xl text-left ${deliveryDay === 'saturday' ? 'border-green-600 bg-green-50' : ''}`}>
                  <p className="font-bold text-sm">Sábado</p>
                  <p className="text-xs text-gray-500 font-medium">£6.99 (Grátis acima de £100)</p>
                </button>
              </div>
            </div>
            
            <button type="submit" disabled={loading || !deliveryInfo.valid} className="w-full bg-green-600 text-white py-4 rounded-xl font-black text-xl uppercase">
              {loading ? "PROCESSANDO..." : "PAGAR AGORA"}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl border h-fit sticky top-10">
          <h3 className="font-bold text-xl mb-4">Resumo</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>£{subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Entrega</span><span>£{deliveryInfo.cost.toFixed(2)}</span></div>
            <div className="flex justify-between font-black text-xl pt-4 border-t text-green-700">
              <span>TOTAL</span><span>£{totalGeral.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
