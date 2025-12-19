import './globals.css'
import { CartProvider } from '@/app/context/CartContext'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import WhatsAppButton from '@/app/components/WhatsAppButton'

export const metadata = {
  title: 'Prime Brasil Market',
  description: 'O melhor mercado brasileiro em Londres',
  icons: {
    icon: 'https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/fav.icon/FB2A4E64-3EA5-46AA-8C66-35BE402E3BA7_4_5005_c.jpeg',
    apple: 'https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/fav.icon/FB2A4E64-3EA5-46AA-8C66-35BE402E3BA7_4_5005_c.jpeg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
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
