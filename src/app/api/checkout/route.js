import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Esta linha usa a chave sk_test que você configurou na Vercel
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { total, orderNumber, customer } = body;

    // Criar a intenção de pagamento no Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Converte o valor para centavos (ex: £9.77 vira 977)
      currency: 'gbp',
      metadata: { 
        orderNumber: orderNumber,
        customer_email: customer.email,
        postcode: customer.postcode
      },
      // Habilita métodos de pagamento automáticos (Cartão, etc)
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      success: true 
    });
  } catch (error) {
    console.error("Erro no Stripe:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
