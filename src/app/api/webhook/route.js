import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// 1. Configurações Iniciais
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

// Fallbacks para evitar erro de "supabaseKey is required" durante o build da Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  // 2. Validação de Segurança
  try {
    if (!sig || !webhookSecret) {
      console.error("Assinatura ou Secret do Webhook ausente.");
      return NextResponse.json({ error: 'Security keys missing' }, { status: 400 });
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error(`❌ Erro de Validação: ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // 3. Processamento do Evento
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    console.log(`💰 Processando pagamento: ${session.id}`);

    // 4. Inserção no Banco de Dados (Tabela 'orders')
    const { error } = await supabase
      .from('orders')
      .insert([
        {
          // Certifique-se que estes nomes de colunas existem na sua tabela 'orders'
          customer_id: session.metadata?.user_id || null, 
          total: session.amount_total / 100,
          status: 'pago'
        }
      ]);

    if (error) {
      console.error("❌ Erro ao salvar no Supabase:", error.message);
      // Retornamos 500 para o Stripe tentar enviar novamente mais tarde
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
    
    console.log("✅ Pedido registrado com sucesso no banco!");
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
