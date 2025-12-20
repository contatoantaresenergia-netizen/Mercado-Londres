import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Inicializa com a chave secreta (sk_test_...)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { total, orderNumber, customer } = body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), 
      currency: 'gbp',
      metadata: { 
        orderNumber, 
        customer_email: customer.email 
      },
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      success: true 
    });
  } catch (error) {
    // Se o erro persistir, este console.log mostrará o motivo real nos logs da Vercel
    console.error("Erro Crítico Stripe:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
