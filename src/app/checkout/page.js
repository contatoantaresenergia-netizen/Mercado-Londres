'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Truck, CreditCard, CheckCircle, ChevronRight } from 'lucide-react';
import { useCart } from '@/app/context/cartContext';

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, cartCount, cartTotal, clearCart } = useCart();
    
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [deliveryInfo, setDeliveryInfo] = useState({
        name: '',
        address: '',
        city: 'Londres',
        postcode: '',
        phone: '',
    });
    
    const subtotal = cartTotal;
    const shippingCost = subtotal >= 50 ? 0.00 : 5.00;
    const total = subtotal + shippingCost;

    const isStep1Valid = deliveryInfo.name && deliveryInfo.address && deliveryInfo.postcode && deliveryInfo.phone;
    const isStep2Valid = paymentMethod;

    useEffect(() => {
        if (cartCount === 0 && step !== 3) {
            router.push('/');
        }
    }, [cartCount, step, router]);

    const handlePlaceOrder = () => {
        if (cartCount === 0 || !isStep2Valid) return;
        setTimeout(() => {
            clearCart();
            setStep(3);
        }, 1500);
    };

    const ProgressStep = ({ num, label, isActive }) => (
        <div className="flex-1 flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white transition-colors duration-300 ${
                isActive ? 'bg-green-600' : 'bg-gray-400'
            }`}>
                {num}
            </div>
            <span className={`text-sm mt-1 text-center hidden sm:block ${isActive ? 'text-green-700 font-semibold' : 'text-gray-500'}`}>
                {label}
            </span>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-green-700 mb-8">
                    Finalizar Pedido
                </h1>

                <div className="flex justify-between items-center mb-10 bg-white p-4 rounded-lg shadow-md">
                    <ProgressStep num={1} label="Endereço de Entrega" isActive={step === 1} />
                    <div className="flex-1 h-1 bg-gray-300 mx-2 mt-4 hidden sm:block"></div>
                    <ProgressStep num={2} label="Opções de Pagamento" isActive={step === 2} />
                    <div className="flex-1 h-1 bg-gray-300 mx-2 mt-4 hidden sm:block"></div>
                    <ProgressStep num={3} label="Confirmação" isActive={step === 3} />
                </div>
                
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">

                        {step === 1 && (
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <Truck className="w-6 h-6 text-green-600" /> 1. Endereço de Entrega
                                </h2>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                                        <input
                                            type="text"
                                            value={deliveryInfo.name}
                                            onChange={(e) => setDeliveryInfo({...deliveryInfo, name: e.target.value})}
                                            placeholder="Seu nome"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Rua e Número</label>
                                        <input
                                            type="text"
                                            value={deliveryInfo.address}
                                            onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                                            placeholder="Ex: 123 Baker Street"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                        />
                                    </div>
                                    
                                    <div className='grid grid-cols-2 gap-4'>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">CEP (Postcode)</label>
                                            <input
                                                type="text"
                                                value={deliveryInfo.postcode}
                                                onChange={(e) => setDeliveryInfo({...deliveryInfo, postcode: e.target.value})}
                                                placeholder="Ex: SW1A 0AA"
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                                            <input
                                                type="tel"
                                                value={deliveryInfo.phone}
                                                onChange={(e) => setDeliveryInfo({...deliveryInfo, phone: e.target.value})}
                                                placeholder="Seu telefone"
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                                        <input
                                            type="text"
                                            value={deliveryInfo.city}
                                            disabled
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                                        />
                                    </div>

                                    <button
                                        onClick={() => setStep(2)}
                                        disabled={!isStep1Valid}
                                        className={`w-full font-bold py-3 px-6 rounded-lg transition mt-6 ${
                                            !isStep1Valid
                                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                            : 'bg-yellow-500 hover:bg-yellow-600 text-blue-900'
                                        }`}
                                    >
                                        Continuar para o Pagamento <ChevronRight className='w-4 h-4 inline ml-1'/>
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <CreditCard className="w-6 h-6 text-green-600" /> 2. Opções de Pagamento
                                </h2>
                                
                                <div className="space-y-4 mb-8">
                                    <label 
                                        onClick={() => setPaymentMethod('card')}
                                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
                                            paymentMethod === 'card' ? 'border-green-600 ring-2 ring-green-100 bg-green-50' : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="card"
                                            checked={paymentMethod === 'card'}
                                            onChange={() => setPaymentMethod('card')}
                                            className="w-4 h-4 text-green-600 focus:ring-green-500 mr-3"
                                        />
                                        <CreditCard className="w-5 h-5 text-gray-700 mr-3" />
                                        <span className="font-semibold text-gray-800">Cartão de Crédito / Débito</span>
                                    </label>

                                    <label 
                                        onClick={() => setPaymentMethod('paypal')}
                                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition ${
                                            paymentMethod === 'paypal' ? 'border-green-600 ring-2 ring-green-100 bg-green-50' : 'border-gray-300 hover:border-gray-400'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="paypal"
                                            checked={paymentMethod === 'paypal'}
                                            onChange={() => setPaymentMethod('paypal')}
                                            className="w-4 h-4 text-green-600 focus:ring-green-500 mr-3"
                                        />
                                        <div className="w-5 h-5 mr-3 bg-blue-900 rounded-sm text-xs text-white flex items-center justify-center font-bold">P</div>
                                        <span className="font-semibold text-gray-800">Pagar com PayPal</span>
                                    </label>
                                </div>

                                {paymentMethod === 'card' && (
                                    <div className='bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4'>
                                        <p className="text-sm font-semibold text-gray-700">Detalhes do Cartão (Simulação)</p>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Número do Cartão</label>
                                            <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full px-4 py-2 border rounded-lg" required />
                                        </div>
                                        <div className='grid grid-cols-3 gap-4'>
                                            <div className='col-span-2'>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Validade (MM/AA)</label>
                                                <input type="text" placeholder="MM/AA" className="w-full px-4 py-2 border rounded-lg" required />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                                                <input type="text" placeholder="123" className="w-full px-4 py-2 border rounded-lg" required />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700 text-sm">
                                    🔒 Transação segura. Você será cobrado £{total.toFixed(2)}.
                                </div>

                                <div className="space-y-4 mt-6">
                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={!isStep2Valid || cartCount === 0}
                                        className={`w-full font-bold py-3 px-6 rounded-lg transition ${
                                            !isStep2Valid || cartCount === 0
                                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                            : 'bg-green-600 hover:bg-green-700 text-white'
                                        }`}
                                    >
                                        Finalizar Compra e Pagar £{total.toFixed(2)}
                                    </button>
                                    <button
                                        onClick={() => setStep(1)}
                                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition"
                                    >
                                        Voltar ao Endereço
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="bg-white p-10 rounded-xl shadow-lg text-center border border-green-200">
                                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                                <h2 className="text-3xl font-bold text-green-700 mb-3">
                                    Pedido Concluído com Sucesso!
                                </h2>
                                <p className="text-lg text-gray-600 mb-6">
                                    Obrigado por sua compra. Enviamos um e-mail de confirmação para você.
                                </p>
                                <p className="text-sm font-medium text-gray-700 mb-8">
                                    Seu pedido será entregue no endereço: {deliveryInfo.address}, {deliveryInfo.postcode}.
                                </p>
                                <button
                                    onClick={() => router.push('/')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
                                >
                                    Voltar para a Página Inicial
                                </button>
                            </div>
                        )}
                        
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-lg sticky top-24">
                            <h2 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4 flex items-center gap-2">
                                <ShoppingCart className="w-5 h-5" /> Resumo do Pedido ({cartCount} Itens)
                            </h2>
                            
                            <div className="space-y-3 border-b pb-4 mb-4 max-h-64 overflow-y-auto">
                                {cart.length > 0 ? (
                                    cart.map(item => (
                                        <div key={item.id} className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600 truncate">
                                                {item.name} (x{item.quantity})
                                            </span>
                                            <span className="font-medium text-gray-800 flex-shrink-0">
                                                £{(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic text-sm">Carrinho Vazio</p>
                                )}
                            </div>
                            
                            <div className="space-y-2 border-b pb-4 mb-4 text-sm">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span className="font-medium">£{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Frete ({shippingCost > 0 ? 'Padrão' : 'Grátis'}):</span>
                                    <span className={`font-medium ${shippingCost === 0 ? 'text-green-600' : 'text-red-500'}`}>
                                        £{shippingCost.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Impostos (Incluídos):</span>
                                    <span className="font-medium">£0.00</span>
                                </div>
                            </div>

                            <div className="flex justify-between text-xl font-bold pt-2">
                                <span>Total Final:</span>
                                <span className="text-green-700">£{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
