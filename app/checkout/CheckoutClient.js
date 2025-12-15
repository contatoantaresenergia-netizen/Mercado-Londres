'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { CreditCard, Truck, CheckCircle } from 'lucide-react';

export default function CheckoutClient() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const [orderNumber, setOrderNumber] = useState(''); // Estado para evitar erro de número aleatório
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    numero: '',
    complemento: '',
    cidade: '',
    postcode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(4);
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  if (!isClient) return null;

  if (step === 4) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Pedido Confirmado! 🎉</h2>
          <p className="text-gray-600 mb-6">Obrigado pela sua compra! Você receberá um email de confirmação em breve.</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Número do Pedido</p>
            <p className="text-2xl font-bold text-green-600">#{orderNumber}</p>
          </div>
          <button
            onClick={() => router.push('/produtos')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const frete = subtotal >= 50 ? 0 : 4.99;
  const total = subtotal + frete;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Finalizar Compra</h1>
          
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>1</div>
              <div className={`w-24 h-1 ${step >= 2 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            </div>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>2</div>
              <div className={`w-24 h-1 ${step >= 3 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>3</div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Dados Pessoais</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
                        <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Telefone *</label>
                        <input type="tel" name="telefone" value={formData.telefone} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent" />
                      </div>
                    </div>
                    <button type="button" onClick={() => setStep(2)} className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition">Continuar para Entrega</button>
                  </div>
                )}

                {step === 2 && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"><Truck className="w-6 h-6" /> Endereço de Entrega</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Endereço *</label>
                        <input type="text" name="endereco" value={formData.endereco} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Número *</label>
                          <input type="text" name="numero" value={formData.numero} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Complemento</label>
                          <input type="text" name="complemento" value={formData.complemento} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cidade *</label>
                        <input type="text" name="cidade" value={formData.cidade} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Postcode *</label>
                        <input type="text" name="postcode" value={formData.postcode} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent" />
                      </div>
                    </div>
                    <div className="flex gap-4 mt-6">
                      <button type="button" onClick={() => setStep(1)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-lg transition">Voltar</button>
                      <button type="button" onClick={() => setStep(3)} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition">Continuar para Pagamento</button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2"><CreditCard className="w-6 h-6" /> Pagamento</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Número do Cartão *</label>
                        <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="1234 5678 9012 3456" required maxLength="19" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nome no Cartão *</label>
                        <input type="text" name="cardName" value={formData.cardName} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Validade *</label>
                          <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} placeholder="MM/AA" required maxLength="5" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                          <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} placeholder="123" required maxLength="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent" />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-6">
                      <button type="button" onClick={() => setStep(2)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-lg transition">Voltar</button>
                      <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition">Finalizar Pedido</button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Resumo do Pedido</h3>
                <div className="space-y-3 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.name} x{item.quantity}</span>
                      <span className="font-medium">£{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Frete</span>
                    <span className={frete === 0 ? 'text-green-600 font-medium' : ''}>{frete === 0 ? 'GRÁTIS' : `£${frete.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t">
                    <span>Total</span>
                    <span className="text-green-700">£{total.toFixed(2)}</span>
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
