import { createClient } from '@supabase/supabase-js'

// No JavaScript, apenas chamamos a variável. 
// Se ela não existir, o erro aparecerá no console de forma clara.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
