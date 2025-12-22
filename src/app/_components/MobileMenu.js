'use client'
import React from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;
  
  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        onClick={onClose}
      />
      
      {/* Menu Lateral */}
      <div className="fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-xl md:hidden transform transition-transform duration-300">
        {/* Header do Menu */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-green-700">Menu</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded transition"
            aria-label="Fechar menu"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        {/* Links do Menu */}
        <nav className="flex flex-col p-4">
          <Link 
            href="/" 
            className="py-3 px-4 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded transition"
            onClick={onClose}
          >
            🏠 Início
          </Link>
          <Link 
            href="/produtos" 
            className="py-3 px-4 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded transition"
            onClick={onClose}
          >
            🛍️ Produtos
          </Link>
          <Link 
            href="/sobre" 
            className="py-3 px-4 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded transition"
            onClick={onClose}
          >
            ℹ️ Sobre
          </Link>
          <Link 
            href="/contato" 
            className="py-3 px-4 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded transition"
            onClick={onClose}
          >
            📧 Contato
          </Link>
          <Link 
            href="/carrinho" 
            className="py-3 px-4 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded transition border-t border-gray-200 mt-2"
            onClick={onClose}
          >
            🛒 Carrinho
          </Link>
        </nav>
      </div>
    </>
  );
}
