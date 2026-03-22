'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// Ajustei o caminho abaixo para ser o mais compatível possível com o build da Vercel
import { createClient } from '../../lib/supabase/client';

export default function Header({ dict, lang }) {
  const [user, setUser] = useState(null);
  const supabase = createClient();

  // Monitora o estado do usuário (Logado ou Não)
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        
        {/* LOGO - PRIME BRASIL */}
        <div className="flex items-center space-x-2">
          <Link href={`/${lang}`} className="flex items-center">
            <div className="font-bold leading-tight text-left">
              <span className="text-[#2D5A27] block text-xl">PRIME BRASIL</span>
              <span className="text-[#D4AF37] block text-[10px] tracking-[0.2em] uppercase">Market</span>
            </div>
          </Link>
        </div>

        {/* MENU CENTRAL (Desktop) */}
        <div className="hidden md:flex space-x-6 text-sm font-semibold text-gray-800 uppercase tracking-wide">
          <Link href={`/${lang}`} className="hover:text-green-700 transition-colors">{dict.header.home}</Link>
          <Link href={`/${lang}/products`} className="hover:text-green-700 transition-colors">{dict.header.products}</Link>
          <Link href={`/${lang}/about`} className="hover:text-green-700 transition-colors">{dict.header.about}</Link>
          <Link href={`/${lang}/contact`} className="hover:text-green-700 transition-colors">{dict.header.contact}</Link>
        </div>

        {/* ÍCONES DIREITA */}
        <div className="flex items-center space-x-4">
          
          {/* BANDEIRAS */}
          <div className="flex items-center space-x-2 border-r pr-3 border-gray-200">
            <Link href="/pt" className="hover:opacity-75 transition-opacity">
              <Image src="/images/flags/br.svg" width={22} height={14} alt="PT" className="rounded-sm shadow-sm" />
            </Link>
            <Link href="/en" className="hover:opacity-75 transition-opacity">
              <Image src="/images/flags/uk.svg" width={22} height={14} alt="EN" className="rounded-sm shadow-sm" />
            </Link>
          </div>

          {/* LOGIN / ACCOUNT */}
          <div className="flex items-center">
            {user ? (
              <Link href={`/${lang}/account`} className="text-gray-700 hover:text-green-700 transition-colors" title="Minha Conta">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            ) : (
              <Link href={`/${lang}/login`} className="text-[11px] font-bold text-gray-700 hover:text-green-700 uppercase tracking-tighter border border-gray-300 px-2 py-1 rounded hover:border-green-700 transition-all">
                {dict.header.login || "Entrar"}
              </Link>
            )}
          </div>

          {/* CARRINHO */}
          <Link href={`/${lang}/cart`} className="relative group p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 group-hover:text-green-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full shadow-sm">
              0
            </span>
          </Link>

        </div>
      </nav>
    </header>
  );
}
