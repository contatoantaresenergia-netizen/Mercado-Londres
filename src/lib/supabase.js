import { createClient } from '@supabase/supabase-js'

// O URL do projeto Supabase (Se você colocou esta linha no código)
const supabaseUrl = "https://vpqevrxwiglfpyrwxmne.supabase.co"

// A Chave REAL lida da Vercel (com o prefixo NEXT_PUBLIC_ )
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Cria o cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseKey)
