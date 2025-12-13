'use client';

import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Home, Package, User, Heart, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function MobileMenu({ cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Início", href: "/" },
    { icon: Package, label: "Produtos", href: "/produtos" },
    { icon: ShoppingCart, label: "Carrinho", href: "/carrinho" },
    { icon: Package, label: "Meus Pedidos", href: "/pedidos" },
    { icon: Heart, label: "Favoritos", href: "/favoritos" },
    { icon: User, label: "Minha Conta", href: "/conta" },
    { icon: Settings, label: "Configurações", href: "/configuracoes" },
  ];

  return (
    <>
      {/* Header Fixo */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-40">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <Link href="/" className="text-lg font-bold text-gray-800">
            Mercado Londres
          </Link>
          
          <div className="flex items-center gap-2">
            <Link href="/carrinho" className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu Lateral Direito */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-2xl z-50 w-72 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mb-8 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Bem-vindo!</p>
            <p className="font-semibold text-gray-800">João Silva</p>
          </div>

          <nav className="space-y-2 flex-1">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <button
            onClick={() => {
              setMenuOpen(false);
              // Adicione aqui a lógica de logout
              console.log('Logout');
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-4"
          >
            <LogOut size={20} />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </div>

      {/* Overlay Escuro */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        />
      )}

      {/* Espaçamento para o conteúdo não ficar atrás do header */}
      <div className="h-16"></div>
    </>
  );
}
