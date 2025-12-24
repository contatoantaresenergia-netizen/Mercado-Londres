'use client'
import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Globe } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { usePathname } from 'next/navigation';

export default function Header({ lang, dict }) {
  const { cart } = useCart() || { cart: [] };
  const currentLang = lang || 'pt';
  const pathname = usePathname();
  
  const pathnameWithoutLang = pathname.replace(`/${currentLang}`, '') || '/';
  
  const logoSupabase = "https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/logo.png/logomarca.png";
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b h-20">
      <div className="container mx-auto px-4 h-full flex items-center justify-between gap-2">
        
        {/* LOGO E NOME - Agora com tamanho recuperado */}
        <Link 
          href={`/${currentLang}`}
          className="flex items-center gap-2 hover:opacity-90 transition min-w-0"
        >
          <div className="h-11 w-11 sm:h-14 sm:w-14 flex-shrink-0">
            <img src={logoSupabase} alt="Logo" className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-green-700 font-bold text-sm sm:text-lg uppercase whitespace-nowrap">
              Prime Brasil
            </span>
            <span className="text-yellow-500 font-semibold text-[9px] sm:text-[10px] tracking-widest uppercase">
              Market
            </span>
          </div>
        </Link>
        
        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href={`/${currentLang}`} className="hover:text-green-700 transition-colors font-semibold">{dict?.header?.home || 'INÍCIO'}</Link>
          <Link href={`/${currentLang}/produtos`} className="hover:text-green-700 transition-colors font-semibold">{dict?.header?.products || 'PRODUTOS'}</Link>
          <Link href={`/${currentLang}/sobre`} className="hover:text-green-700 transition-colors font-semibold">{dict?.header?.about || 'SOBRE'}</Link>
          <Link href={`/${currentLang}/contato`} className="hover:text-green-700 transition-colors font-semibold">{dict?.header?.contact || 'CONTATO'}</Link>
        </nav>
        
        {/* DIREITA: SELETOR DE IDIOMA E CARRINHO */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* SELETOR DE IDIOMA (Alterna entre as línguas no clique) */}
          <div className="bg-gray-50 rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {currentLang === 'pt' ? (
              <Link href={`/en${pathnameWithoutLang}`} className="p-2 flex items-center gap-1 hover:bg-white transition-colors">
                <img src="https://flagcdn.com/w40/br.png" className="w-5 sm:w-6 h-auto" alt="PT" />
                <span className="text-[10px] font-bold text-gray-400 hidden sm:inline">PT</span>
              </Link>
            ) : (
              <Link href={`/pt${pathnameWithoutLang}`} className="p-2 flex items-center gap-1 hover:bg-white transition-colors">
                <img src="https://flagcdn.com/w40/gb.png" className="w-5 sm:w-6 h-auto" alt="EN" />
                <span className="text-[10px] font-bold text-gray-400 hidden sm:inline">EN</span>
              </Link>
            )}
          </div>
          
          {/* CARRINHO */}
          <Link href={`/${currentLang}/carrinho`} className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
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
