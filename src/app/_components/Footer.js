'use client'

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone, Truck } from 'lucide-react';

export default function Footer({ dict, lang }) {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* COLUNA 1: MARCA */}
          <div>
            <h3 className="font-black text-xl mb-4 uppercase tracking-tighter">
              Prime Brasil <span className="text-yellow-400">Market</span>
            </h3>
            <p className="text-gray-400 text-sm">
              {dict?.footer?.description || 'Os melhores produtos brasileiros entregues na sua porta com segurança e máxima qualidade em todo o Reino Unido.'}
            </p>
          </div>
          
          {/* COLUNA 2: LINKS ÚTEIS */}
          <div>
            <h4 className="font-bold mb-4 text-white uppercase text-xs tracking-widest">
              {dict?.footer?.quickLinks || 'Links Úteis'}
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href={`/${lang}`} className="hover:text-yellow-400 transition">{dict?.header?.home || 'Início'}</Link></li>
              <li><Link href={`/${lang}/produtos`} className="hover:text-yellow-400 transition">{dict?.header?.products || 'Produtos'}</Link></li>
              <li><Link href={`/${lang}/sobre`} className="hover:text-yellow-400 transition">{dict?.header?.about || 'Sobre Nós'}</Link></li>
              <li><Link href={`/${lang}/contato`} className="hover:text-yellow-400 transition">{dict?.header?.contact || 'Contato'}</Link></li>
              
              <li className="pt-2 border-t border-gray-800 mt-2">
                <Link href={`/${lang}/entrega`} className="flex items-center gap-2 text-green-400 font-semibold hover:text-yellow-400 transition">
                  <Truck className="w-4 h-4" />
                  {dict?.footer?.deliveryInfo || 'Informações de Entrega'}
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUNA 3: CONTATO */}
          <div>
            <h4 className="font-bold mb-4 text-white uppercase text-xs tracking-widest">
              {dict?.footer?.contact || 'Contato'}
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-500" />
                +44 7459 413442 
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-500" />
                primebrasilmarket@outlook.com
              </li>
            </ul>
          </div>

          {/* COLUNA 4: REDES SOCIAIS */}
          <div>
            <h4 className="font-bold mb-4 text-white uppercase text-xs tracking-widest">Siga-nos</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/primebrasilmarket" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gray-800 p-2 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a 
                href="https://www.instagram.com/prime_brasilmarket/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gray-800 p-2 rounded-full hover:bg-yellow-400 hover:text-gray-900 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* LINHA INFERIOR */}
        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Prime Brasil Market - Brazilian Centre. {dict?.footer?.rights || 'Todos os direitos reservados.'}</p>
          <p className="mt-1">Entregas operadas por DPD Logistics.</p>
        </div>
      </div>
    </footer>
  );
}
