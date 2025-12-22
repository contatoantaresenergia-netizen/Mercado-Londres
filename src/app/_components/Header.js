'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu } from 'lucide-react';
import { useCart } from '../_context/CartContext';
import MobileMenu from './MobileMenu';

export default function Header({ dict, lang }) {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href={`/${lang}`} className="font-black text-2xl text-green-700 uppercase">
          Prime Brasil <span className="text-yellow-500">Market</span>
        </Link>

        <div className="flex items-center gap-4">
          {/* SELETOR DE IDIOMAS (BANDEIRAS) */}
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full border">
            <Link href="/pt" title="Português" className={`p-1 rounded-full transition ${lang === 'pt' ? 'bg-white shadow-sm' : 'opacity-40 hover:opacity-100'}`}>
              <img src="https://flagcdn.com/w40/br.png" className="w-5 h-5 rounded-full object-cover" alt="PT" />
            </Link>
            <Link href="/en" title="English" className={`p-1 rounded-full transition ${lang === 'en' ? 'bg-white shadow-sm' : 'opacity-40 hover:opacity-100'}`}>
              <img src="https://flagcdn.com/w40/gb.png" className="w-5 h-5 rounded-full object-cover" alt="EN" />
            </Link>
          </div>

          <Link href={`/${lang}/carrinho`} className="relative p-2 text-gray-600">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <button onClick={() => setIsMenuOpen(true)} className="md:hidden p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} dict={dict} lang={lang} />
    </header>
  );
}
