import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req) {
  // 1. Inicializa o Stripe e Supabase apenas dentro da execução
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key'
  );

  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (!sig || !webhookSecret) {
      return NextResponse.json({ error: 'Faltam chaves de segurança' }, { status: 400 });
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Tenta inserir no banco
    const { error } = await supabase
      .from('orders')
      .insert([{
        customer_id: session.metadata?.user_id || null, 
        total: session.amount_total / 100,
        status: 'pago'
      }]);

    if (error) console.error("Erro Supabase:", error.message);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

// Isso avisa ao Next.js para não validar esta rota como estática
export const dynamic = 'force-dynamic';
