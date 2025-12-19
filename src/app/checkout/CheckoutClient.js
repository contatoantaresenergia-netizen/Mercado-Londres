'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { CreditCard, Truck, CheckCircle, Info, Calendar } from 'lucide-react';

const MAINLAND_PREFIXES = [
  'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'N1', 'NW1', 'SE1', 'SW1', 'W', 'WC',
  'BR', 'CR', 'HA', 'IG', 'KT', 'RM', 'SM', 'TW', 'UB', 'AB', 'AL', 'B', 'BA', 'BB', 'BD', 'BH',
  'BL', 'BN', 'BS', 'CA', 'CB', 'CF', 'CH', 'CM', 'CO', 'CT', 'CV', 'CW', 'DA', 'DD', 'DE', 'DG',
  'DH', 'DL', 'DN', 'DT', 'DY', 'EN', 'EH', 'EX', 'FK', 'FY', 'G', 'GL', 'GU', 'HD', 'HG', 'HP',
  'HR', 'HU', 'HX', 'IP', 'KA', 'KY', 'L', 'LA', 'LD', 'LE', 'LL', 'LN', 'LS', 'LU', 'M', 'ME',
  'MK', 'ML', 'NE', 'NG', 'NN', 'NP', 'NR', 'OL', 'OX', 'PA', 'PE', 'PH', 'PL', 'PO', 'PR', 'RG',
  'RH', 'S', 'SA', 'SG', 'SK', 'SL', 'SN', 'SO', 'SP', 'SR', 'SS', 'ST', 'SY', 'TA', 'TD', 'TF',
  'TN', 'TQ', 'TR', 'TS', 'WA', 'WD', 'WF', 'WN', 'WR', 'WS', 'WV', 'YO'
];

export default function CheckoutClient() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [deliveryDay, setDeliveryDay] = useState('weekday');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: '', email: '', telefone: '', endereco: '',
    numero: '', complemento: '', cidade: '', postcode: '',
    cardNumber: '', cardName: '', expiryDate: '', cvv: '',
  });

  useEffect(() => {
    setIsClient(true);
    setOrderNumber(Math.random().toString(36).substr(2, 9).toUpperCase());
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const subtotal = getCartTotal();
  const handlingFee = 1.99;

  const deliveryInfo = useMemo(() => {
    const pc = formData.postcode.toUpperCase().trim();
    if (pc.length < 2) return { cost: 5.99, isFree: false, valid: true };
    const isMainland = MAINLAND_PREFIXES.some(prefix => pc.startsWith(prefix));
    if (!isMainland) return { cost: 0, isFree: false, valid: false, message: 'Zona Offshore - Sob Consulta' };
    let cost = deliveryDay === 'saturday' ? (subtotal >= 100 ? 0 : 6.99) : (subtotal >= 70 ? 0 : 5.99);
    return { cost, isFree: cost === 0, valid: true };
  }, [formData.postcode, subtotal, deliveryDay]);

  const totalGeral = subtotal + deliveryInfo.cost + handlingFee;

  // FUNÇÃO DE ENVIO CORRIGIDA
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!deliveryInfo.valid) return alert("Verifique seu Postcode.");
    
    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          customer: formData,
          orderNumber: orderNumber,
          total: totalGeral,
          deliveryDay: deliveryDay
        }),
      });

      if (response.ok) {
        setStep(4);
        clearCart();
      } else {
        const err = await response.json();
        alert("Erro no pagamento: " + err.message);
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) return null;

  if (step === 4) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Pedido Confirmado! 🎉</h2>
          <p className="text-gray-600 mb-6">Você receberá um e-mail de confirmação em instantes.</p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-500">Número do Pedido</p>
            <p className="text-2xl font-bold text-green-600">#{orderNumber}</p>
          </div>
          <button onClick={() => router.push('/produtos')} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold">Continuar Comprando</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-bold mb-8">Finalizar Compra</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="bg-white p-8 rounded-xl shadow-sm border">
                  <h2 className="text-2xl font-bold mb-6">Dados Pessoais</h2>
                  <div className="space-y-4">
                    <input type="text" name="nome" placeholder="Nome Completo *" onChange={handleInputChange} required className="w-full p-3 border rounded-lg" />
                    <input type="email" name="email" placeholder="Email *" onChange={handleInputChange} required className="w-full p-3 border rounded-lg" />
                    <input type="tel" name="telefone" placeholder="Telefone *" onChange={handleInputChange} required className="w-full p-3 border rounded-lg" />
                  </div>
                  <button type="button" onClick={() => setStep(2)} className="w-full mt-8 bg-green-600 text-white py-4 rounded-lg font-bold uppercase">Ir para Entrega</button>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white p-8 rounded-xl shadow-sm border">
                  <h2 className="text-2xl font-bold mb-6">Entrega</h2>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <input type="text" name="postcode" placeholder="Postcode *" onChange={handleInputChange} required className="p-3 border rounded-lg" />
                    <input type="text" name="cidade" placeholder="Cidade *" onChange={handleInputChange} required className="p-3 border rounded-lg" />
                    <input type="text" name="endereco" placeholder="Endereço *" onChange={handleInputChange} required className="col-span-2 p-3 border rounded-lg" />
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 bg-gray-100 py-4 rounded-lg">Voltar</button>
                    <button type="button" onClick={() => setStep(3)} className="flex-1 bg-green-600 text-white py-4 rounded-lg font-bold">Ir para Pagamento</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-white p-8 rounded-xl shadow-sm border">
                  <h2 className="text-2xl font-bold mb-6">Pagamento Seguro</h2>
                  <div className="space-y-4">
                    <input type="text" name="cardNumber" placeholder="Número do Cartão *" onChange={handleInputChange} required className="w-full p-3 border rounded-lg" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" name="expiryDate" placeholder="MM/AA *" onChange={handleInputChange} required className="p-3 border rounded-lg" />
                      <input type="text" name="cvv" placeholder="CVV *" onChange={handleInputChange} required className="p-3 border rounded-lg" />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button type="button" onClick={() => setStep(2)} className="flex-1 bg-gray-100 py-4 rounded-lg">Voltar</button>
                    <button type="submit" disabled={loading} className="flex-1 bg-green-700 text-white py-4 rounded-lg font-black uppercase shadow-lg disabled:bg-gray-400">
                      {loading ? "Processando..." : "Pagar Agora"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-md border sticky top-24">
              <h3 className="text-xl font-bold mb-4">Resumo</h3>
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm mb-2">
                  <span>{item.name} x{item.quantity}</span>
                  <span>£{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>£{subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-gray-600"><span>Frete</span><span>£{deliveryInfo.cost.toFixed(2)}</span></div>
                <div className="flex justify-between text-2xl font-black pt-4 border-t"><span>TOTAL</span><span className="text-green-700">£{totalGeral.toFixed(2)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
