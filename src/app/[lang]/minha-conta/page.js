'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { User, Package, LogOut, Clock, CheckCircle, XCircle, Save, ChevronRight } from 'lucide-react'

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
  const router = useRouter()
  const params = useParams()
  const lang = params?.lang || 'pt'
  const supabase = createClient()

  useEffect(() => {
    async function loadData() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push(`/${lang}/login`); return }
      setUser(session.user)

      // Carregar pedidos
      const { data: ordersData } = await supabase.from('orders').select('*')
        .eq('customer_email', session.user.email).order('created_at', { ascending: false })
      if (ordersData) setOrders(ordersData)

      // Carregar perfil
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* HEADER */}
        <div className="bg-white rounded-3xl border border-gray-100 p-8 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-7 h-7 text-green-700" />
              </div>
              <div>
                <h1 className="text-xl font-black italic uppercase tracking-tight">
                  {profile.full_name || user?.user_metadata?.full_name || 'Minha Conta'}
                </h1>
                <p className="text-gray-500 text-sm">{user?.email}</p>
              </div>
            </div>
            <button onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-red-600 transition-colors bg-gray-50 hover:bg-red-50 px-4 py-2 rounded-2xl">
              <LogOut size={16} /> Sair
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="flex rounded-2xl bg-gray-100 p-1 mb-6">
          <button
            onClick={() => setTab('pedidos')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold uppercase transition-all flex items-center justify-center gap-2 ${tab === 'pedidos' ? 'bg-white shadow text-green-700' : 'text-gray-500'}`}
          >
            <Package size={16} /> Meus Pedidos
          </button>
          <button
            onClick={() => setTab('perfil')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold uppercase transition-all flex items-center justify-center gap-2 ${tab === 'perfil' ? 'bg-white shadow text-green-700' : 'text-gray-500'}`}
          >
            <User size={16} /> Meu Perfil
          </button>
        </div>

        {/* PEDIDOS */}
        {tab === 'pedidos' && (
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <Package className="text-green-600" size={22} />
              <h2 className="text-xl font-black italic uppercase tracking-tight">Meus Pedidos</h2>
              <span className="ml-auto bg-green-100 text-green-700 text-xs font-black px-3 py-1 rounded-full">
                {orders.length} pedido{orders.length !== 1 ? 's' : ''}
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Package size={48} className="mx-auto mb-4 opacity-30" />
                <p className="font-bold uppercase text-sm">Nenhum pedido ainda</p>
                <button onClick={() => router.push(`/${lang}/produtos`)}
                  className="mt-6 bg-green-600 text-white px-8 py-3 rounded-2xl font-black uppercase italic hover:bg-green-700 transition-all text-sm">
                  Ir às Compras
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map(order => {
                  const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending
                  const Icon = cfg.icon
                  return (
                    <div
                      key={order.id}
                      onClick={() => router.push(`/${lang}/minha-conta/pedido/${order.id}`)}
                      className="flex items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-green-200 hover:bg-green-50/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                          <Package size={18} className="text-gray-500" />
                        </div>
                        <div>
                          <p className="font-black text-sm uppercase">Pedido #{order.order_number}</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {new Date(order.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${cfg.color}`}>
                          <Icon size={12} />{cfg.label}
                        </span>
                        <span className="font-black text-green-700 text-base">£{parseFloat(order.total_amount).toFixed(2)}</span>
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* PERFIL */}
        {tab === 'perfil' && (
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <User className="text-green-600" size={22} />
              <h2 className="text-xl font-black italic uppercase tracking-tight">Meu Perfil</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Nome Completo</label>
                <input
                  type="text"
                  value={profile.full_name}
                  onChange={e => setProfile({ ...profile, full_name: e.target.value })}
                  placeholder="Seu nome completo"
                  className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Telefone</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={e => setProfile({ ...profile, phone: e.target.value })}
                  placeholder="+44 7700 000000"
                  className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Morada / Address</label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={e => setProfile({ ...profile, address: e.target.value })}
                  placeholder="123 Street Name, City"
                  className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Código Postal</label>
                <input
                  type="text"
                  value={profile.postcode}
                  onChange={e => setProfile({ ...profile, postcode: e.target.value })}
                  placeholder="SW1A 1AA"
                  className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>

              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="w-full bg-green-600 text-white py-4 rounded-2xl font-black uppercase italic hover:bg-green-700 transition-all shadow-lg disabled:bg-gray-300 flex items-center justify-center gap-2"
              >
                <Save size={18} />
                {saving ? 'GUARDANDO...' : 'GUARDAR DADOS'}
              </button>

              {saveMsg && (
                <div className={`p-4 rounded-2xl text-sm font-medium text-center ${saveMsg.includes('Erro') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
                  {saveMsg}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
