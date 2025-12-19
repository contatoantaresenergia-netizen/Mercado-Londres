import './globals.css'
import { CartProvider } from '@/app/context/CartContext'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import WhatsAppButton from '@/app/components/WhatsAppButton'

// ESTA É A PARTE QUE FALTAVA PARA O ÍCONE FUNCIONAR
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
        {/* Link de segurança para o ícone */}
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
