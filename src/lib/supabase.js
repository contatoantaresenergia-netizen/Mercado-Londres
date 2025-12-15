import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Esta verificação ajuda a não quebrar o Build se as chaves não forem lidas
if (!supabaseUrl || !supabaseKey) {
  console.error('ERRO: NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY não configurados!')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
