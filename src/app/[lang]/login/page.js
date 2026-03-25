'use client'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nome, setNome] = useState('')
  const [msg, setMsg] = useState({ text: '', type: '' })
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const router = useRouter()
  const lang = params?.lang || 'pt'
  const supabase = createClient()

  const setError = (text) => setMsg({ text, type: 'error' })
  const setSuccess = (text) => setMsg({ text, type: 'success' })

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setMsg({ text: '', type: '' })
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('Email ou senha incorretos. Verifique seus dados.')
    } else {
      setSuccess('Login realizado! Redirecionando...')
      setTimeout(() => router.push(`/${lang}/minha-conta`), 1000)
    }
    setLoading(false)
  }

  async function handleRegister(e) {
    e.preventDefault()
    setLoading(true)
    setMsg({ text: '', type: '' })
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      setLoading(false)
      return
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: nome },
        emailRedirectTo: `${window.location.origin}/${lang}/auth/callback?next=/${lang}/minha-conta`,
      },
    })
    if (error) {
      setError('Erro ao criar conta: ' + error.message)
    } else if (data.user && !data.session) {
      setSuccess('Conta criada! Verifique seu e-mail para confirmar o cadastro.')
    } else {
      setSuccess('Conta criada com sucesso! Redirecionando...')
      setTimeout(() => router.push(`/${lang}/minha-conta`), 1000)
    }
    setLoading(false)
  }

  async function handleMagicLink(e) {
    e.preventDefault()
    setLoading(true)
    setMsg({ text: '', type: '' })
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/${lang}/auth/callback?next=/${lang}/minha-conta`,
      },
    })
    if (error) {
      setError('Erro: ' + error.message)
    } else {
      setSuccess('Link enviado! Verifique seu e-mail para entrar.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black italic uppercase tracking-tighter text-green-700">
            Prime Brasil
          </h1>
          <p className="text-gray-500 mt-1 text-sm font-medium">
            {mode === 'register' ? 'Crie sua conta' : 'Acesse sua conta'}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex rounded-2xl bg-gray-100 p-1 mb-8">
            <button
              onClick={() => { setMode('login'); setMsg({ text: '', type: '' }) }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold uppercase transition-all ${
                mode === 'login' ? 'bg-white shadow text-green-700' : 'text-gray-500'
              }`}
            >Entrar</button>
            <button
              onClick={() => { setMode('register'); setMsg({ text: '', type: '' }) }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold uppercase transition-all ${
                mode === 'register' ? 'bg-white shadow text-green-700' : 'text-gray-500'
              }`}
            >Criar Conta</button>
          </div>

          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">E-mail</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="seu@email.com" required
                  className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Senha</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" required
                  className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 text-sm" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-green-600 text-white py-4 rounded-2xl font-black uppercase italic hover:bg-green-700 transition-all shadow-lg disabled:bg-gray-300">
                {loading ? 'ENTRANDO...' : 'ENTRAR NA CONTA'}
              </button>
              <div className="text-center pt-2">
                <button type="button" onClick={() => { setMode('magic'); setMsg({ text: '', type: '' }) }}
                  className="text-sm text-gray-400 hover:text-green-600 underline">
                  Esqueci minha senha (link por e-mail)
                </button>
              </div>
            </form>
          )}

          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Nome Completo</label>
                <input type="text" value={nome} onChange={e => setNome(e.target.value)}
                  placeholder="Seu nome completo" required
                  className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">E-mail</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="seu@email.com" required
                  className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">Senha</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres" required
                  className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 text-sm" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-green-600 text-white py-4 rounded-2xl font-black uppercase italic hover:bg-green-700 transition-all shadow-lg disabled:bg-gray-300">
                {loading ? 'CRIANDO CONTA...' : 'CRIAR MINHA CONTA'}
              </button>
            </form>
          )}

          {mode === 'magic' && (
            <form onSubmit={handleMagicLink} className="space-y-4">
              <p className="text-sm text-gray-500 text-center mb-2">
                Digite seu e-mail e enviaremos um link para acessar sem senha.
              </p>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1.5">E-mail</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="seu@email.com" required
                  className="w-full p-4 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 text-sm" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-green-600 text-white py-4 rounded-2xl font-black uppercase italic hover:bg-green-700 transition-all shadow-lg disabled:bg-gray-300">
                {loading ? 'ENVIANDO...' : 'ENVIAR LINK DE ACESSO'}
              </button>
              <div className="text-center">
                <button type="button" onClick={() => { setMode('login'); setMsg({ text: '', type: '' }) }}
                  className="text-sm text-gray-400 hover:text-green-600 underline">
                  Voltar ao login com senha
                </button>
              </div>
            </form>
          )}

          {msg.text && (
            <div className={`mt-4 p-4 rounded-2xl text-sm font-medium text-center ${
              msg.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'
            }`}>{msg.text}</div>
          )}
        </div>
        <p className="text-center text-xs text-gray-400 mt-6 uppercase font-bold tracking-widest">
          🔒 Dados protegidos com criptografia SSL
        </p>
      </div>
    </div>
  )
}
