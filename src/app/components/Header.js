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
  
  const pathnameWithoutLang = pathname.replace(`/${currentLang}`, '') || '/';
  
  const logoSupabase = "https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/logo.png/logomarca.png";
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b h-20">
      {/* Reduzi o padding horizontal (px-2) para ganhar espaço nas bordas */}
      <div className="container mx-auto px-2 sm:px-4 h-full flex items-center justify-between gap-1">
        
        {/* LOGO E NOME: Ocupando o mínimo de espaço possível */}
        <Link 
          href={`/${currentLang}`}
          className="flex items-center gap-1 hover:opacity-90 transition min-w-0"
        >
          <div className="h-9 w-9 sm:h-14 sm:w-14 flex-shrink-0">
            <img 
              src={logoSupabase} 
              alt="Logo" 
              className="h-full w-full object-contain" 
            />
          </div>
          <div className="flex flex-col leading-tight overflow-hidden">
            <span className="text-green-700 font-bold text-[10px] sm:text-lg uppercase whitespace-nowrap">
              Prime Brasil
            </span>
            <span className="text-yellow-500 font-semibold text-[7px] sm:text-[10px] tracking-widest uppercase">
              Market
            </span>
          </div>
        </Link>
        
        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href={`/${currentLang}`} className="hover:text-green-700 transition-colors font-semibold">
            {dict?.header?.home || 'INÍCIO'}
          </Link>
          <Link href={`/${currentLang}/produtos`} className="hover:text-green-700 transition-colors font-semibold">
            {dict?.header?.products || 'PRODUTOS'}
          </Link>
          <Link href={`/${currentLang}/sobre`} className="hover:text-green-700 transition-colors font-semibold">
            {dict?.header?.about || 'SOBRE'}
          </Link>
          <Link href={`/${currentLang}/contato`} className="hover:text-green-700 transition-colors font-semibold">
            {dict?.header?.contact || 'CONTATO'}
          </Link>
        </nav>
        
        {/* LADO DIREITO: Bandeiras e Carrinho bem compactos */}
        <div className="flex items-center gap-1 sm:gap-4 flex-shrink-0">
          
          {/* BANDEIRAS COMPACTAS */}
          <div className="flex items-center gap-0.5 bg-gray-50 p-1 rounded-md border border-gray-200">
            <Link 
              href={`/pt${pathnameWithoutLang}`}
              className={`p-1 rounded ${currentLang === 'pt' ? 'bg-white shadow-sm ring-1 ring-green-500' : 'opacity-50'}`}
            >
              <img src="https://flagcdn.com/w40/br.png" className="w-4 sm:w-6 h-auto" alt="PT" />
            </Link>
            <Link 
              href={`/en${pathnameWithoutLang}`}
              className={`p-1 rounded ${currentLang === 'en' ? 'bg-white shadow-sm ring-1 ring-green-500' : 'opacity-50'}`}
            >
              <img src="https://flagcdn.com/w40/gb.png" className="w-4 sm:w-6 h-auto" alt="EN" />
            </Link>
          </div>
          
          {/* CARRINHO */}
          <Link 
            href={`/${currentLang}/carrinho`}
            className="relative p-1.5"
          >
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            {cart?.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

      </div>
    </header>
  );
}
