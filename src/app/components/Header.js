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
        {/* Mantivemos h-20 para dar um pouco mais de espaço que o h-16 original, sem exagerar */}
        <div className="flex items-center justify-between h-20">
          
          {/* Logo - Ajustada para não quebrar o Header */}
          <Link href="/" className="flex items-center h-full py-2 hover:opacity-90 transition">
            <img 
              src={logoSupabase} 
              alt="Prime Brasil Market" 
              // A mágica está aqui: h-full (ocupa a altura disponível) e max-h-16 (não deixa passar de 64px)
              className="h-full max-h-16 w-auto object-contain" 
            />
          </Link>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-yellow-300 transition font-medium">
              Início
            </Link>
            <Link href="/produtos" className="hover:text-yellow-300 transition font-medium">
              Produtos
            </Link>
            <Link href="/sobre" className="hover:text-yellow-300 transition font-medium">
              Sobre
            </Link>
            <Link href="/contato" className="hover:text-yellow-300 transition font-medium">
              Contato
            </Link>
          </nav>
          
          {/* Cart e Menu Mobile */}
          <div className="flex items-center gap-4">
            <Link 
              href="/carrinho" 
              className="relative hover:text-yellow-300 transition flex items-center p-2"
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
