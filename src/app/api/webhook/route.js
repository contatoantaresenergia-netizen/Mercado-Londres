import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY 
  );

  const body = await req.text();
  const headerList = await headers();
  const sig = headerList.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_details?.email;

    // 1. Salva o pedido
    const { error } = await supabase.from('orders').insert([{
      customer_email: email,
      total: session.amount_total / 100,
      status: 'pago',
      order_number: `ML-${Date.now()}`
    }]);

    // 2. Envia o e-mail
    if (!error && email) {
      await resend.emails.send({
        from: 'Mercado Londres <onboarding@resend.dev>',
        to: email,
        subject: 'Pedido Confirmado! 🛒',
        html: `<h1>Obrigado!</h1><p>Seu pagamento de R$ ${session.amount_total / 100} foi aprovado.</p>`
      });
    }
  }

  return NextResponse.json({ received: true });
}
