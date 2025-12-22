'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Necessário para as bandeiras
import { ShoppingCart, Menu } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import MobileMenu from './MobileMenu';

export default function Header({ dict, lang }) {
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const logoSupabase = "https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/logo.png/logomarca.png";

  // Função para trocar o idioma na URL sem perder a página atual
  const redirectedPathName = (locale) => {
    if (!pathname) return `/${locale}`;
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <header className="bg-white text-green-700 shadow-md w-full border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* LADO ESQUERDO: LOGO */}
          <Link href={`/${lang}`} className="flex items-center gap-2 hover:opacity-90 transition group">
            <div className="h-16 w-16 flex-shrink-0">
              <img 
                src={logoSupabase} 
                alt="Prime Brasil Logo" 
                className="h-full w-full object-contain" 
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-green-700 font-bold text-lg md:text-xl uppercase tracking-tight">
                Prime Brasil
              </span>
              <span className="text-yellow-500 font-semibold text-[10px] md:text-xs tracking-[0.15em] uppercase">
                Market
              </span>
            </div>
          </Link>
          
          {/* CENTRO: NAVEGAÇÃO DESKTOP (Agora usando traduções) */}
          <nav className="hidden md:flex items-center gap-8">
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
          
          {/* LADO DIREITO: BANDEIRAS + CARRINHO */}
          <div className="flex items-center gap-4">
            
            {/* NOVO: SELETOR DE IDIOMAS (Bandeiras) */}
            <div className="flex items-center gap-3 border-r pr-4 border-gray-200">
              <Link href={redirectedPathName('pt')} className="hover:scale-110 transition">
                <img 
                  src="https://flagcdn.com/w40/br.png" 
                  alt="Português" 
                  className={`w-6 h-4 object-cover rounded-sm ${lang === 'pt' ? 'ring-2 ring-yellow-400 opacity-100' : 'opacity-40'}`} 
                />
              </Link>
              <Link href={redirectedPathName('en')} className="hover:scale-110 transition">
                <img 
                  src="https://flagcdn.com/w40/gb.png" 
                  alt="English" 
                  className={`w-6 h-4 object-cover rounded-sm ${lang === 'en' ? 'ring-2 ring-yellow-400 opacity-100' : 'opacity-40'}`} 
                />
              </Link>
            </div>

            <Link 
              href={`/${lang}/carrinho`} 
              className="relative text-green-700 hover:text-yellow-500 transition p-2"
            >
              <ShoppingCart className="w-6 h-6" />
              {getCartCount() > 0 && (
                <span className="absolute top-0 right-0 bg-yellow-400 text-green-900 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                  {getCartCount()}
                </span>
              )}
            </Link>
            
            <button 
              className="md:hidden p-2 text-green-700 hover:bg-gray-100 rounded transition"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} dict={dict} lang={lang} />
    </header>
  );
}
