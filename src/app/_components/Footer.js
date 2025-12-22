'use client'

import React from 'react';
import Link from 'next/link';

export default function Footer({ lang }) {
  const currentLang = lang || 'pt';
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-white font-black text-xl mb-4">
              PRIME BRASIL <span className="text-yellow-500">MARKET</span>
            </h3>
            <p className="text-sm">Sabor do Brasil diretamente para sua casa em Londres.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${currentLang}/produtos`} className="hover:text-yellow-500">Produtos</Link></li>
              <li><Link href={`/${currentLang}/sobre`} className="hover:text-yellow-500">Sobre Nós</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Localização</h4>
            <p className="text-sm text-yellow-500 font-bold">Londres, UK</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs">
          <p>&copy; {year} Prime Brasil Market.</p>
        </div>
      </div>
    </footer>
  );
}
