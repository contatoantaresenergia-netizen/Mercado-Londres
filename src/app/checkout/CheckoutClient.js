'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { CreditCard, Truck, CheckCircle, Info, Calendar } from 'lucide-react';

// Lista de prefixos Mainland UK para validação
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
  const [deliveryDay, setDeliveryDay] = useState('weekday'); // 'weekday' ou 'saturday'
  
  const [formData, setFormData] = useState({
    nome: '', email: '', telefone: '', endereco: '',
    numero: '', complemento: '', cidade: '', postcode: '',
    cardNumber: '', cardName: '', expiryDate: '', cvv: '',
  });

  useEffect(() => {
    setIsClient(true);
    setOrderNumber(Math.random().toString(36).substr(2, 9).toUpperCase());
  }, []);

  useEffect(() => {
    if (isClient && cart.length === 0 && step !== 4) {
      router.push('/produtos');
    }
  }, [isClient, cart.length, step, router]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- LÓGICA DE CÁLCULO DE FRETE ---
  const subtotal = getCartTotal();
  const handlingFee = 1.99;

  const deliveryInfo = useMemo(() => {
    const pc = formData.postcode.toUpperCase().trim();
    if (pc.length < 2) return { cost: 5.99, isFree: false, valid: true };

    const isMainland = MAINLAND_PREFIXES.some(prefix => pc.startsWith(prefix));
    
    if (!isMainland) return { cost: 0, isFree: false, valid: false, message: 'Zona Offshore - Sob Consulta' };

    let cost = 0;
    if (deliveryDay === 'saturday') {
      cost = subtotal >= 100 ? 0 : 6.99;
    } else {
      cost = subtotal >= 70 ? 0 : 5.99;
    }

    return { cost, isFree: cost === 0, valid: true };
  }, [formData.postcode, subtotal, deliveryDay]);

  const totalFreteFinal = deliveryInfo.cost + handlingFee;
  const totalGeral = subtotal + totalFreteFinal;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!deliveryInfo.valid) {
        alert("Por favor, verifique seu Postcode. No momento atendemos apenas Mainland UK automaticamente.");
        return;
    }
    setStep(4);
    setTimeout(() => { clearCart(); }, 2000);
  };

  if (!isClient) return null;

  // TELA DE SUCESSO (Mantida igual a sua)
  if (step === 4) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Pedido Confirmado! 🎉</h2>
          <p className="text-gray-600 mb-6">Obrigado pela sua compra no Prime Brasil Market!</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center">
            <p className="text-sm text-gray-600 mb-1">Número do Pedido</p>
            <p className="text-2xl font-bold text-green-600">#{orderNumber}</p>
          </div>
          <button onClick={() => router.push('/produtos')} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition">
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 tracking-tight">Finalizar Compra</h1>
          
          {/* STEPS */}
          <div className="flex items-center justify-center mb-12">
             {[1, 2, 3].map((num) => (
               <React.Fragment key={num}>
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= num ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>{num}</div>
                 {num < 3 && <div className={`w-24 h-1 ${step > num ? 'bg-green-600' : 'bg-gray-300'}`}></div>}
               </React.Fragment>
             ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* PASSO 1: DADOS PESSOAIS */}
                {step === 1 && (
                  <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Dados Pessoais</h2>
                    <div className="space-y-4">
                      <input type="text" name="nome" placeholder="Nome Completo *" value={formData.nome} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none" />
                      <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none" />
                      <input type="tel" name="telefone" placeholder="Telefone / WhatsApp *" value={formData.telefone} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none" />
                    </div>
                    <button type="button" onClick={() => setStep(2)} className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition uppercase tracking-wider">Continuar para Entrega</button>
                  </div>
                )}

                {/* PASSO 2: ENDEREÇO E OPÇÕES DE FRETE */}
                {step === 2 && (
                  <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"><Truck className="w-6 h-6 text-green-600" /> Opções de Entrega</h2>
                    
                    {/* Endereço */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <input type="text" name="postcode" placeholder="Postcode *" value={formData.postcode} onChange={handleInputChange} required className={`w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 ${!deliveryInfo.valid ? 'border-red-500 ring-red-100' : 'border-gray-300 focus:ring-green-600'}`} />
                      <input type="text" name="cidade" placeholder="Cidade *" value={formData.cidade} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none" />
                      <input type="text" name="endereco" placeholder="Endereço *" value={formData.endereco} onChange={handleInputChange} required className="md:col-span-2 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none" />
                    </div>

                    {!deliveryInfo.valid && (
                      <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm flex items-center gap-2">
                        <Info className="w-4 h-4" /> {deliveryInfo.message}
                      </div>
                    )}

                    {/* Escolha do Dia */}
                    <div className="space-y-4 mb-8">
                      <p className="font-bold text-gray-700 mb-2">Escolha o período de entrega:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className={`cursor-pointer border-2 p-4 rounded-xl transition ${deliveryDay === 'weekday' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                          <input type="radio" name="deliveryDay" value="weekday" checked={deliveryDay === 'weekday'} onChange={() => setDeliveryDay('weekday')} className="hidden" />
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-green-600" />
                            <div>
                              <p className="font-bold text-gray-800">Terça a Sexta</p>
                              <p className="text-xs text-gray-500">Frete Grátis acima de £70</p>
                            </div>
                          </div>
                        </label>
                        <label className={`cursor-pointer border-2 p-4 rounded-xl transition ${deliveryDay === 'saturday' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                          <input type="radio" name="deliveryDay" value="saturday" checked={deliveryDay === 'saturday'} onChange={() => setDeliveryDay('saturday')} className="hidden" />
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-green-600" />
                            <div>
                              <p className="font-bold text-gray-800">Sábado</p>
                              <p className="text-xs text-gray-500">Frete Grátis acima de £100</p>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button type="button" onClick={() => setStep(1)} className="flex-1 bg-gray-100 text-gray-600 font-bold py-4 rounded-lg hover:bg-gray-200 transition">Voltar</button>
                      <button type="button" onClick={() => setStep(3)} disabled={!deliveryInfo.valid} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition disabled:bg-gray-400 uppercase tracking-wider">Pagar Agora</button>
                    </div>
                  </div>
                )}

                {/* PASSO 3: PAGAMENTO (Mantido igual) */}
                {step === 3 && (
                  <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"><CreditCard className="w-6 h-6 text-green-600" /> Pagamento Seguro</h2>
                    <div className="space-y-4">
                      <input type="text" name="cardNumber" placeholder="Número do Cartão *" value={formData.cardNumber} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none" />
                      <input type="text" name="cardName" placeholder="Nome Impresso no Cartão *" value={formData.cardName} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none" />
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" name="expiryDate" placeholder="MM/AA *" value={formData.expiryDate} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none" />
                        <input type="text" name="cvv" placeholder="CVV *" value={formData.cvv} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none" />
                      </div>
                    </div>
                    <div className="flex gap-4 mt-8">
                      <button type="button" onClick={() => setStep(2)} className="flex-1 bg-gray-100 text-gray-600 font-bold py-4 rounded-lg hover:bg-gray-200 transition">Voltar</button>
                      <button type="submit" className="flex-1 bg-green-700 hover:bg-green-800 text-white font-black py-4 rounded-lg transition uppercase tracking-widest shadow-lg">Finalizar Pedido</button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* RESUMO DO PEDIDO - FIXO NO LADO DIREITO */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24 border border-green-50">
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Resumo da Compra</h3>
                <div className="max-h-60 overflow-y-auto mb-4 space-y-3 pr-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name} <span className="text-xs font-bold text-green-600">x{item.quantity}</span></span>
                      <span className="font-semibold text-gray-800">£{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm">
                    <span className="flex items-center gap-1">Taxa de Manuseio <Info className="w-3 h-3 cursor-help" title="Embalagem térmica e conservação" /></span>
                    <span className="font-medium">£{handlingFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Frete DPD ({deliveryDay === 'saturday' ? 'Sábado' : 'Terça a Sexta'})</span>
                    <span className={deliveryInfo.isFree ? 'text-green-600 font-bold' : 'font-medium'}>
                      {deliveryInfo.isFree ? 'GRÁTIS' : `£${deliveryInfo.cost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-2xl font-black text-gray-900 pt-4 border-t-2 border-dashed">
                    <span>TOTAL</span>
                    <span className="text-green-700 underline decoration-yellow-400">£{totalGeral.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
