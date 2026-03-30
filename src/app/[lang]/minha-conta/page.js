'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { User, Package, LogOut, Clock, CheckCircle, XCircle, Save, ChevronRight, ArrowLeft } from 'lucide-react'

const STATUS_CONFIG = {
  pending:  { label: 'Aguardando pagamento', color: 'text-yellow-600 bg-yellow-50', icon: Clock },
  paid:     { label: 'Pago ✓',               color: 'text-green-600 bg-green-50',   icon: CheckCircle },
  failed:   { label: 'Falhou',               color: 'text-red-600 bg-red-50',       icon: XCircle },
  refunded: { label: 'Reembolsado',          color: 'text-gray-600 bg-gray-100',    icon: XCircle },
}

export default function MinhaContaPage() {
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('pedidos')
  const [profile, setProfile] = useState({ full_name: '', phone: '', address: '', postcode: '' })
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orderItems, setOrderItems] = useState([])
  const [loadingItems, setLoadingItems] = useState(false)
  const router = useRouter()
  const params = useParams()
  const lang = params?.lang || 'pt'
  const supabase = createClient()

  useEffect(() => {
    async function loadData() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push(`/${lang}/login`); return }
      setUser(session.user)

      const { data: ordersData } = await supabase.from('orders').select('*')
        .eq('customer_email', session.user.email).order('created_at', { ascending: false })
      if (ordersData) setOrders(ordersData)

      const { data: profileData } = await supabase.from('profiles')
        .select('*').eq('id', session.user.id).single()
      if (profileData) {
        setProfile({
          full_name: profileData.full_name || '',
          phone: profileData.phone || '',
          address: profileData.address || '',
          postcode: profileData.postcode || '',
        })
      }

      setLoading(false)
    }
    loadData()
  }, [])

  // ✅ CORREÇÃO AQUI (SEM QUEBRAR NADA)
  async function openOrder(order) {
    setSelectedOrder(order)
    setLoadingItems(true)

    const { data } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', order.id)

    if (data && data.length > 0) {
      setOrderItems(data)
    } else {
      let items = order.items

      if (typeof items === "string") {
        try {
          items = JSON.parse(items)
        } catch {
          items = []
        }
      }

      const formattedItems = (items || []).map(item => ({
        product_name: item.product_name || item.name || 'Produto',
        image_url: item.image_url || item.image || null,
        quantity: item.quantity || 1,
        price: item.price || 0
      }))

      setOrderItems(formattedItems)
    }

    setLoadingItems(false)
  }

  async function handleSaveProfile() {
    setSaving(true)
    setSaveMsg('')
    const { error } = await supabase.from('profiles').update({
      full_name: profile.full_name,
      phone: profile.phone,
      address: profile.address,
      postcode: profile.postcode,
    }).eq('id', user.id)
    setSaving(false)
    setSaveMsg(error ? 'Erro ao guardar. Tente novamente.' : 'Dados guardados com sucesso!')
    setTimeout(() => setSaveMsg(''), 3000)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push(`/${lang}/login`)
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full" />
    </div>
  )

  // DETALHE DO PEDIDO
  if (selectedOrder) {
    const cfg = STATUS_CONFIG[selectedOrder.status] || STATUS_CONFIG.pending
    const Icon = cfg.icon
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-10">

          <button
            onClick={() => { setSelectedOrder(null); setOrderItems([]) }}
            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-green-700 transition-colors mb-4"
          >
            <ArrowLeft size={16} /> Voltar aos pedidos
          </button>

          {/* HEADER PEDIDO */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-8 mb-4 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-lg sm:text-xl font-black italic uppercase tracking-tight">
                  Pedido #{selectedOrder.order_number}
                </h1>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  {new Date(selectedOrder.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <span className={`flex items-center gap-1.5 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full w-fit ${cfg.color}`}>
                <Icon size={13} />{cfg.label}
              </span>
            </div>
          </div>

          {/* PRODUTOS */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-8 shadow-sm mb-4">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b">
              <Package className="text-green-600" size={20} />
              <h2 className="text-base sm:text-xl font-black italic uppercase tracking-tight">Produtos</h2>
            </div>

            {loadingItems ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full" />
              </div>
            ) : orderItems.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">Nenhum produto encontrado.</p>
            ) : (
              <div className="space-y-3">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.product_name} className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-xl flex-shrink-0" />
                      ) : (
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Package size={18} className="text-gray-400" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-bold text-sm truncate">{item.product_name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Qtd: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-black text-green-700 text-sm sm:text-base ml-2 flex-shrink-0">
                      £{parseFloat(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* TOTAL */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-600 uppercase text-sm">Total do Pedido</span>
              <span className="font-black text-green-700 text-xl sm:text-2xl">£{parseFloat(selectedOrder.total_amount).toFixed(2)}</span>
            </div>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* RESTO DO SEU CÓDIGO INTACTO */}
    </div>
  )
}
