'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { CreditCard, CheckCircle, MapPin, Truck } from 'lucide-react';

const MAINLAND_PREFIXES = ['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'N1', 'NW1', 'SE1', 'SW1', 'W', 'WC', 'BR', 'CR', 'HA', 'IG', 'KT', 'RM', 'SM', 'TW', 'UB', 'AB', 'AL', 'B', 'BA', 'BB', 'BD', 'BH', 'BL', 'BN', 'BS', 'CA', 'CB', 'CF', 'CH', 'CM', 'CO', 'CT', 'CV', 'CW', 'DA', 'DD', 'DE', 'DG', 'DH', 'DL', 'DN', 'DT', 'DY', 'EN', 'EH', 'EX', 'FK', 'FY', 'G', 'GL', 'GU', 'HD', 'HG', 'HP', 'HR', 'HU', 'HX', 'IP', 'KA', 'KY', 'L', 'LA', 'LD', 'LE', 'LL', 'LN', 'LS', 'LU', 'M', 'ME', 'MK', 'ML', 'NE', 'NG', 'NN', 'NP', 'NR', 'OL', 'OX', 'PA', 'PE', 'PH', 'PL', 'PO', 'PR', 'RG', 'RH', 'S', 'SA', 'SG', 'SK', 'SL', 'SN', 'SO', 'SP', 'SR', 'SS', 'ST', 'SY', 'TA', 'TD', 'TF', 'TN', 'TQ', 'TR', 'TS', 'WA', 'WD', 'WF', 'WN', 'WR', 'WS', 'WV', 'YO'];

export default function CheckoutClient() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();
  const [orderNumber, setOrderNumber] = useState('');
  const [deliveryDay, setDeliveryDay] = useState('weekday');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ nome: '', email: '', postcode: '', endereco: '' });
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setOrderNumber(Math.random().toString(36).substr(2, 9).toUpperCase());
  }, []);

  const subtotal = getCartTotal();
  const handlingFee = 1.99; // Taxa de sacola restaurada

  // CÁLCULO AUTOMÁTICO DE FRETE
  const deliveryInfo = useMemo(() => {
    const pc = formData.postcode.toUpperCase().trim();
    if (pc.length < 2) return { cost: 5.99, valid: true };
    
    const isMainland = MAINLAND_PREFIXES.some(prefix => pc.startsWith(prefix));
    if (!isMainland) return { cost: 0, valid: false };
    
    // Regras de frete: Terça-Sexta (£5.99/Grátis > £70) | Sábado (£6.99/Grátis > £100)
    let cost = (deliveryDay === 'saturday') 
      ? (subtotal >= 100 ? 0 : 6.99) 
      : (subtotal >= 70 ? 0 : 5.99);
    
    return { cost, valid: true, isFree: cost === 0 };
  }, [formData.postcode, subtotal, deliveryDay]);

  const totalGeral = subtotal + deliveryInfo.cost + handlingFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!deliveryInfo.valid) return;
    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          total: totalGeral, 
          orderNumber, 
          customer: formData 
        }),
      });

      if (res.ok) {
        setIsSuccess(true);
        clearCart();
      } else {
        alert("Erro no processamento. Verifique os dados ou a chave do Stripe.");
      }
    } catch (err) {
      alert("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) return (
    <div className="min-h-screen flex items-center justify-center bg-white p-10 text-center">
      <div>
        <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
        <h2 className="text-3xl font-black italic uppercase">Pedido Confirmado!</h2>
        <p className="text-xl mt-2 font-mono font-bold">#{orderNumber}</p>
        <button onClick={() => router.push('/')} className="mt-8 bg-black text-white px-10 py-4 rounded-full font-bold uppercase hover:bg-green-600 transition-all">Voltar à Loja</button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-black mb-8 italic uppercase tracking-tighter">Finalizar Compra</h1>
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 italic uppercase"><MapPin size={22} className="text-green-600"/> Dados de Entrega</h2>
              <div className="grid md:grid-cols-2 gap-5">
                <input placeholder="NOME COMPLETO *" onChange={e => setFormData({...formData, nome: e.target.value})} required className="p-4 rounded-2xl border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                <input placeholder="E-MAIL *" type="email" onChange={e => setFormData({...formData, email: e.target.value})} required className="p-4 rounded-2xl border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition-all" />
                <input 
                  placeholder="POSTCODE *" 
                  value={formData.postcode}
                  onChange={e => setFormData({...formData, postcode: e.target.value.toUpperCase()})} 
                  required 
                  className="p-4 rounded-2xl border-gray-200 uppercase font-black focus:ring-2 focus:ring-green-500 outline-none transition-all" 
                />
                <input placeholder="ENDEREÇO E NÚMERO *" onChange={e => setFormData({...formData, endereco: e.target.value})} required className="p-4 rounded-2xl border-gray-200 focus:ring-2 focus:ring-green-500 outline-none transition-all" />
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 italic uppercase"><Truck size={22} className="text-green-600"/> Opções de Envio</h2>
              <div className="grid grid-cols-2 gap-4">
                <button type="button" onClick={() => setDeliveryDay('weekday')} className={`p-5 border-2 rounded-2xl text-left transition-all ${deliveryDay === 'weekday' ? 'border-green-600 bg-white shadow-md' : 'border-transparent bg-white/50'}`}>
                  <p className="font-black text-sm uppercase">Terça a Sexta</p>
                  <p className="text-xs font-bold text-gray-500">£5.99 (Grátis acima de £70)</p>
                </button>
                <button type="button" onClick={() => setDeliveryDay('saturday')} className={`p-5 border-2 rounded-2xl text-left transition-all ${deliveryDay === 'saturday' ? 'border-green-600 bg-white shadow-md' : 'border-transparent bg-white/50'}`}>
                  <p className="font-black text-sm uppercase">Sábado</p>
                  <p className="text-xs font-bold text-gray-500">£6.99 (Grátis acima de £100)</p>
                </button>
              </div>
              {!deliveryInfo.valid && formData.postcode.length > 2 && (
                <p className="mt-4 text-red-600 font-black text-sm p-4 bg-red-50 rounded-xl border border-red-100 italic">⚠️ Atenção: Para Offshore/Islands, o frete é sob consulta via WhatsApp.</p>
              )}
            </div>
            
            <button type="submit" disabled={loading || !deliveryInfo.valid} className="w-full bg-green-600 text-white py-6 rounded-3xl font-black text-2xl uppercase italic hover:bg-green-700 transition-all shadow-xl active:scale-[0.98] disabled:bg-gray-200">
              {loading ? "PROCESSANDO..." : "PAGAR AGORA"}
            </button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border-2 border-gray-50 h-fit sticky top-10 shadow-sm">
            <h3 className="font-black text-2xl mb-6 italic uppercase border-b pb-4">Resumo</h3>
            <div className="space-y-4 font-bold text-base">
              <div className="flex justify-between text-gray-600"><span>Produtos</span><span>£{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600">
                <span>Entrega</span>
                <span className={deliveryInfo.isFree ? "text-green-600 font-black" : ""}>
                  {deliveryInfo.isFree ? 'GRÁTIS' : `£${deliveryInfo.cost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-400 text-sm"><span>Manuseio/Sacola</span><span>£{handlingFee.toFixed(2)}</span></div>
              <div className="flex justify-between font-black text-4xl pt-6 border-t border-dashed text-green-700 mt-6 tracking-tighter">
                <span>TOTAL</span><span>£{totalGeral.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
