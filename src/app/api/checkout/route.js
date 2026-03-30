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

    // Log de segurança para você ver na Vercel
    console.log("ITENS RECEBIDOS NA API:", JSON.stringify(items));

    if (!total || total <= 0) return NextResponse.json({ error: 'Total inválido' }, { status: 400 });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: 'gbp',
      receipt_email: customer?.email,
      metadata: { orderNumber: orderNumber || '' },
    });

    // Inserção na tabela 'orders'
    const { data: orderData, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        order_number: orderNumber,
        stripe_payment_intent_id: paymentIntent.id,
        status: 'pending',
        total_amount: total,
        currency: 'gbp',
        customer_email: customer?.email,
        customer_name: customer?.nome,
        customer_postcode: customer?.postcode,
        customer_address: customer?.endereco,
        items: items || [], // Se chegar aqui vazio, gravará []
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Inserção na tabela 'order_items'
    if (items && items.length > 0) {
      const orderItems = items.map(item => ({
        order_id: orderData.id,
        product_name: item.name || item.title || 'Produto',
        quantity: Number(item.quantity) || 1,
        price: Number(item.price) || 0,
        image_url: item.image || item.image_url || null,
      }));

      await supabaseAdmin.from('order_items').insert(orderItems);
    }

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Erro no Checkout:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
