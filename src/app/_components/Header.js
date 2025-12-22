'use client'
import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../_context/CartContext';
import { usePathname } from 'next/navigation';

export default function Header({ lang }) {
  const { cart } = useCart() || { cart: [] };
  const currentLang = lang || 'pt';
  const pathname = usePathname();
  
  // Remove o idioma atual do pathname para reutilizar na troca de idioma
  const pathnameWithoutLang = pathname.replace(`/${currentLang}`, '') || '/';

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b h-20">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link 
          href={`/${currentLang}`} 
          className="font-black text-xl text-green-700 uppercase"
        >
          PRIME BRASIL <span className="text-yellow-500">MARKET</span>
        </Link>
        
        <div className="flex items-center gap-4">
          {/* BANDEIRAS */}
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full border">
            <Link 
              href={`/pt${pathnameWithoutLang}`}
              className={`p-1 rounded-full transition-all ${currentLang === 'pt' ? 'bg-white shadow-sm' : 'opacity-40 hover:opacity-70'}`}
              title="Português"
            >
              <img 
                src="https://flagcdn.com/w40/br.png" 
                className="w-5 h-5 rounded-full object-cover" 
                alt="Português" 
              />
            </Link>
            <Link 
              href={`/en${pathnameWithoutLang}`}
              className={`p-1 rounded-full transition-all ${currentLang === 'en' ? 'bg-white shadow-sm' : 'opacity-40 hover:opacity-70'}`}
              title="English"
            >
              <img 
                src="https://flagcdn.com/w40/gb.png" 
                className="w-5 h-5 rounded-full object-cover" 
                alt="English" 
              />
            </Link>
          </div>
          
          {/* CARRINHO */}
          <Link 
            href={`/${currentLang}/carrinho`} 
            className="relative p-2"
          >
            <ShoppingCart className="w-6 h-6 text-gray-600" />
            {cart?.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
