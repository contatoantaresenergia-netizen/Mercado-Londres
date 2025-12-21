import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Use a SERVICE_ROLE_KEY para ignorar políticas de RLS no backend
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY 
);

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Inserindo na tabela 'orders' que você mostrou no print
    const { error } = await supabase
      .from('orders')
      .insert([{
        customer_id: session.metadata?.user_id || null, 
        total: session.amount_total / 100,
        status: 'pago'
      }]);

    if (error) console.error("Erro Supabase:", error);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
