import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe'; // Certifique-se que exportou 'stripe' de lib/stripe
import { supabase } from '@/lib/supabase';

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Quando o pagamento é concluído com sucesso
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // 1. Inserir na tabela 'orders'
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          stripe_checkout_id: session.id,
          customer_email: session.customer_details.email,
          total_amount: session.amount_total / 100,
          status: 'paid',
        },
      ])
      .select()
      .single();

    if (orderError) console.error('Erro ao criar pedido:', orderError);

    // Aqui você também pode mapear os itens e inserir na tabela 'order_items'
    // que aparece na sua imagem do Supabase.
  }

  return NextResponse.json({ received: true });
}
