import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const body = await req.json();
    const { total, orderNumber, customer, items } = body;

    if (!total || total <= 0) {
      return NextResponse.json({ error: 'Total inválido' }, { status: 400 });
    }
    if (!customer?.email || !customer?.nome) {
      return NextResponse.json({ error: 'Dados do cliente incompletos' }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: 'gbp',
      receipt_email: customer.email,
      metadata: {
        orderNumber: orderNumber || '',
        email: customer.email || '',
        postcode: customer.postcode || '',
        nome: customer.nome || '',
      },
    });

    await supabaseAdmin.from('orders').insert({
      order_number: orderNumber,
      stripe_payment_intent_id: paymentIntent.id,
      status: 'pending',
      total_amount: total,
      currency: 'gbp',
      customer_email: customer.email,
      customer_name: customer.nome,
      customer_postcode: customer.postcode,
      customer_address: customer.endereco,
      items: items || [],
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Erro no checkout:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
