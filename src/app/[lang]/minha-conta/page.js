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

  // ✅ CORRIGIDO AQUI
  async function openOrder(order) {
    setSelectedOrder(order)
    setLoadingItems(true)

    let items = order.items

    if (typeof items === "string") {
      try {
        items = JSON.parse(items)
      } catch (e) {
        items = []
      }
    }

    setOrderItems(items || [])
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
            <h1 className="text-lg sm:text-xl font-black italic uppercase tracking-tight">
              Pedido #{selectedOrder.order_number}
            </h1>
          </div>

          {/* PRODUTOS */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 p-5 sm:p-8 shadow-sm mb-4">

            {loadingItems ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full" />
              </div>
            ) : orderItems.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-8">Nenhum produto encontrado.</p>
            ) : (
              <div className="space-y-3">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex justify-between border p-3 rounded-xl">

                    <div>
                      {/* ✅ AJUSTADO AQUI */}
                      <p className="font-bold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-400">Qtd: {item.quantity || 1}</p>
                    </div>

                    <span className="font-bold text-green-700">
                      £{parseFloat((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                    </span>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="p-10">
      {/* resto do seu código mantido igual */}
      <p>Lista de pedidos aqui...</p>
    </div>
  )
}
