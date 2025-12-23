'use client'

import React from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function MobileMenu({ isOpen, onClose, dict, lang }) {
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
        
        {/* Links do Menu - Agora com suporte a Idiomas */}
        <nav className="flex flex-col p-4">
          <Link 
            href={`/${lang}`} 
            className="py-3 px-4 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded transition font-medium"
            onClick={onClose}
          >
            🏠 {dict?.header?.home || 'Início'}
          </Link>
          <Link 
            href={`/${lang}/produtos`} 
            className="py-3 px-4 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded transition font-medium"
            onClick={onClose}
          >
            🛍️ {dict?.header?.products || 'Produtos'}
          </Link>
          <Link 
            href={`/${lang}/sobre`} 
            className="py-3 px-4 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded transition font-medium"
            onClick={onClose}
          >
            ℹ️ {dict?.header?.about || 'Sobre'}
          </Link>
          <Link 
            href={`/${lang}/contato`} 
            className="py-3 px-4 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded transition font-medium"
            onClick={onClose}
          >
            📧 {dict?.header?.contact || 'Contato'}
          </Link>
          <Link 
            href={`/${lang}/carrinho`} 
            className="py-3 px-4 text-gray-700 hover:bg-green-50 hover:text-green-700 rounded transition border-t border-gray-200 mt-2 font-medium"
            onClick={onClose}
          >
            🛒 {dict?.cart?.title || 'Carrinho'}
          </Link>
        </nav>
      </div>
    </>
  );
}
