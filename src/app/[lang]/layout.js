import './globals.css';
import Header from '../_components/Header';
import Footer from '../_components/Footer';
import WhatsAppButton from '../_components/WhatsAppButton';
import { CartProvider } from '../_context/CartContext';
import { getDictionary } from '../../lib/get-dictionary';

export async function generateStaticParams() {
  return [{ lang: 'pt' }, { lang: 'en' }];
}

export default async function RootLayout({ children, params }) {
  const lang = params.lang || 'pt';
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className="antialiased">
        <CartProvider>
          {/* Passamos o dicionário e o idioma para o Header */}
          <Header dict={dict} lang={lang} />
          <main>{children}</main>
          <Footer dict={dict} lang={lang} />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
