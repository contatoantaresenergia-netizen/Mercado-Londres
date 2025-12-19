import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { total, orderNumber, customer } = body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: 'gbp',
      metadata: { orderNumber, email: customer.email },
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      success: true 
    });
  } catch (error) {
    console.error("Erro Stripe:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
