'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/app/context/cartContext';

export default function Header() {
  const router = useRouter();
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-green-700 to-green-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="bg-yellow-400 text-green-800 font-black text-2xl px-3 py-2 rounded-lg">
              🇧🇷
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight">Mercado</h1>
              <p className="text-xs text-green-100">Brasileiro em Londres</p>
            </div>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full px-4 py-2 pr-10 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/carrinho')}
              className="relative bg-yellow-400 hover:bg-yellow-500 text-green-800 px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Carrinho</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 pb-4 border-t border-green-500 pt-3">
          <Link href="/" className="hover:text-yellow-400 transition font-medium">
            Início
          </Link>
          <Link href="/produtos" className="hover:text-yellow-400 transition font-medium">
            Todos os Produtos
          </Link>
        </nav>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-green-800 border-t border-green-600">
          <nav className="flex flex-col px-4 py-4 space-y-3">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-yellow-400 transition font-medium"
            >
              Início
            </Link>
            <Link 
              href="/produtos" 
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-yellow-400 transition font-medium"
            >
              Todos os Produtos
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
