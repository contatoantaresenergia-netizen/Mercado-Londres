import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { total, orderNumber, customer } = body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'gbp',
          product_data: {
            name: `Pedido #${orderNumber}`,
            description: `Entrega para ${customer?.postcode}`,
          },
          unit_amount: Math.round(total * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pt/checkout?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pt/checkout`,
      metadata: { orderNumber, email: customer?.email },
    });

    return NextResponse.json({ url: session.url, success: true });
  } catch (error) {
    console.error("Erro Stripe:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
