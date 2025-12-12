import { CartProvider } from './context/cartContext';
import Header from '@/components/Header';
import './globals.css';

export const metadata = {
  title: 'Mercado Londres',
  description: 'Produtos brasileiros em Londres',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
