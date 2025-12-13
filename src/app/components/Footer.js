import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Sobre */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-yellow-400">🇧🇷 Mercado Londres</h3>
            <p className="text-gray-400 text-sm">
              Os melhores produtos brasileiros entregues na sua porta em Londres.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Links Úteis</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-yellow-400 transition">Início</Link></li>
              <li><Link href="/produtos" className="hover:text-yellow-400 transition">Produtos</Link></li>
              <li><Link href="/sobre" className="hover:text-yellow-400 transition">Sobre Nós</Link></li>
              <li><Link href="/contato" className="hover:text-yellow-400 transition">Contato</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-bold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +44 20 1234 5678
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                contato@mercadolondres.co.uk
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h4 className="font-bold mb-4">Siga-nos</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-yellow-400 transition">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-yellow-400 transition">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Mercado Londres. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
