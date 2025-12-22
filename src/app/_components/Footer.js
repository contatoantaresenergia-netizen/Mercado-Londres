'use client'

import React from 'react';
import Link from 'next/link';

export default function Footer({ dict, lang }) {
  const currentLang = lang || 'pt';
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo e Info */}
          <div>
            <h3 className="text-white font-black text-xl mb-4">
              PRIME BRASIL <span className="text-yellow-500">MARKET</span>
            </h3>
            <p className="text-sm leading-relaxed">
              Sabor do Brasil diretamente para sua casa em Londres. Qualidade e tradição em cada produto.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-white font-bold mb-4">Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${currentLang}/produtos`} className="hover:text-yellow-500 transition">Produtos</Link></li>
              <li><Link href={`/${currentLang}/sobre`} className="hover:text-yellow-500 transition">Sobre Nós</Link></li>
              <li><Link href={`/${currentLang}/contato`} className="hover:text-yellow-500 transition">Contato</Link></li>
            </ul>
          </div>

          {/* Atendimento */}
          <div>
            <h4 className="text-white font-bold mb-4">Atendimento</h4>
            <p className="text-sm">Segunda - Sábado: 09:00 - 18:00</p>
            <p className="text-sm mt-2 text-yellow-500 font-bold">Londres, UK</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs">
          <p>&copy; {year} Prime Brasil Market. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
