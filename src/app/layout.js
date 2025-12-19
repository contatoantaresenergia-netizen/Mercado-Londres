import './globals.css'
import { CartProvider } from '@/app/context/CartContext'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import WhatsAppButton from '@/app/components/WhatsAppButton'

// Este bloco configura o ícone e o título do site
export const metadata = {
  title: 'Prime Brasil Market',
  description: 'O melhor mercado brasileiro em Londres',
  icons: {
    icon: 'https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/fav.icon/Gemini_Generated_Image_pky8czpky8czpky8.png',
    apple: 'https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/fav.icon/Gemini_Generated_Image_pky8czpky8czpky8.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Link reserva para garantir que o ícone apareça em todos os navegadores */}
        <link rel="icon" href="https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/fav.icon/Gemini_Generated_Image_pky8czpky8czpky8.png" />
      </head>
      <body>
        <CartProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  )
}
