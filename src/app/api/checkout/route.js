import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// IMPORTANTE: Esta variável deve ser sk_test_... na Vercel
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { total, orderNumber, customer } = body;

    // Log para você ver o que está acontecendo nos logs da Vercel
    console.log(`Iniciando checkout para pedido: ${orderNumber}`);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Converte £ para centavos
      currency: 'gbp',
      metadata: { 
        orderNumber: orderNumber,
        customer_email: customer.email,
        postcode: customer.postcode
      },
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      success: true 
    });
  } catch (error) {
    // Se o erro de "publishable key" aparecer aqui, o problema é a chave na Vercel
    console.error("ERRO CRÍTICO STRIPE BACKEND:", error.message);
    return NextResponse.json(
      { error: "Erro no servidor de pagamento: " + error.message }, 
      { status: 500 }
    );
  }
}
