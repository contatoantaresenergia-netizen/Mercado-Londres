'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu } from 'lucide-react';
import { useCart } from '../_context/CartContext'; // Caminho corrigido para a pasta privada
import MobileMenu from './MobileMenu';

export default function Header({ dict, lang }) {
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const logoSupabase = "https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/logo.png/logomarca.png";

  // Função para trocar o idioma mantendo a página atual (ex: /pt/sobre -> /en/sobre)
  const redirectedPathName = (locale) => {
    if (!pathname) return `/${locale}`;
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <header className="bg-white text-green-700 shadow-md w-full border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href={`/${lang}`} className="flex items-center gap-2 hover:opacity-90 transition">
          <div className="h-14 w-14 flex-shrink-0">
            <img src={logoSupabase} alt="Logo" className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-col leading-tight hidden sm:flex">
            <span className="text-green-700 font-bold text-lg uppercase">Prime Brasil</span>
            <span className="text-yellow-500 font-semibold text-[10px] tracking-widest uppercase">Market</span>
          </div>
        </Link>
        
        {/* NAVEGAÇÃO DESKTOP */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href={`/${lang}`} className="hover:text-yellow-500 transition font-semibold text-sm uppercase">
            {dict?.header?.home || 'Início'}
          </Link>
          <Link href={`/${lang}/produtos`} className="hover:text-yellow-500 transition font-semibold text-sm uppercase">
            {dict?.header?.products || 'Produtos'}
          </Link>
          <Link href={`/${lang}/sobre`} className="hover:text-yellow-500 transition font-semibold text-sm uppercase">
            {dict?.header?.about || 'Sobre'}
          </Link>
          <Link href={`/${lang}/contato`} className="hover:text-yellow-500 transition font-semibold text-sm uppercase">
            {dict?.header?.contact || 'Contato'}
          </Link>
        </nav>
        
        {/* BANDEIRAS E CARRINHO */}
        <div className="flex items-center gap-4">
          {/* SELETOR DE IDIOMAS */}
          <div className="flex items-center gap-3 border-r pr-4 border-gray-200">
            <Link href={redirectedPathName('pt')} title="Português">
              <img 
                src="https://flagcdn.com/w40/br.png" 
                alt="PT" 
                className={`w-6 h-4 rounded-sm transition ${lang === 'pt' ? 'ring-2 ring-yellow-400 scale-110' : 'opacity-40 hover:opacity-100'}`} 
              />
            </Link>
            <Link href={redirectedPathName('en')} title="English">
              <img 
                src="https://flagcdn.com/w40/gb.png" 
                alt="EN" 
                className={`w-6 h-4 rounded-sm transition ${lang === 'en' ? 'ring-2 ring-yellow-400 scale-110' : 'opacity-40 hover:opacity-100'}`} 
              />
            </Link>
          </div>

          {/* CARRINHO */}
          <Link href={`/${lang}/carrinho`} className="relative p-2 text-green-700 hover:text-yellow-500">
            <ShoppingCart className="w-6 h-6" />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-green-900 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                {getCartCount()}
              </span>
            )}
          </Link>
          
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        dict={dict} 
        lang={lang} 
      />
    </header>
  );
}
