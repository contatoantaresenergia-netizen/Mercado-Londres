'use client'

import React from 'react';
import Link from 'next/link';

export default function Footer({ lang }) {
  const currentLang = lang || 'pt';

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-black text-xl mb-4 uppercase">
              Prime Brasil <span className="text-yellow-500">Market</span>
            </h3>
            <p className="text-sm">O melhor do Brasil em Londres.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Links</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href={`/${currentLang}/produtos`} className="hover:text-yellow-500">Produtos</Link>
              <Link href={`/${currentLang}/sobre`} className="hover:text-yellow-500">Sobre</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Suporte</h4>
            <p className="text-sm">Londres, Reino Unido</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 text-xs opacity-50">
          © {new Date().getFullYear()} Prime Brasil Market.
        </div>
      </div>
    </footer>
  );
}
