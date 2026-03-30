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

    // 1. Validações básicas
    if (!total || total <= 0) return NextResponse.json({ error: 'Total inválido' }, { status: 400 });
    if (!customer?.email) return NextResponse.json({ error: 'E-mail do cliente é obrigatório' }, { status: 400 });

    // 2. Criar PaymentIntent no Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: 'gbp',
      receipt_email: customer.email,
      metadata: { orderNumber: orderNumber || '' },
    });

    // 3. Guardar o Pedido Principal (tabela orders)
    const { data: orderData, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        order_number: orderNumber,
        stripe_payment_intent_id: paymentIntent.id,
        status: 'pending',
        total_amount: total,
        currency: 'gbp',
        customer_email: customer.email,
        customer_name: customer.nome,
        customer_postcode: customer.postcode,
        customer_address: customer.endereco,
        items: items || [], // Aqui salvamos o JSON bruto por segurança
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 4. Guardar Itens Detalhados (tabela order_items)
    if (items && items.length > 0 && orderData?.id) {
      const orderItemsToInsert = items.map(item => ({
        order_id: orderData.id,
        // MAPEAMENTO FLEXÍVEL: tenta pegar qualquer nome de campo comum
        product_name: item.name || item.title || item.product_name || item.nome || 'Produto',
        quantity: parseInt(item.quantity || item.qty || 1),
        price: parseFloat(item.price || 0),
        image_url: item.image || item.image_url || item.thumb || null,
      }));

      const { error: itemsError } = await supabaseAdmin
        .from('order_items')
        .insert(orderItemsToInsert);

      if (itemsError) console.error('Erro ao inserir order_items:', itemsError);
    }

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });

  } catch (error) {
    console.error('Erro no checkout:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
