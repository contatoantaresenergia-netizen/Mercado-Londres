'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { CheckCircle, MapPin, Lock } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const MAINLAND_PREFIXES = ['E1','E2','E3','E4','E5','E6','E7','E8','E9','N1','NW1','SE1','SW1','W','WC','BR','CR','HA','IG','KT','RM','SM','TW','UB','AB','AL','B','BA','BB','BD','BH','BL','BN','BS','CA','CB','CF','CH','CM','CO','CT','CV','CW','DA','DD','DE','DG','DH','DL','DN','DT','DY','EN','EH','EX','FK','FY','G','GL','GU','HD','HG','HP','HR','HU','HX','IP','KA','KY','L','LA','LD','LE','LL','LN','LS','LU','M','ME','MK','ML','NE','NG','NN','NP','NR','OL','OX','PA','PE','PH','PL','PO','PR','RG','RH','S','SA','SG','SK','SL','SN','SO','SP','SR','SS','ST','SY','TA','TD','TF','TN','TQ','TR','TS','WA','WD','WF','WN','WR','WS','WV','YO'];

export default function CheckoutClient() {
  const router = useRouter();
  CartTotal, clearCart, cart: cartItems } = useCart();
  const [orderNumber, setOrderNumber] = useState('');
  const [deliveryDay, setDeliveryDay] = useState('weekday');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ nome: '', email: '', postcode: '', endereco: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [postcodeError, setPostcodeError] = useState('');

  useEffect(() => { setOrderNumber(Math.random().toString(36).substr(2, 9).toUpperCase()); }, []);

  const subtotal = getCartTotal();

  const deliveryInfo = useMemo(() => {
    const pc = formData.postcode.toUpperCase().trim();
    if (pc.length < 2) return { cost: 5.99, valid: true, isFree: false };
    const isMainland = MAINLAND_PREFIXES.some(p => pc.startsWith(p));
    if (!isMainland) return { cost: 0, valid: false, isFree: false };
    const cost = deliveryDay === 'saturday' ? (subtotal >= 100 ? 0 : 6.99) : (subtotal >= 70 ? 0 : 5.99);
    return { cost, valid: true, isFree: cost === 0 };
  }, [formData.postcode, subtotal, deliveryDay]);

  const totalGeral = subtotal + deliveryInfo.cost;

  const handleStartPayment = async (e) => {
    e.preventDefault();
    if (!deliveryInfo.valid) return;
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ total: totalGeral, orderNumber, customer: formData, items: cartItems || [] }),
      });
      const data = await res.json();
      if (res.ok && data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        alert('Erro ao iniciar pagamento: ' + (data.error || 'Tente novamente.'));
      }
    } catch (err) {
      alert('Erro de conexão. Verifique sua internet.');
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) return (
    <div className="min-h-screen flex items-center justify-center bg-white p-10 text-center">
      <div>
        <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
        <h2 className="text-3xl font-black italic uppercase">Pedido Confirmado!</h2>
        <p className="text-xl mt-2 font-mono font-bold text-gray-500">#{orderNumber}</p>
        <p className="mt-4 text-gray-500 text-sm">Confirmação enviada para <strong>{formData.email}</strong></p>
        <button onClick={() => router.push('/')} className="mt-8 bg-black text-white px-10 py-4 rounded-full font-bold uppercase hover:bg-green-600 transition-all">
          Voltar à Loja
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-black mb-8 italic uppercase tracking-tighter">Finalizar Compra</h1>
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {!clientSecret ? (
            <form onSubmit={handleStartPayment} className="space-y-8">
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 italic uppercase">
                  <MapPin size={22} className="text-green-600"/> Dados de Entrega
                </h2>
                <div className="grid md:grid-cols-2 gap-5">
                  <input placeholder="NOME COMPLETO *" value={formData.nome}
                    onChange={e => setFormData({...formData, nome: e.target.value})} required
                    className="p-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500" />
                  <input placeholder="E-MAIL *" type="email" value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})} required
                    className="p-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500" />
                  <div>
                    <input placeholder="POSTCODE *" value={formData.postcode}
                      onChange={e => { setFormData({...formData, postcode: e.target.value.toUpperCase()}); setPostcodeError(''); }}
                      onBlur={() => { if (formData.postcode && !deliveryInfo.valid) setPostcodeError('Postcode fora da área de entrega.'); }}
                      required className={`w-full p-4 rounded-2xl border font-black outline-none focus:ring-2 focus:ring-green-500 ${postcodeError ? 'border-red-400 bg-red-50' : 'border-gray-200'}`} />
                    {postcodeError && <p className="text-red-500 text-xs mt-1.5">{postcodeError}</p>}
                  </div>
                  <input placeholder="ENDEREÇO E NÚMERO *" value={formData.endereco}
                    onChange={e => setFormData({...formData, endereco: e.target.value})} required
                    className="p-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500" />
                </div>
                <div className="mt-6">
                  <p className="text-xs font-bold uppercase text-gray-500 mb-3">Dia de Entrega</p>
                  <div className="flex gap-3">
                    {[
                      { key: 'weekday', label: `Ter–Sex ${subtotal >= 70 ? '(GRÁTIS acima £70)' : '(£5.99)'}` },
                      { key: 'saturday', label: `Sábado ${subtotal >= 100 ? '(GRÁTIS acima £100)' : '(£6.99)'}` },
                    ].map(opt => (
                      <button key={opt.key} type="button" onClick={() => setDeliveryDay(opt.key)}
                        className={`flex-1 py-3 rounded-2xl text-sm font-bold border-2 transition-all ${deliveryDay === opt.key ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-500'}`}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button type="submit" disabled={loading || !deliveryInfo.valid || subtotal === 0}
                className="w-full bg-green-600 text-white py-6 rounded-3xl font-black text-2xl uppercase italic hover:bg-green-700 shadow-xl disabled:bg-gray-200 disabled:cursor-not-allowed transition-all">
                {loading ? 'PROCESSANDO...' : `PROSSEGUIR PARA PAGAMENTO • £${totalGeral.toFixed(2)}`}
              </button>
            </form>
          ) : (
            <div className="bg-white p-8 rounded-3xl border-2 border-green-100 shadow-lg">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 italic uppercase text-green-700">
                <Lock size={22}/> Pagamento Seguro
              </h2>
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm onOrderComplete={() => { setIsSuccess(true); clearCart(); }} />
              </Elements>
              <button onClick={() => setClientSecret('')} className="mt-4 text-sm text-gray-500 underline">
                ← Alterar dados de entrega
              </button>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border-2 border-gray-50 h-fit sticky top-10 shadow-sm">
            <h3 className="font-black text-2xl mb-6 italic uppercase border-b pb-4">Resumo</h3>
            <div className="space-y-4 font-bold text-base">
              <div className="flex justify-between text-gray-600"><span>Produtos</span><span>£{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600">
                <span>Entrega</span>
                <span className={deliveryInfo.isFree ? 'text-green-600 font-black' : ''}>
                  {deliveryInfo.isFree ? 'GRÁTIS 🎉' : `£${deliveryInfo.cost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between font-black text-3xl pt-6 border-t border-dashed text-green-700 tracking-tighter">
                <span>TOTAL</span><span>£{totalGeral.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t">
              <p className="text-xs font-bold uppercase text-gray-400 mb-3 text-center">Pagamento aceito</p>
              <div className="flex justify-center gap-2 flex-wrap">
                {['VISA','MC','AMEX','PayPal'].map(b => (
                  <span key={b} className="bg-gray-100 text-gray-500 text-xs font-black px-2 py-1 rounded-lg">{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
