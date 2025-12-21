import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Inicialização segura do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl || '', supabaseServiceKey || '');

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // 1. Validação de segurança: Garante que o sinal veio do Stripe
    if (!sig || !webhookSecret) {
      console.error("Faltando assinatura ou secret do webhook.");
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error(`❌ Erro na validação do Webhook: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // 2. Processar o evento de pagamento concluído
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    console.log(`💰 Pagamento recebido para a sessão: ${session.id}`);

    // 3. Inserir dados na sua tabela 'orders'
    const { error } = await supabase
      .from('orders')
      .insert([
        {
          // Ajuste os nomes das colunas abaixo de acordo com seu banco
          customer_id: session.metadata?.user_id || null, 
          total: session.amount_total / 100, // Converte centavos para Libra/Real
          status: 'pago',
          stripe_order_id: session.id // Bom ter para referência futura
        }
      ]);

    if (error) {
      console.error("❌ Erro ao salvar no Supabase:", error.message);
      return NextResponse.json({ error: 'Erro no banco de dados' }, { status: 500 });
    }
    
    console.log("✅ Pedido salvo com sucesso no Supabase!");
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

// Necessário para o Next.js não tentar converter o corpo da requisição automaticamente
export const config = {
  api: {
    bodyParser: false,
  },
};
