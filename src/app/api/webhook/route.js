import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook inválido:', err.message);
    return NextResponse.json({ error: 'Webhook inválido' }, { status: 400 });
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const pi = event.data.object;
      await supabaseAdmin.from('orders').update({
        status: 'paid',
        paid_at: new Date().toISOString(),
      }).eq('stripe_payment_intent_id', pi.id);
      break;
    }
    case 'payment_intent.payment_failed': {
      const pi = event.data.object;
      await supabaseAdmin.from('orders').update({ status: 'failed' })
        .eq('stripe_payment_intent_id', pi.id);
      break;
    }
    case 'charge.refunded': {
      const charge = event.data.object;
      await supabaseAdmin.from('orders').update({ status: 'refunded' })
        .eq('stripe_payment_intent_id', charge.payment_intent);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
