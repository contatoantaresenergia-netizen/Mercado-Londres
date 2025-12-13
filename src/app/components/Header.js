'use client'
import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import MobileMenu from './MobileMenu';

export default function Header() {
  const { getCartCount } = useCart();
  
  return (
    <header className="bg-green-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <span className="text-2xl">🇧🇷</span>
            <span className="font-bold text-xl">Brazilian Center</span>
          </Link>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-yellow-300 transition">
              Início
            </Link>
            <Link href="/produtos" className="hover:text-yellow-300 transition">
              Produtos
            </Link>
            <Link href="/sobre" className="hover:text-yellow-300 transition">
              Sobre
            </Link>
            <Link href="/contato" className="hover:text-yellow-300 transition">
              Contato
            </Link>
          </nav>
          
          {/* Cart e Menu Mobile */}
          <div className="flex items-center gap-2">
            <Link 
              href="/carrinho" 
              className="relative hover:text-yellow-300 transition flex items-center gap-2"
            >
              <ShoppingCart className="w-6 h-6" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-green-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
            
            {/* Menu Hambúrguer - Apenas Mobile */}
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
