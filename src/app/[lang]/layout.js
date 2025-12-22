import './globals.css'
// Importando das novas pastas privadas (com sublinhado)
import { CartProvider } from '../_context/CartContext'
import Header from '../_components/Header'
import Footer from '../_components/Footer'
import WhatsAppButton from '../_components/WhatsAppButton'
import { getDictionary } from '../../lib/get-dictionary'

export const metadata = {
  title: 'Prime Brasil Market',
  description: 'O melhor mercado brasileiro em Londres',
  icons: {
    icon: 'https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/fav.icon/89036172-8A4B-4886-89B7-1B20DCD9FC45-removebg-preview.png',
  },
}

export default async function RootLayout({ children, params }) {
  // Garantindo a compatibilidade com Next.js 14/15
  const { lang } = params;

  // Carrega as traduções baseadas no idioma da URL
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className="antialiased">
        <CartProvider>
          {/* Passamos dict e lang para o Header renderizar as bandeiras e menus */}
          <Header dict={dict} lang={lang} />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer dict={dict} lang={lang} />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  )
}
