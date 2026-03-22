import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const body = await req.text();
  const headerList = await headers();
  const sig = headerList.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_details?.email;
    const customerName = session.customer_details?.name || 'Cliente';
    const orderNumber = `ML-${Date.now()}`;
    const total = (session.amount_total / 100).toFixed(2);

    // 1. Busca os itens da sessão no Stripe
    let lineItems = [];
    try {
      const items = await stripe.checkout.sessions.listLineItems(session.id);
      lineItems = items.data;
    } catch (err) {
      console.error('Erro ao buscar itens:', err.message);
    }

    // 2. Salva o pedido no Supabase
    const { error: dbError } = await supabase.from('orders').insert([{
      customer_email: email,
      customer_name: customerName,
      total: parseFloat(total),
      status: 'pago',
      order_number: orderNumber,
      items: lineItems.map(i => ({
        name: i.description,
        quantity: i.quantity,
        price: (i.amount_total / 100).toFixed(2)
      })),
      stripe_session_id: session.id,
      created_at: new Date().toISOString()
    }]);

    if (dbError) {
      console.error('Erro ao salvar pedido:', dbError.message);
    }

    // 3. Envia o e-mail de confirmação
    // ⚠️ IMPORTANTE: troque o "from" pelo seu domínio verificado no Resend
    // Ex: noreply@seudominio.com
    if (email) {
      const itemsHtml = lineItems.length > 0
        ? `
          <table style="width:100%;border-collapse:collapse;margin:16px 0">
            <thead>
              <tr style="background:#f3f4f6">
                <th style="text-align:left;padding:8px;border:1px solid #e5e7eb">Produto</th>
                <th style="text-align:center;padding:8px;border:1px solid #e5e7eb">Qtd</th>
                <th style="text-align:right;padding:8px;border:1px solid #e5e7eb">Valor</th>
              </tr>
            </thead>
            <tbody>
              ${lineItems.map(item => `
                <tr>
                  <td style="padding:8px;border:1px solid #e5e7eb">${item.description}</td>
                  <td style="text-align:center;padding:8px;border:1px solid #e5e7eb">${item.quantity}</td>
                  <td style="text-align:right;padding:8px;border:1px solid #e5e7eb">R$ ${(item.amount_total / 100).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>`
        : '';

      try {
        await resend.emails.send({
          // ✅ TROQUE AQUI pelo seu domínio verificado no Resend
          from: 'Prime Brasil <noreply@seudominio.com>',
          to: email,
          subject: `Pedido ${orderNumber} Confirmado! 🛒`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
              <h1 style="color:#15803d">Pagamento Confirmado! ✅</h1>
              <p>Olá, <strong>${customerName}</strong>!</p>
              <p>Seu pedido foi recebido e está sendo processado.</p>

              <div style="background:#f9fafb;border-radius:8px;padding:16px;margin:16px 0">
                <p style="margin:0"><strong>Número do pedido:</strong> ${orderNumber}</p>
                <p style="margin:8px 0 0"><strong>Total pago:</strong> R$ ${total}</p>
              </div>

              ${itemsHtml}

              <p style="color:#6b7280;font-size:14px">
                Dúvidas? Responda este e-mail ou entre em contato conosco.
              </p>
            </div>
          `
        });
      } catch (emailError) {
        console.error('Erro ao enviar e-mail:', emailError.message);
      }
    }
  }

  return NextResponse.json({ received: true });
}
