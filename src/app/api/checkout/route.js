import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { total, orderNumber, customer } = body;

    if (!total) {
      return NextResponse.json(
        { error: 'Total inválido' },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // em centavos
      currency: 'gbp',

      metadata: {
        orderNumber: orderNumber || '',
        email: customer?.email || '',
        postcode: customer?.postcode || '',
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.error('Erro Stripe:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
