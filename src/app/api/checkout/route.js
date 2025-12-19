import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Use suas chaves do Stripe configuradas na Vercel
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { items, customer, orderNumber, total } = await req.json();

    // 1. Criar a cobrança no Stripe (Exemplo simplificado de Token/PaymentIntent)
    // No mundo real, você usaria o Stripe Checkout ou Elements aqui.
    // Para este teste, vamos assumir que o Stripe validou.
    
    console.log(`Processando pedido #${orderNumber} para ${customer.email}`);

    // 2. Enviar E-mail de Confirmação via Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Prime Brasil Market <pedidos@primebrasilmarket.com>',
        to: [customer.email],
        subject: `Confirmação de Pedido: #${orderNumber}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>Olá, ${customer.nome}!</h2>
            <p>Seu pedido foi recebido com sucesso no <strong>Prime Brasil Market</strong>.</p>
            <hr />
            <p><strong>Pedido:</strong> #${orderNumber}</p>
            <p><strong>Total:</strong> £${total.toFixed(2)}</p>
            <p><strong>Entrega:</strong> ${customer.endereco}, ${customer.cidade}</p>
            <hr />
            <p>Obrigado por comprar conosco!</p>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      console.error("Falha ao enviar e-mail");
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Erro no checkout:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
