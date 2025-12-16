import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vpqevrxwiglfpyrwxmne.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseKey) {
  console.error('ERRO: NEXT_PUBLIC_SUPABASE_ANON_KEY não está definida!')
}

export const supabase = createClient(supabaseUrl, supabaseKey || '')
```

## 📝 Importante:

No Next.js, variáveis de ambiente que precisam ser acessíveis no **cliente (browser)** DEVEM começar com `NEXT_PUBLIC_`.

- ❌ `SUPABASE_KEY` - não funciona no cliente
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` - funciona no cliente

## ✅ Depois no Vercel, adiciona:
```
Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: (tua chave do Supabase)
Environments: Production, Preview, Development
