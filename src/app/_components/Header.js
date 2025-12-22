'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../_context/CartContext';
import MobileMenu from './MobileMenu';

export default function Header({ dict, lang }) {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href={`/${lang}`} className="flex items-center gap-2">
          <div className="font-black text-2xl tracking-tighter text-green-700 uppercase">
            Prime Brasil <span className="text-yellow-500">Market</span>
          </div>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-gray-600">
          <Link href={`/${lang}`} className="hover:text-green-700 transition">
            {dict?.header?.home || 'Início'}
          </Link>
          <Link href={`/${lang}/produtos`} className="hover:text-green-700 transition">
            {dict?.header?.products || 'Produtos'}
          </Link>
          <Link href={`/${lang}/sobre`} className="hover:text-green-700 transition">
            {dict?.header?.about || 'Sobre'}
          </Link>
          <Link href={`/${lang}/contato`} className="hover:text-green-700 transition">
            {dict?.header?.contact || 'Contato'}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* BANDEIRAS (SELETOR DE IDIOMA) */}
          <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-full border border-gray-200">
            <Link 
              href="/pt" 
              className={`p-1 rounded-full transition ${lang === 'pt' ? 'bg-white shadow-sm ring-1 ring-black/5' : 'opacity-40 hover:opacity-100'}`}
            >
              <img src="https://flagcdn.com/w40/br.png" className="w-5 h-5 object-cover rounded-full" alt="Português" />
            </Link>
            <Link 
              href="/en" 
              className={`p-1 rounded-full transition ${lang === 'en' ? 'bg-white shadow-sm ring-1 ring-black/5' : 'opacity-40 hover:opacity-100'}`}
            >
              <img src="https://flagcdn.com/w40/gb.png" className="w-5 h-5 object-cover rounded-full" alt="English" />
            </Link>
          </div>

          <Link href={`/${lang}/carrinho`} className="relative p-2 text-gray-600 hover:text-green-700">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>

          <button onClick={() => setIsMenuOpen(true)} className="md:hidden p-2">
            <Menu className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} dict={dict} lang={lang} />
    </header>
  );
}
