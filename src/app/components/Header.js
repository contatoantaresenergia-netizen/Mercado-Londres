'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import MobileMenu from './MobileMenu';

export default function Header() {
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const logoSupabase = "https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/logo.png/logomarca.png";

  return (
    // Alterado: bg-green-700 para bg-white e text-white para text-green-700
    <header className="bg-white text-green-700 shadow-md w-full border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* LADO ESQUERDO: LOGO + NOME */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition group">
            <div className="h-16 w-16 flex-shrink-0">
              <img 
                src={logoSupabase} 
                alt="Prime Brasil Logo" 
                className="h-full w-full object-contain" 
              />
            </div>
            
            <div className="flex flex-col leading-tight">
              {/* Alterado: text-white para text-green-700 */}
              <span className="text-green-700 font-bold text-lg md:text-xl uppercase tracking-tight">
                Prime Brasil
              </span>
              {/* Mantido: Amarelo para contraste no branco */}
              <span className="text-yellow-500 font-semibold text-[10px] md:text-xs tracking-[0.15em] uppercase">
                Market
              </span>
            </div>
          </Link>
          
          {/* CENTRO: NAVEGAÇÃO DESKTOP */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Alterado: hover:text-yellow-300 para hover:text-yellow-500 */}
            <Link href="/" className="hover:text-yellow-500 transition font-semibold text-sm uppercase">
              Início
            </Link>
            <Link href="/produtos" className="hover:text-yellow-500 transition font-semibold text-sm uppercase">
              Produtos
            </Link>
            <Link href="/sobre" className="hover:text-yellow-500 transition font-semibold text-sm uppercase">
              Sobre
            </Link>
            <Link href="/contato" className="hover:text-yellow-500 transition font-semibold text-sm uppercase">
              Contato
            </Link>
          </nav>
          
          {/* LADO DIREITO: CARRINHO E MOBILE */}
          <div className="flex items-center gap-4">
            <Link 
              href="/carrinho" 
              className="relative text-green-700 hover:text-yellow-500 transition p-2"
            >
              <ShoppingCart className="w-6 h-6" />
              {getCartCount() > 0 && (
                // Alterado: border-green-700 para border-white para destacar no fundo branco
                <span className="absolute top-0 right-0 bg-yellow-400 text-green-900 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                  {getCartCount()}
                </span>
              )}
            </Link>
            
            <button 
              // Alterado: hover:bg-green-600 para hover:bg-gray-100
              className="md:hidden p-2 text-green-700 hover:bg-gray-100 rounded transition"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}
