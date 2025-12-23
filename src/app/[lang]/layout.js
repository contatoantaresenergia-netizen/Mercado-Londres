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
  // Await params primeiro
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'pt';
  const dict = await getDictionary(lang);
  
  return (
    <html lang={lang}>
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
