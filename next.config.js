/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Desabilita static generation para páginas que usam Supabase
  experimental: {
    isrMemoryCacheSize: 0,
  },
}

module.exports = nextConfig
```

### 3. Garante que tens as variáveis no Vercel:

Vai ao Vercel e **CONFIRMA** que tens:
```
NEXT_PUBLIC_SUPABASE_URL = https://vpqevrxwiglfpyrwxmne.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbG... (a tua chave REAL do Supabase)
