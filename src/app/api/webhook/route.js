import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

// Inicializa o Resend (Certifique-se de ter a variável RESEND_API_KEY no Vercel)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
  
  // Service Role é necessária para ignorar políticas de RLS ao salvar o pedido
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
      return NextResponse.json({ error: 'Chaves de segurança ausentes' }, { status: 400 });
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error(`Erro Stripe: ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_details?.email || session.metadata?.email;

    console.log(`Pagamento confirmado para: ${customerEmail}`);

    // 1. Salvar no Banco de Dados
    const { data, error: dbError } = await supabase
      .from('orders')
      .insert([{
        customer_email: customerEmail,
        total: session.amount_total / 100,
        order_number: session.metadata?.orderNumber || `ORD-${Date.now()}`,
        status: 'pago',
        created_at: new Date().toISOString()
      }]);

    if (dbError) {
      console.error("Erro Supabase:", dbError.message);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    // 2. Enviar E-mail de Confirmação (Só envia se salvou no banco)
    if (customerEmail) {
      try {
        await resend.emails.send({
          from: 'Mercado Londres <onboarding@resend.dev>', // Depois altere para seu domínio próprio
          to: customerEmail,
          subject: 'Confirmamos seu pedido! 🛒',
          html: `
            <h1>Obrigado pela sua compra no Mercado Londres!</h1>
            <p>Recebemos seu pagamento com sucesso.</p>
            <p><strong>Valor Total:</strong> R$ ${session.amount_total / 100}</p>
            <p>Em breve você receberá novas atualizações do envio.</p>
          `
        });
        console.log("E-mail enviado com sucesso!");
      } catch (mailError) {
        console.error("Falha ao enviar e-mail:", mailError);
        // Não travamos o processo se o e-mail falhar, pois o banco já foi atualizado
      }
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
