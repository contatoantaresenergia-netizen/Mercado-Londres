'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase' // ✅ import correto

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    if (!supabase) {
      setMsg('Erro: configuração do Supabase inválida')
      return
    }
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
    })
    setMsg(error ? 'Erro: ' + error.message : 'Verifique seu e-mail!')
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleLogin} className="p-8 border rounded-lg shadow-lg bg-white">
        <h2 className="text-xl font-bold mb-4">Entrar no Prime Brasil</h2>
        <input 
          type="email" 
          placeholder="Seu e-mail" 
          className="border p-2 w-full mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded">Entrar</button>
        {msg && <p className="mt-4 text-sm text-center font-medium">{msg}</p>}
      </form>
    </div>
  )
}
