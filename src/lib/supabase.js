import { createClient } from '@supabase/supabase-js'

// A forma correta de ler as chaves que você configurou na Vercel
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  // Isso aparecerá no log da Vercel se as chaves estiverem vazias
  console.error("ERRO: NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY não configurados!")
}

export const supabase = createClient(supabaseUrl, supabaseKey)
