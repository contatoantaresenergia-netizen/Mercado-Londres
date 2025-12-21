import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic'; // Força a rota a ser dinâmica e ignora validação estática no build

export async function POST(req) {
  // Inicialização INTERNA - Só acontece quando a rota é chamada de verdade
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
      return NextResponse.json({ error: 'Security keys missing' }, { status: 400 });
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Inserção na tabela 'orders' do seu print
    const { error } = await supabase
      .from('orders')
      .insert([{
        customer_id: session.metadata?.user_id || null, 
        total: session.amount_total / 100,
        status: 'pago'
      }]);

    if (error) console.error("Erro no Supabase:", error.message);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
