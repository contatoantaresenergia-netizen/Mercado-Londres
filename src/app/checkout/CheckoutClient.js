'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { CreditCard, Truck, CheckCircle, Info, Calendar, MapPin } from 'lucide-react';

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

  // AQUI ESTÁ A SUA CALCULADORA ORIGINAL PRESERVADA
  const deliveryInfo = useMemo(() => {
    const pc = formData.postcode.toUpperCase().trim();
    if (pc.length < 2) return { cost: 5.99, isFree: false, valid: true };
    
    const isMainland = MAINLAND_PREFIXES.some(prefix => pc.startsWith(prefix));
    
    if (!isMainland) {
      return { cost: 0, isFree: false, valid: false, message: 'Zona Offshore - Sob Consulta' };
    }

    let cost;
    if (deliveryDay === 'saturday') {
      cost = subtotal >= 100 ? 0 : 6.99;
    } else {
      cost = subtotal >= 70 ? 0 : 5.99;
    }

    return { cost, isFree: cost === 0, valid: true };
  }, [formData.postcode, subtotal, deliveryDay]);

  const totalGeral = subtotal + deliveryInfo.cost + handlingFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!deliveryInfo.valid) return alert("Desculpe, não entregamos automaticamente neste Postcode.");
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
          delivery: { day: deliveryDay, cost: deliveryInfo.cost }
        }),
      });

      if (response.ok) {
        setStep(4);
        clearCart();
      } else {
        alert("Erro no servidor. Verifique se configurou as chaves na Vercel.");
      }
    } catch (error) {
      alert("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) return null;

  if (step === 4) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold">Pedido Confirmado!</h2>
          <p className="text-gray-600 my-4">Obrigado! Enviamos um e-mail para {formData.email}.</p>
          <div className="bg-gray-50 p-4 rounded-lg border mb-6">
            <span className="text-sm text-gray-400">NÚMERO DO PEDIDO</span>
            <p className="text-2xl font-black text-green-700">#{orderNumber}</p>
          </div>
          <button onClick={() => router.push('/')} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold">Voltar à Loja</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-10 text-gray-900">Finalizar Pedido</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* COLUNA DA ESQUERDA: FORMULÁRIO */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit}>
              <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2"><MapPin className="text-green-600"/> Dados de Entrega</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <input name="nome" placeholder="Nome Completo *" onChange={handleInputChange} required className="p-3 border rounded-xl" />
                  <input name="email" type="email" placeholder="E-mail *" onChange={handleInputChange} required className="p-3 border rounded-xl" />
                  <input name="postcode" placeholder="Postcode (Ex: E1 6AN) *" onChange={handleInputChange} required className="p-3 border rounded-xl uppercase" />
                  <input name="cidade" placeholder="Cidade *" onChange={handleInputChange} required className="p-3 border rounded-xl" />
                  <input name="endereco" placeholder="Endereço Completo *" onChange={handleInputChange} required className="md:col-span-2 p-3 border rounded-xl" />
                </div>

                <div className="pt-6">
                  <h3 className="font-bold mb-3">Escolha o dia de entrega:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button type="button" onClick={() => setDeliveryDay('weekday')} className={`p-4 border rounded-xl text-left ${deliveryDay === 'weekday' ? 'border-green-600 bg-green-50' : ''}`}>
                      <p className="font-bold">Terça a Sexta</p>
                      <p className="text-xs text-gray-500 font-medium">£5.99 (Grátis > £70)</p>
                    </button>
                    <button type="button" onClick={() => setDeliveryDay('saturday')} className={`p-4 border rounded-xl text-left ${deliveryDay === 'saturday' ? 'border-green-600 bg-green-50' : ''}`}>
                      <p className="font-bold">Sábado</p>
                      <p className="text-xs text-gray-500 font-medium">£6.99 (Grátis > £100)</p>
                    </button>
                  </div>
                </div>

                <div className="pt-6">
                   <h2 className="text-xl font-bold flex items-center gap-2 mb-4"><CreditCard className="text-green-600"/> Pagamento</h2>
                   <input name="cardNumber" placeholder="Número do Cartão *" onChange={handleInputChange} required className="w-full p-3 border rounded-xl mb-4" />
                   <button type="submit" disabled={loading || !deliveryInfo.valid} className="w-full bg-green-600 text-white py-4 rounded-xl font-black text-xl uppercase shadow-lg disabled:bg-gray-300">
                    {loading ? "Processando..." : "Finalizar e Pagar"}
                   </button>
                </div>
              </div>
            </form>
          </div>

          {/* COLUNA DA DIREITA: RESUMO (A CALCULADORA APARECE AQUI) */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border sticky top-6">
              <h3 className="font-bold text-xl mb-6">Resumo</h3>
              <div className="space-y-3 text-sm text-gray-600 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="font-bold text-gray-900">£{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between"><span>Subtotal</span><span>£{subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between items-center font-medium">
                  <span>Entrega ({deliveryDay})</span>
                  <span className={deliveryInfo.isFree ? "text-green-600" : ""}>
                    {deliveryInfo.isFree ? "GRÁTIS" : `£${deliveryInfo.cost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400 text-xs"><span>Taxa de Manuseio</span><span>£1.99</span></div>
                
                {!deliveryInfo.valid && (
                  <div className="bg-red-50 text-red-600 p-2 rounded text-xs font-bold mt-2">
                    {deliveryInfo.message}
                  </div>
                )}

                <div className="flex justify-between text-3xl font-black pt-4 border-t text-green-700">
                  <span>TOTAL</span>
                  <span>£{totalGeral.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
