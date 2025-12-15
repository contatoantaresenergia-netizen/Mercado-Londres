/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  // Adicione esta configuração
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

module.exports = nextConfig
