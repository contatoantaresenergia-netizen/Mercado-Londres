'use client'

import dynamic from 'next/dynamic'

// Isso força o componente a carregar APENAS no navegador
const CheckoutForm = dynamic(() => import('./CheckoutClient'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-600 text-lg">A carregar formulário de pagamento...</div>
    </div>
  )
})

export default function CheckoutPage() {
  return <CheckoutForm />
}
