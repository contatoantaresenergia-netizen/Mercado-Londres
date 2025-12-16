import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vpqevrxwiglfpyrwxmne.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Se não há chave, cria um cliente "fake" apenas para o build passar
// Isto NÃO afeta o funcionamento em produção porque o runtime terá as variáveis
export const supabase = createClient(
  supabaseUrl, 
  supabaseKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwcWV2cnh3aWdsZnB5cnd4bW5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzE0NjQwMDAsImV4cCI6MTk4NzA0MDAwMH0.XXXX'
)

// Log apenas em desenvolvimento
if (process.env.NODE_ENV === 'development' && !supabaseKey) {
  console.warn('⚠️ NEXT_PUBLIC_SUPABASE_ANON_KEY não está definida!')
}
