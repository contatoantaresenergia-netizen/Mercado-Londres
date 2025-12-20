import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'; // o componente que criamos acima

// Usa a tua PUBLIC KEY (pk_test_...) aqui
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutClient() {
  const [clientSecret, setClientSecret] = useState('');
  const [showStripe, setShowStripe] = useState(false);

  // Esta é a função que já tinhas, mas agora ela guarda o segredo
  const startCheckout = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ total, orderNumber, customer }),
    });
    
    const data = await res.json();
    
    if (data.clientSecret) {
      setClientSecret(data.clientSecret);
      setShowStripe(true); // Mostra o formulário do Stripe
    } else {
      alert("Erro ao iniciar checkout: " + data.error);
    }
  };

  return (
    <div>
      {/* ... teus campos de morada e nome ... */}
      
      {!showStripe ? (
        <button onClick={startCheckout} className="btn-finalizar">
          Ir para Pagamento
        </button>
      ) : (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <h3 className="text-lg font-bold mb-4">Dados de Pagamento</h3>
          <CheckoutForm 
            clientSecret={clientSecret} 
            onOrderComplete={() => setIsSuccess(true)} 
          />
        </Elements>
      )}
    </div>
  );
}
