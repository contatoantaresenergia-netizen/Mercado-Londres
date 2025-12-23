'use client'

import React from 'react';
import Link from 'next/link';

export default function Footer({ lang, dict }) {
  // Define o idioma padrão como português caso falhe
  const currentLang = lang || 'pt';
  
  // Acessa os textos do dicionário (JSON)
  // Se o dict não tiver a chave 'footer', ele usa os textos fixos como segurança
  const f = dict?.footer || {};

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="container mx-auto px-4 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Coluna 1: Logo e Descrição */}
          <div>
            <h3 className="text-white font-black text-xl mb-4 uppercase">
              Prime Brasil <span className="text-yellow-500">Market</span>
            </h3>
            <p className="text-sm">
              {f.description || 'O melhor do Brasil em Londres.'}
            </p>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">
              {f.linksTitle || 'Links'}
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link href={`/${currentLang}/produtos`} className="hover:text-yellow-500">
                {f.products || 'Produtos'}
              </Link>
              <Link href={`/${currentLang}/sobre`} className="hover:text-yellow-500">
                {f.about || 'Sobre'}
              </Link>
            </div>
          </div>

          {/* Coluna 3: Contato (Visual igual ao seu print do console) */}
          <div>
            <h4 className="font-bold mb-4 text-white uppercase text-xs tracking-widest">
              {f.contactTitle || 'Contato'}
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center justify-center md:justify-start gap-2">
                {/* O SVG do ícone de telefone exatamente como está no seu print */}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-4 h-4 text-green-500"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                {/* Puxa o número do telefone do arquivo JSON */}
                <span>{f.phone || '+44 78 60280496'}</span>
              </li>
              <li className="text-xs opacity-70">
                {f.location || '244 Horton Road, London, SL3 9HN'}
              </li>
            </ul>
          </div>

        </div>

        {/* Linha de Copyright */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-xs opacity-50">
          © {new Date().getFullYear()} Prime Brasil Market.
        </div>
      </div>
    </footer>
  );
}
