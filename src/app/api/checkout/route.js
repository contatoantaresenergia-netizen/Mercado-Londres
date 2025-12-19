import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req) {
  try {
    const { customer, orderNumber, total } = await req.json();

    // 1. Enviar E-mail via Resend (Lembre-se de por a chave na Vercel)
    if (process.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Prime Brasil Market <pedidos@primebrasilmarket.com>',
          to: [customer.email],
          subject: `Confirmado: Pedido #${orderNumber}`,
          html: `<h2>Olá ${customer.nome},</h2><p>Recebemos seu pedido de £${total.toFixed(2)}.</p><p>Número: <strong>#${orderNumber}</strong></p>`
        }),
      });
    }

    // 2. Aqui você pode adicionar a lógica do Stripe se quiser cobrar o cartão de forma real
    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
