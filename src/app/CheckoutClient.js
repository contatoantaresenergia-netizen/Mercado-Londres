import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

export default function CheckoutForm({ clientSecret, onOrderComplete }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Para onde o user vai se o pagamento exigir 3D Secure (como o MB Way ou apps de banco)
        return_url: `${window.location.origin}/success`,
      },
      // Se quiseres que ele NÃO redirecione automaticamente em pagamentos diretos:
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      // Pagamento confirmado com sucesso!
      onOrderComplete();
    }
    
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      <button 
        disabled={isProcessing || !stripe}
        className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800 disabled:bg-gray-400"
      >
        {isProcessing ? "A processar..." : "Pagar Agora"}
      </button>
    </form>
  );
}
