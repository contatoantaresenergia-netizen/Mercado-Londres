import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              🇧🇷 Mercado Brasileiro
            </h3>
            <p className="text-sm">
              Os melhores produtos brasileiros em Londres. Sabor de casa a um clique de distância!
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/produtos" className="hover:text-yellow-400 transition">
                  Todos os Produtos
                </Link>
              </li>
              <li>
                <Link href="/carrinho" className="hover:text-yellow-400 transition">
                  Meu Carrinho
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-yellow-400" />
                <span>Londres, Reino Unido</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-yellow-400" />
                <a href="tel:+44123456789" className="hover:text-yellow-400 transition">
                  +44 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-yellow-400" />
                <a href="mailto:contato@mercadobr.com" className="hover:text-yellow-400 transition">
                  contato@mercadobr.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Siga-nos</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-lg hover:bg-yellow-400 hover:text-gray-900 transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-lg hover:bg-yellow-400 hover:text-gray-900 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6">
              <p className="text-sm font-semibold mb-2">Formas de Pagamento:</p>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-gray-800 px-3 py-1 rounded text-xs">Visa</span>
                <span className="bg-gray-800 px-3 py-1 rounded text-xs">Mastercard</span>
                <span className="bg-gray-800 px-3 py-1 rounded text-xs">PayPal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Mercado Brasileiro em Londres. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
