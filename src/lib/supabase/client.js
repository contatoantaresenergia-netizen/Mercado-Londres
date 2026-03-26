import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Só exporta se ambos existirem e não forem strings vazias
export const supabase = (supabaseUrl && supabaseKey) 
  ? createSupabaseClient(supabaseUrl, supabaseKey) 
  : null

export function createClient() {
  // Se não houver URL durante o build, ele retorna null em vez de dar erro fatal
  if (!supabaseUrl || !supabaseKey) {
    console.warn("Aviso: Supabase URL ou Key não encontradas no ambiente.");
    return null;
  }
  return createSupabaseClient(supabaseUrl, supabaseKey)
}
