import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
  
  // Usando as variáveis que você acabou de configurar com sucesso na Vercel
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY // Use a Anon Key que você salvou
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

  // Quando o pagamento é aprovado na página oficial do Stripe
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Salva o pedido no seu banco de dados Supabase
    const { error } = await supabase
      .from('orders')
      .insert([{
        customer_email: session.metadata?.email || session.customer_details?.email, 
        total: session.amount_total / 100,
        order_number: session.metadata?.orderNumber,
        status: 'pago',
        created_at: new Date().toISOString()
      }]);

    if (error) console.error("Erro ao salvar no Supabase:", error.message);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
