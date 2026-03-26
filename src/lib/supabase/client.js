import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Exporta o cliente apenas se as chaves existirem
export const supabase = (supabaseUrl && supabaseKey)
  ? createSupabaseClient(supabaseUrl, supabaseKey)
  : null

export function createClient() {
  if (!supabaseUrl || !supabaseKey) {
    // Em vez de quebrar o build, retornamos null ou um log amigável
    console.error("Supabase URL ou Key faltando!")
    return null 
  }
  return createSupabaseClient(supabaseUrl, supabaseKey)
}
