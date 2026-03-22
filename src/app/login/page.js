'use client'
import { createClient } from '@/lib/supabase/client' // Certifique-se de ter esse helper
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const supabase = createClient()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) setMessage('Erro ao enviar link: ' + error.message)
    else setMessage('Verifique seu e-mail para acessar sua conta!')
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Área do Cliente</h1>
        <input 
          type="email" 
          placeholder="Seu e-mail de compra" 
          className="w-full p-3 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button 
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded font-medium hover:bg-gray-800"
        >
          {loading ? 'Enviando...' : 'Receber Link de Acesso'}
        </button>
        {message && <p className="mt-4 text-center text-sm text-blue-600">{message}</p>}
      </form>
    </div>
  )
}
