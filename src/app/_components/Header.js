'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu } from 'lucide-react';
// Usamos ../ para sair de _components e entrar em _context
import { useCart } from '../_context/CartContext';

export default function Header({ dict, lang }) {
  const { cart } = useCart() || { cart: [] };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = cart?.length || 0;
  const currentLang = lang || 'pt';

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b h-20">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link href={`/${currentLang}`} className="flex items-center gap-2">
          <div className="font-black text-xl tracking-tighter text-green-700 uppercase">
            Prime Brasil <span className="text-yellow-500">Market</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {/* SELETOR DE IDIOMAS (BANDEIRAS) */}
          <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-full border border-gray-200">
            <Link 
              href="/pt" 
              className={`p-1 rounded-full transition ${currentLang === 'pt' ? 'bg-white shadow-sm' : 'opacity-40 hover:opacity-100'}`}
            >
              <img src="https://flagcdn.com/w40/br.png" className="w-5 h-5 object-cover rounded-full" alt="PT" />
            </Link>
            <Link 
              href="/en" 
              className={`p-1 rounded-full transition ${currentLang === 'en' ? 'bg-white shadow-sm' : 'opacity-40 hover:opacity-100'}`}
            >
              <img src="https://flagcdn.com/w40/gb.png" className="w-5 h-5 object-cover rounded-full" alt="EN" />
            </Link>
          </div>

          <Link href={`/${currentLang}/carrinho`} className="relative p-2 text-gray-600">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
