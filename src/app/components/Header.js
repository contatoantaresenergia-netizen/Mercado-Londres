'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import MobileMenu from './MobileMenu';

export default function Header() {
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const logoSupabase = "https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/logo.png/logo-prime-brasil-removebg-preview.png";

  return (
    <header className="bg-green-700 text-white shadow-lg w-full">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* LADO ESQUERDO: LOGO + NOME (AJUSTADO) */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition group">
            <div className="h-18 w-18 flex-shrink-0">
              <img 
                src={logoSupabase} 
                alt="Prime Brasil Logo" 
                className="h-full w-full object-contain" 
              />
            </div>
            
            <div className="flex flex-col leading-tight">
              {/* Diminuído de text-xl para text-lg e md:text-2xl para md:text-xl */}
              <span className="text-white font-bold text-lg md:text-xl uppercase tracking-tight">
                Prime Brasil
              </span>
              {/* Diminuído de text-xs para text-[10px] e md:text-sm para md:text-xs */}
              <span className="text-yellow-400 font-semibold text-[10px] md:text-xs tracking-[0.15em] uppercase">
                Market
              </span>
            </div>
          </Link>
          
          {/* CENTRO: NAVEGAÇÃO DESKTOP */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-yellow-300 transition font-semibold text-sm uppercase">
              Início
            </Link>
            <Link href="/produtos" className="hover:text-yellow-300 transition font-semibold text-sm uppercase">
              Produtos
            </Link>
            <Link href="/sobre" className="hover:text-yellow-300 transition font-semibold text-sm uppercase">
              Sobre
            </Link>
            <Link href="/contato" className="hover:text-yellow-300 transition font-semibold text-sm uppercase">
              Contato
            </Link>
          </nav>
          
          {/* LADO DIREITO: CARRINHO E MOBILE */}
          <div className="flex items-center gap-4">
            <Link 
              href="/carrinho" 
              className="relative hover:text-yellow-300 transition p-2"
            >
              <ShoppingCart className="w-6 h-6" />
              {getCartCount() > 0 && (
                <span className="absolute top-0 right-0 bg-yellow-400 text-green-900 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-green-700">
                  {getCartCount()}
                </span>
              )}
            </Link>
            
            <button 
              className="md:hidden p-2 hover:bg-green-600 rounded transition"
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
