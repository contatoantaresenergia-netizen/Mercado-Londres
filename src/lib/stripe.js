import { loadStripe } from '@stripe/stripe-js';

// Esta função inicializa o Stripe no Frontend usando a chave que você colocou na Vercel
export const getStripe = () => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  return stripePromise;
};
