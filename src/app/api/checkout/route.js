import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { total, orderNumber, customer } = body;

    // Criando uma Sessão de Checkout oficial do Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: `Pedido #${orderNumber || 'Novo'}`,
              description: `Entrega para ${customer?.address || 'Londres'}`,
            },
            unit_amount: Math.round(total * 100), // Converte £9.59 para 959 centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
      metadata: {
        orderNumber: orderNumber || 'N/A',
        customer_email: customer?.email || 'N/A'
      },
    });

    // Retornamos a URL para onde o usuário deve ser enviado
    return NextResponse.json({ 
      url: session.url, 
      success: true 
    });

  } catch (error) {
    console.error("Erro Stripe Backend:", error.message);
    return NextResponse.json(
      { error: error.message }, 
      { status: 500 }
    );
  }
}
