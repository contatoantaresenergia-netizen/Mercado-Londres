'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { CheckCircle, MapPin, Lock, ShoppingBag } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const MAINLAND_PREFIXES = ['E1','E2','E3','E4','E5','E6','E7','E8','E9','N1','NW1','SE1','SW1','W','WC','BR','CR','HA','IG','KT','RM','SM','TW','UB','AB','AL','B','BA','BB','BD','BH','BL','BN','BS','CA','CB','CF','CH','CM','CO','CT','CV','CW','DA','DD','DE','DG','DH','DL','DN','DT','DY','EN','EH','EX','FK','FY','G','GL','GU','HD','HG','HP','HR','HU','HX','IP','KA','KY','L','LA','LD','LE','LL','LN','LS','LU','M','ME','MK','ML','NE','NG','NN','NP','NR','OL','OX','PA','PE','PH','PL','PO','PR','RG','RH','S','SA','SG','SK','SL','SN','SO','SP','SR','SS','ST','SY','TA','TD','TF','TN','TQ','TR','TS','WA','WD','WF','WN','WR','WS','WV','YO'];

export default function CheckoutClient() {
  const router = useRouter();
  const { getCartTotal, clearCart, cart } = useCart();
  
  // ESTADOS CRÍTICOS
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderedItems, setOrderedItems] = useState([]); // Backup para a tela de sucesso
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [formData, setFormData] = useState({ nome: '', email: '', postcode: '', endereco: '' });

  useEffect(() => { 
    setOrderNumber(Math.random().toString(36).substr(2, 9).toUpperCase()); 
  }, []);

  const subtotal = getCartTotal();

  const deliveryInfo = useMemo(() => {
    const pc = formData.postcode.toUpperCase().trim();
    const isMainland = MAINLAND_PREFIXES.some(p => pc.startsWith(p));
    const cost = subtotal >= 70 ? 0 : 5.99;
    return { cost, valid: isMainland || pc === '' };
  }, [formData.postcode, subtotal]);

  const totalGeral = subtotal + deliveryInfo.cost;

  // FUNÇÃO QUE EXECUTA QUANDO O PAGAMENTO É APROVADO
  const handleOrderComplete = () => {
    setOrderedItems([...cart]); // 1. Salva cópia do carrinho ANTES de limpar
    setIsSuccess(true);         // 2. Muda para tela de sucesso
    clearCart();                // 3. Limpa o carrinho real
  };

  const handleStartPayment = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Carrinho vazio!");
    
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          total: totalGeral, 
          orderNumber, 
          customer: formData, 
          items: cart 
        }),
      });
      const data = await res.json();
      if (res.ok) setClientSecret(data.clientSecret);
    } catch (err) {
      alert('Erro na conexão');
    } finally {
      setLoading(false);
    }
  };

  // --- TELA DE SUCESSO (AQUI ESTAVA O ERRO) ---
  if (isSuccess) return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
        <h2 className="text-4xl font-black italic uppercase mb-2">Pedido Confirmado!</h2>
        <p className="text-gray-500 font-bold mb-8 italic">NÚMERO DO PEDIDO: #{orderNumber}</p>
        
        <div className="bg-gray-50 rounded-3xl p-8 text-left border-2 border-dashed border-gray-200">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 italic uppercase">
            <ShoppingBag size={20} className="text-green-600"/> Seus Produtos
          </h3>
          
          <div className="space-y-4">
            {/* AGORA USAMOS O orderedItems (BACKUP) EM VEZ DO cart (VAZIO) */}
            {orderedItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-gray-100 pb-4">
                <div className="flex items-center gap-4">
                  <span className="bg-green-100 text-green-700 w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm">
                    {item.quantity}x
                  </span>
                  <span className="font-bold text-gray-800 uppercase text-sm">
                    {item.name || item.title}
                  </span>
                </div>
                <span className="font-bold text-gray-900">
                  £{(Number(item.price) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t-4 border-double border-gray-200 flex justify-between items-center text-2xl font-black italic uppercase">
            <span>Total Pago</span>
            <span className="text-green-600 font-mono">£{totalGeral.toFixed(2)}</span>
          </div>
        </div>

        <button 
          onClick={() => router.push('/')} 
          className="mt-10 bg-black text-white px-12 py-5 rounded-full font-black uppercase italic hover:bg-green-600 transition-all shadow-xl"
        >
          Voltar para a Loja
        </button>
      </div>
    </div>
  );

  // --- TELA DE CHECKOUT NORMAL ---
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-black mb-8 italic uppercase tracking-tighter">Finalizar Compra</h1>
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {!clientSecret ? (
            <form onSubmit={handleStartPayment} className="space-y-6">
              {/* Campos do formulário aqui (Nome, Email, Postcode, Endereço) */}
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 grid md:grid-cols-2 gap-4">
                 <input placeholder="NOME COMPLETO *" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} required className="p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-green-500" />
                 <input placeholder="E-MAIL *" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required className="p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-green-500" />
                 <input placeholder="POSTCODE *" value={formData.postcode} onChange={e => setFormData({...formData, postcode: e.target.value.toUpperCase()})} required className="p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-green-500" />
                 <input placeholder="ENDEREÇO *" value={formData.endereco} onChange={e => setFormData({...formData, endereco: e.target.value})} required className="p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-6 rounded-3xl font-black text-2xl uppercase italic hover:bg-green-700 shadow-xl transition-all">
                {loading ? 'PROCESSANDO...' : `PAGAR £${totalGeral.toFixed(2)}`}
              </button>
            </form>
          ) : (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm onOrderComplete={handleOrderComplete} />
            </Elements>
          )}
        </div>
        
        {/* Resumo Lateral */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border-2 border-gray-50 sticky top-4">
            <h3 className="font-black text-xl mb-4 italic uppercase">Resumo</h3>
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between text-sm mb-2 font-bold uppercase italic text-gray-500">
                <span>{item.quantity}x {item.name}</span>
                <span>£{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-4 mt-4 font-black text-2xl text-green-700">
              TOTAL: £{totalGeral.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
