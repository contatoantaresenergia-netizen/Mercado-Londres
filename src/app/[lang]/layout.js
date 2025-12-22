import './globals.css'
import { CartProvider } from '../../context/CartContext'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import WhatsAppButton from '../../components/WhatsAppButton'
import { getDictionary } from '../../lib/get-dictionary'

// Configuração de Metadados e Favicon
export const metadata = {
  title: 'Prime Brasil Market',
  description: 'O melhor mercado brasileiro em Londres',
  icons: {
    icon: 'https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/fav.icon/89036172-8A4B-4886-89B7-1B20DCD9FC45-removebg-preview.png',
    shortcut: 'https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/fav.icon/89036172-8A4B-4886-89B7-1B20DCD9FC45-removebg-preview.png',
    apple: 'https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/fav.icon/89036172-8A4B-4886-89B7-1B20DCD9FC45-removebg-preview.png',
  },
}

export default async function RootLayout({ children, params }) {
  // 1. No Next.js 15, params é uma Promise e deve ser aguardada
  const { lang } = await params;

  // 2. Carregamos o dicionário para passar aos componentes que precisam de tradução
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <head>
        <link rel="icon" href="https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/fav.icon/Gemini_Generated_Image_t78o5it78o5it78o-removebg-preview.png" sizes="any" />
      </head>
      <body>
        <CartProvider>
          {/* 3. Passamos o dicionário e o idioma para o Header e Footer */}
          <Header dict={dict} lang={lang} />
          <main>
            {children}
          </main>
          <Footer dict={dict} lang={lang} />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  )
}
