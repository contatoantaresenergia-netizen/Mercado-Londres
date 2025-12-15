import { createClient } from '@supabase/supabase-js'

// 1. LER O URL REAL (que você colocou na Vercel)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

// 2. LER A CHAVE REAL (que você colocou na Vercel)
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  // Isso deve parar de aparecer assim que as chaves da Vercel estiverem corretas.
  console.error("ERRO: As variáveis de ambiente do Supabase não estão configuradas corretamente na Vercel!")
}

export const supabase = createClient(supabaseUrl, supabaseKey)
