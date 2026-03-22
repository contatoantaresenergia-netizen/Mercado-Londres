import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function MinhaConta() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get(name) { return cookieStore.get(name)?.value } } }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Busca os pedidos do banco de dados filtrando pelo e-mail logado
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('customer_email', user.email)
    .order('created_at', { ascending: false })

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Olá, {user.email}</h1>
      <h2 className="text-xl mb-4">Seus Pedidos</h2>
      {orders?.length > 0 ? (
        <div className="grid gap-4">
          {orders.map(order => (
            <div key={order.id} className="border p-4 rounded flex justify-between shadow-sm">
              <div>
                <p className="font-bold">#{order.order_number}</p>
                <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">R$ {order.total}</p>
                <span className="text-green-600 font-medium capitalize">{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Você ainda não tem pedidos.</p>
      )}
    </div>
  )
}
