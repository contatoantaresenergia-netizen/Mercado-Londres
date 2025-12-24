import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { CartProvider } from '../context/CartContext';
import { getDictionary } from '../../lib/get-dictionary';

export async function generateStaticParams() {
  return [{ lang: 'pt' }, { lang: 'en' }];
}

export default async function RootLayout({ children, params }) {
  // Await params primeiro para garantir a sincronia do Next.js
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'pt';
  const dict = await getDictionary(lang);
  
  // URL do ícone que você enviou do Supabase
  const faviconUrl = "https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/fav.icon/89036172-8A4B-4886-89B7-1B20DCD9FC45-removebg-preview.png";

  return (
    <html lang={lang}>
      <head>
        {/* Configuração do Favicon usando o link do Supabase */}
        <link rel="icon" href={faviconUrl} type="image/png" />
        <link rel="apple-touch-icon" href={faviconUrl} />
        {/* Meta tag para garantir que o ícone apareça corretamente em diferentes navegadores */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <CartProvider>
          <Header dict={dict} lang={lang} />
          <main>{children}</main>
          <Footer dict={dict} lang={lang} />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
