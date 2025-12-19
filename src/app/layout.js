import './globals.css'
import { CartProvider } from '@/app/context/CartContext'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import WhatsAppButton from '@/app/components/WhatsAppButton'

// Configuração de Metadados e Favicon
export const metadata = {
  title: 'Prime Brasil Market',
  description: 'O melhor mercado brasileiro em Londres',
  icons: {
    // Favicon padrão para abas de navegador
    icon: 'https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/fav.icon/Gemini_Generated_Image_t78o5it78o5it78o-removebg-preview.png',
    // Atalhos e ícones de favoritos
    shortcut: 'https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/fav.icon/Gemini_Generated_Image_t78o5it78o5it78o-removebg-preview.png',
    // Ícone para dispositivos Apple (iPhone/iPad)
    apple: 'https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/fav.icon/Gemini_Generated_Image_t78o5it78o5it78o-removebg-preview.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Forçamos o tamanho via meta tag caso o navegador ignore o objeto metadata */}
        <link rel="icon" href="https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/fav.icon/Gemini_Generated_Image_t78o5it78o5it78o-removebg-preview.png" sizes="any" />
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
