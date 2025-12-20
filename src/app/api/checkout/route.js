import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Este log aparecerá apenas nos Logs da Vercel (não no navegador)
// Serve para confirmar se a Vercel está lendo a chave sk_test_...
console.log('Stripe Key Prefix:', process.env.STRIPE_SECRET_KEY?.slice(0, 7));

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { total, orderNumber, customer } = body;

    // Criando o PaymentIntent (Exige obrigatoriamente a Secret Key)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Converte para centavos
      currency: 'gbp',
      metadata: { 
        orderNumber: orderNumber,
        customer_email: customer.email,
        postcode: customer.postcode
      },
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      success: true 
    });

  } catch (error) {
    // Log detalhado para diagnóstico em caso de falha
    console.error("Erro Stripe Backend:", error.message);
    
    return NextResponse.json(
      { error: error.message }, 
      { status: 500 }
    );
  }
}
