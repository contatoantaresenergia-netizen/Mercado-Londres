import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers'; // Importe os headers
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
  
  // Use a SERVICE_ROLE_KEY para garantir permissão de escrita no banco
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY 
  );

  const body = await req.text();
  const headerList = await headers();
  const sig = headerList.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (!sig || !webhookSecret) {
      console.error("Faltando assinatura ou segredo do webhook");
      return NextResponse.json({ error: 'Security keys missing' }, { status: 400 });
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error(`Erro na validação do Stripe: ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Log para você debugar no terminal da Vercel/Local
    console.log("Processando sessão:", session.id);

    const { data, error } = await supabase
      .from('orders')
      .insert([{
        customer_email: session.customer_details?.email || session.metadata?.email, 
        total: session.amount_total / 100,
        order_number: session.metadata?.orderNumber || `ORD-${Date.now()}`, // Fallback para não dar erro
        status: 'pago',
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.error("Erro ao salvar no Supabase:", error.message);
      // O Stripe tentará reenviar o webhook se retornarmos erro aqui
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
