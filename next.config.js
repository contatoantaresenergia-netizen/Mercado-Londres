/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Remova isrMemoryCacheSize - não é uma opção válida no Next.js 14
  },
}

module.exports = nextConfig
```

### 2. Verifique o Arquivo `.vercelignore`

Certifique-se de que você não está ignorando acidentalmente o diretório `.next`:
```
# .vercelignore NÃO deve incluir:
# .next
# .next/**
