import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Atenção: As chaves do Supabase não foram encontradas nas variáveis de ambiente.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
