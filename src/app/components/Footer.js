'use client'
import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone } from 'lucide-react';

export default function Footer({ lang, dict }) {
  const currentLang = lang || 'pt';
  const f = dict?.footer || {};
  
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          
          {/* Coluna 1: Logo e Descrição */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-yellow-400">
              🇧🇷 Prime Brasil Market
            </h3>
            <p className="text-gray-400 text-sm">
              {currentLang === 'pt' 
                ? 'Os melhores produtos brasileiros entregues na sua porta em Londres.'
                : 'The best Brazilian products delivered to your door in London.'}
            </p>
          </div>
          
          {/* Coluna 2: Links Úteis */}
          <div>
            <h4 className="font-bold mb-4">
              {currentLang === 'pt' ? 'Links Úteis' : 'Useful Links'}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href={`/${currentLang}`} className="hover:text-yellow-400 transition">
                  {currentLang === 'pt' ? 'Início' : 'Home'}
                </Link>
              </li>
              <li>
                <Link href={`/${currentLang}/produtos`} className="hover:text-yellow-400 transition">
                  {currentLang === 'pt' ? 'Produtos' : 'Products'}
                </Link>
              </li>
              <li>
                <Link href={`/${currentLang}/sobre`} className="hover:text-yellow-400 transition">
                  {currentLang === 'pt' ? 'Sobre Nós' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link href={`/${currentLang}/contato`} className="hover:text-yellow-400 transition">
                  {currentLang === 'pt' ? 'Contato' : 'Contact'}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Coluna 3: Contato */}
          <div>
            <h4 className="font-bold mb-4">
              {currentLang === 'pt' ? 'Contato' : 'Contact'}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-500" />
                +44 7860280496
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-500" />
                contato@mercadolondres.co.uk
              </li>
              <li className="text-xs opacity-70 mt-2">
                244 Horton Road, London, SL3 9HN
              </li>
            </ul>
          </div>
          
          {/* Coluna 4: Redes Sociais */}
          <div>
            <h4 className="font-bold mb-4">
              {currentLang === 'pt' ? 'Siga-nos' : 'Follow Us'}
            </h4>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/primebrasilmarket" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-yellow-400 transition"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://www.instagram.com/prime_brasilmarket/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-yellow-400 transition"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Prime Brasil Market. 
            {currentLang === 'pt' 
              ? ' Todos os direitos reservados.' 
              : ' All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
