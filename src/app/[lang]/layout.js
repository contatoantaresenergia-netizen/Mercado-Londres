import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { CartProvider } from '../context/CartContext';
import { getDictionary } from '../../lib/get-dictionary';

const faviconUrl = "https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/fav.icon/89036172-8A4B-4886-89B7-1B20DCD9FC45-removebg-preview.png";
const siteUrl = "https://www.primebrasilmarket.com";

export async function generateStaticParams() {
  return [{ lang: 'pt' }, { lang: 'en' }];
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'pt';
  const isPT = lang === 'pt';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: isPT
        ? 'Prime Brasil Market | Produtos Brasileiros em Londres'
        : 'Prime Brasil Market | Brazilian Products in London',
      template: isPT
        ? '%s | Prime Brasil Market'
        : '%s | Prime Brasil Market',
    },
    description: isPT
      ? 'Compre os melhores produtos brasileiros entregues na sua porta em todo o Reino Unido. Alimentos, bebidas, higiene e muito mais com entrega rápida via DPD.'
      : 'Shop the best Brazilian products delivered to your door across the UK. Food, drinks, hygiene and more with fast DPD delivery.',
    keywords: isPT
      ? ['produtos brasileiros', 'mercado brasileiro Londres', 'comida brasileira UK', 'entrega brasileira Reino Unido', 'Prime Brasil Market']
      : ['brazilian products', 'brazilian market London', 'brazilian food UK', 'brazilian delivery UK', 'Prime Brasil Market'],
    authors: [{ name: 'Prime Brasil Market' }],
    creator: 'Prime Brasil Market',
    publisher: 'Prime Brasil Market',
    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        'pt-BR': `${siteUrl}/pt`,
        'en-GB': `${siteUrl}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: isPT ? 'pt_BR' : 'en_GB',
      alternateLocale: isPT ? 'en_GB' : 'pt_BR',
      url: `${siteUrl}/${lang}`,
      siteName: 'Prime Brasil Market',
      title: isPT
        ? 'Prime Brasil Market | Produtos Brasileiros em Londres'
        : 'Prime Brasil Market | Brazilian Products in London',
      description: isPT
        ? 'Compre os melhores produtos brasileiros entregues na sua porta em todo o Reino Unido.'
        : 'Shop the best Brazilian products delivered to your door across the UK.',
      images: [
        {
          url: faviconUrl,
          width: 800,
          height: 800,
          alt: 'Prime Brasil Market',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isPT
        ? 'Prime Brasil Market | Produtos Brasileiros em Londres'
        : 'Prime Brasil Market | Brazilian Products in London',
      description: isPT
        ? 'Compre os melhores produtos brasileiros entregues na sua porta em todo o Reino Unido.'
        : 'Shop the best Brazilian products delivered to your door across the UK.',
      images: [faviconUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: faviconUrl,
      apple: faviconUrl,
    },
  };
}

export default async function RootLayout({ children, params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang || 'pt';
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <head>
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
