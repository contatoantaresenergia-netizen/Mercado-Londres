import './globals.css'
// Ajuste de caminhos: subimos dois níveis (../../) para sair de [lang] e app e chegar em src
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
  // No Next.js 15, params é assíncrono
  const { lang } = await params;

  // Carregamos o dicionário para traduzir o site
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <head>
        <link rel="icon" href="https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/fav.icon/Gemini_Generated_Image_t78o5it78o5it78o-removebg-preview.png" sizes="any" />
      </head>
      <body>
        <CartProvider>
          {/* Passamos dict e lang para o Header poder exibir os menus traduzidos e as bandeiras */}
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
