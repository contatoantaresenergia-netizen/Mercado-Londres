import { createClient } from '@supabase/supabase-js'

// Lê ambas as variáveis do ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vpqevrxwiglfpyrwxmne.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validação importante
if (!supabaseKey) {
  console.error('ERRO: NEXT_PUBLIC_SUPABASE_ANON_KEY não está definida!')
}

// Cria o cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseKey || '')
