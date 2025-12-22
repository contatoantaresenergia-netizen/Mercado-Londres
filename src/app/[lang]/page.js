import './globals.css';
import { CartProvider } from '../../context/CartContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import { getDictionary } from '../../lib/get-dictionary';

export const metadata = {
  title: 'Prime Brasil Market',
  description: 'O melhor mercado brasileiro em Londres',
  icons: {
    icon: 'https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/fav.icon',
  },
};

export default async function RootLayout({ children, params }) {
  // OBRIGATÓRIO NO NEXT 15: await params
  const { lang } = await params; 
  
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body>
        <CartProvider>
          {/* Passamos o dicionário para o Header traduzir menus */}
          <Header dict={dict} lang={lang} />
          <main>{children}</main>
          <WhatsAppButton />
          <Footer dict={dict} />
        </CartProvider>
      </body>
    </html>
  );
}
