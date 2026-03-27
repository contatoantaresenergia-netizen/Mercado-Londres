'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Package, ArrowLeft, Clock, CheckCircle, XCircle } from 'lucide-react'

const STATUS_CONFIG = {
  pending:  { label: 'Aguardando pagamento', color: 'text-yellow-600 bg-yellow-50', icon: Clock },
  paid:     { label: 'Pago ✓',               color: 'text-green-600 bg-green-50',   icon: CheckCircle },
  failed:   { label: 'Falhou',               color: 'text-red-600 bg-red-50',       icon: XCircle },
  refunded: { label: 'Reembolsado',          color: 'text-gray-600 bg-gray-100',    icon: XCircle },
}

export default function PedidoDetailPage() {
  const [order, setOrder] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const lang = params?.lang || 'pt'
  const orderId = params?.id
  const supabase = createClient()

  useEffect(() => {
    async function loadData() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push(`/${lang}/login`); return }

      // Carregar pedido
      const { data: orderData } = await supabase.from('orders')
        .select('*').eq('id', orderId).single()
      if (orderData) setOrder(orderData)

      // Carregar itens do pedido
      const { data: itemsData } = await supabase.from('order_items')
        .select('*').eq('order_id', orderId)
      if (itemsData) setItems(itemsData)

      setLoading(false)
    }
    loadData()
  }, [orderId])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full" />
    </div>
  )

  if (!order) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Pedido não encontrado.</p>
    </div>
  )

  const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending
  const Icon = cfg.icon

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* VOLTAR */}
        <button
          onClick={() => router.push(`/${lang}/minha-conta`)}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-green-700 transition-colors mb-6"
        >
          <ArrowLeft size={16} /> Voltar aos pedidos
        </button>

        {/* HEADER DO PEDIDO */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 mb-6 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-xl font-black italic uppercase tracking-tight">
                Pedido #{order.order_number}
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {new Date(order.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <span className={`flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-full ${cfg.color}`}>
              <Icon size={14} />{cfg.label}
            </span>
          </div>
        </div>

        {/* ITENS DO PEDIDO */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm mb-6">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b">
            <Package className="text-green-600" size={22} />
            <h2 className="text-xl font-black italic uppercase tracking-tight">Produtos</h2>
          </div>

          {items.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">Nenhum produto encontrado.</p>
          ) : (
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.product_name} className="w-14 h-14 object-cover rounded-xl" />
                    ) : (
                      <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
                        <Package size={20} className="text-gray-400" />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-sm">{item.product_name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">Quantidade: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-black text-green-700">
                    £{parseFloat(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* TOTAL */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-600 uppercase text-sm">Total do Pedido</span>
            <span className="font-black text-green-700 text-2xl">£{parseFloat(order.total_amount).toFixed(2)}</span>
          </div>
        </div>

      </div>
    </div>
  )
}
