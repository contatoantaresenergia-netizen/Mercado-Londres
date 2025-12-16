import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vpqevrxwiglfpyrwxmne.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sbp_81bedd5e8f709ad6c60bb11a92994a77cfa4dbc4'

export const supabase = createClient(supabaseUrl, supabaseKey)
