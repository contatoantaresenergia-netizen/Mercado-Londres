import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vpqevrxwiglfpyrwxmne.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key-for-build'

// O Supabase precisa de uma chave válida para inicializar, mesmo durante o build
// Em runtime (produção), a variável real do Vercel será usada
export const supabase = createClient(supabaseUrl, supabaseKey)
