import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Instância singleton para uso direto
export const supabase = supabaseUrl && supabaseKey
  ? createSupabaseClient(supabaseUrl, supabaseKey)
  : null

// Função createClient() para compatibilidade com Header e LoginPage
export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseKey)
}
