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

    if (!total || total <= 0) {
      return NextResponse.json({ error: 'Total inválido' }, { status: 400 });
    }
    if (!customer?.email || !customer?.nome) {
      return NextResponse.json({ error: 'Dados do cliente incompletos' }, { status: 400 });
    }

    // Criar PaymentIntent no Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: 'gbp',
      receipt_email: customer.email,
      metadata: {
        orderNumber: orderNumber || '',
        email: customer.email || '',
        postcode: customer.postcode || '',
        nome: customer.nome || '',
      },
    });

    // Guardar pedido na tabela orders
    const { data: orderData, error: orderError } = await supabaseAdmin.from('orders').insert({
      order_number: orderNumber,
      stripe_payment_intent_id: paymentIntent.id,
      status: 'pending',
      total_amount: total,
      currency: 'gbp',
      customer_email: customer.email,
      customer_name: customer.nome,
      customer_postcode: customer.postcode,
      customer_address: customer.endereco,
      items: items || [],
      created_at: new Date().toISOString(),
    }).select().single();

    if (orderError) {
      console.error('Erro ao guardar pedido:', orderError);
      return NextResponse.json({ error: orderError.message }, { status: 500 });
    }

    // Guardar itens na tabela order_items
    if (items && items.length > 0 && orderData?.id) {
      const orderItems = items.map(item => ({
        order_id: orderData.id,
        product_name: item.name || item.title || item.product_name || 'Produto',
        quantity: item.quantity || 1,
        price: item.price || 0,
        image_url: item.image || item.image_url || null,
      }));

      const { error: itemsError } = await supabaseAdmin.from('order_items').insert(orderItems);

      if (itemsError) {
        console.error('Erro ao guardar itens:', itemsError);
        // Não bloqueamos o pagamento por causa deste erro
      }
    }

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });

  } catch (error) {
    console.error('Erro no checkout:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
