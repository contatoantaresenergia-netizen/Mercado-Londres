'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Importado para melhor performance no Next.js
import { ShoppingCart, Menu } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import MobileMenu from './MobileMenu';

export default function Header() {
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // COLE AQUI a URL pública que você copiou do seu Supabase
  const logoSupabase = "https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/SUA_FOTO_AQUI.png";
  
  return (
    <header className="bg-green-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        {/* Aumentamos de h-16 para py-2 para a logo de 200px caber bem */}
        <div className="flex items-center justify-between min-h-[80px] py-2">
          
          {/* Logo - Substituído o texto pela imagem */}
          <Link href="/" className="flex items-center hover:opacity-90 transition">
            <img 
              src={logoSupabase} 
              alt="Prime Brasil Market" 
              // Definimos a largura de 200px como você pediu
              // A qualidade dos 500px originais garantirá que fique nítido
              className="w-[200px] h-auto object-contain" 
            />
          </Link>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8 font-medium">
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
          <div className="flex items-center gap-4">
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
            
            {/* Botão Menu Hambúrguer - Apenas Mobile */}
            <button 
              className="md:hidden p-2 hover:bg-green-600 rounded transition"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Menu Mobile */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}
