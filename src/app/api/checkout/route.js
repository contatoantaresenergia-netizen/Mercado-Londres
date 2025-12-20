import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Aqui o Stripe usa OBRIGATORIAMENTE a chave secreta (sk_test...)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { total, orderNumber, customer } = body;

    // Esta chamada create() exige permissão total (Secret Key)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), 
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
    console.error("Erro no Backend Stripe:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
