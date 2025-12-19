import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { customer, orderNumber, total, delivery } = body;

    // ENVIO DE E-MAIL REAL (Usando Resend)
    // Nota: Você deve adicionar a RESEND_API_KEY no painel da Vercel
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
          subject: `Confirmação de Pedido: #${orderNumber}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
              <h2 style="color: #16a34a; text-align: center;">Olá, ${customer.nome}!</h2>
              <p style="text-align: center; color: #666;">Seu pedido foi recebido com sucesso no Prime Brasil Market.</p>
              <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
                <p style="margin: 0; font-size: 12px; color: #999; text-transform: uppercase;">Número do Pedido</p>
                <p style="margin: 5px 0 0; font-size: 24px; font-weight: bold; color: #16a34a;">#${orderNumber}</p>
              </div>
              <p><strong>Valor Total:</strong> £${total.toFixed(2)}</p>
              <p><strong>Endereço:</strong> ${customer.endereco}, ${customer.postcode}</p>
              <p><strong>Tipo de Entrega:</strong> ${delivery.day}</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="font-size: 12px; color: #aaa; text-align: center;">Obrigado por comprar conosco!</p>
            </div>
          `
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro na API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
