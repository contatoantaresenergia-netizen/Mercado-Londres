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
      <div className="container mx-auto px-4 h-full flex items-center justify-between gap-1">
        
        {/* LOGO E NOME - Tamanho confortável para mobile */}
        <Link 
          href={`/${currentLang}`}
          className="flex items-center gap-2 hover:opacity-90 transition min-w-0"
        >
          <div className="h-11 w-11 sm:h-14 sm:w-14 flex-shrink-0">
            <img src={logoSupabase} alt="Logo" className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-green-700 font-bold text-[13px] sm:text-lg uppercase whitespace-nowrap">
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
        
        {/* DIREITA: APENAS AS BANDEIRAS E CARRINHO */}
        <div className="flex items-center gap-3 flex-shrink-0">
          
          {/* BANDEIRAS SIMPLES - Sem bordas ou fundo cinza */}
          <div className="flex items-center gap-2">
            <Link 
              href={`/pt${pathnameWithoutLang}`}
              className={`transition-opacity ${currentLang === 'pt' ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-100'}`}
            >
              <img src="https://flagcdn.com/w40/br.png" className="w-6 h-auto rounded-sm shadow-sm" alt="PT" />
            </Link>
            <Link 
              href={`/en${pathnameWithoutLang}`}
              className={`transition-opacity ${currentLang === 'en' ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-100'}`}
            >
              <img src="https://flagcdn.com/w40/gb.png" className="w-6 h-auto rounded-sm shadow-sm" alt="EN" />
            </Link>
          </div>
          
          {/* CARRINHO */}
          <Link href={`/${currentLang}/carrinho`} className="relative p-1">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {cart?.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

      </div>
    </header>
  );
}
