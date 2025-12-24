'use client'
import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { usePathname } from 'next/navigation';

export default function Header({ lang, dict }) {
  const { cart } = useCart() || { cart: [] };
  const currentLang = lang || 'pt';
  const pathname = usePathname();
  
  // Remove o idioma atual do pathname
  const pathnameWithoutLang = pathname.replace(`/${currentLang}`, '') || '/';
  
  const logoSupabase = "https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/logo.png/logomarca.png";
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b h-20">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* LOGO */}
        <Link 
          href={`/${currentLang}`}
          className="flex items-center gap-2 hover:opacity-90 transition"
        >
          <div className="h-10 w-10 sm:h-14 sm:w-14 flex-shrink-0">
            <img src={logoSupabase} alt="Logo" className="h-full w-full object-contain" />
          </div>
          {/* AQUI ESTAVA O PROBLEMA: Removido 'hidden sm:flex' e colocado 'flex' */}
          <div className="flex flex-col leading-tight">
            <span className="text-green-700 font-bold text-sm sm:text-lg uppercase whitespace-nowrap">Prime Brasil</span>
            <span className="text-yellow-500 font-semibold text-[8px] sm:text-[10px] tracking-widest uppercase">Market</span>
          </div>
        </Link>
        
        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href={`/${currentLang}`} 
            className="hover:text-green-700 transition-colors font-semibold"
          >
            {dict?.header?.home || 'INÍCIO'}
          </Link>
          <Link 
            href={`/${currentLang}/produtos`} 
            className="hover:text-green-700 transition-colors font-semibold"
          >
            {dict?.header?.products || 'PRODUTOS'}
          </Link>
          <Link 
            href={`/${currentLang}/sobre`} 
            className="hover:text-green-700 transition-colors font-semibold"
          >
            {dict?.header?.about || 'SOBRE'}
          </Link>
          <Link 
            href={`/${currentLang}/contato`} 
            className="hover:text-green-700 transition-colors font-semibold"
          >
            {dict?.header?.contact || 'CONTATO'}
          </Link>
        </nav>
        
        {/* BANDEIRAS E CARRINHO */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* BANDEIRAS */}
          <div className="flex items-center gap-1 bg-gray-50 p-1.5 rounded-lg border border-gray-200 shadow-sm">
            <Link 
              href={`/pt${pathnameWithoutLang}`}
              className={`p-1 sm:p-1.5 rounded-md transition-all duration-200 ${
                currentLang === 'pt' 
                  ? 'bg-white shadow-md ring-2 ring-green-500' 
                  : 'opacity-50 hover:opacity-100 hover:bg-white'
              }`}
              title="Português"
            >
              <img 
                src="https://flagcdn.com/w40/br.png" 
                width="24"
                height="18"
                className="w-5 sm:w-6 h-auto rounded-sm object-cover" 
                alt="Português" 
              />
            </Link>
            <Link 
              href={`/en${pathnameWithoutLang}`}
              className={`p-1 sm:p-1.5 rounded-md transition-all duration-200 ${
                currentLang === 'en' 
                  ? 'bg-white shadow-md ring-2 ring-green-500' 
                  : 'opacity-50 hover:opacity-100 hover:bg-white'
              }`}
              title="English"
            >
              <img 
                src="https://flagcdn.com/w40/gb.png" 
                width="24"
                height="18"
                className="w-5 sm:w-6 h-auto rounded-sm object-cover" 
                alt="English" 
              />
            </Link>
          </div>
          
          {/* CARRINHO */}
          <Link 
            href={`/${currentLang}/carrinho`}
            className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            {cart?.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
