import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // Pegamos o parâmetro 'next' ou definimos um padrão
  const next = searchParams.get('next') ?? '/minha-conta'
  
  // Detectar o idioma a partir da URL original ou do parâmetro 'next'
  // Se o 'next' já incluir /en ou /pt, ele respeitará isso.
  const redirectTo = next.startsWith('/') ? next : `/${next}`

  if (code) {
    const supabase = await createClient()
    
    // Troca o código temporário por uma sessão real de usuário
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Redireciona para a página de destino (ex: /pt/minha-conta ou /en/minha-conta)
      return NextResponse.redirect(`${origin}${redirectTo}`)
    }
  }

  // Em caso de erro, redireciona para o login com uma mensagem de erro
  // Aqui você pode ajustar para detectar o idioma do erro também
  return NextResponse.redirect(`${origin}/pt/login?error=auth`)
}
