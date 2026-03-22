'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

export default function Header({ dict, lang }) {
  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
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
        
        {/* LOGO (Mantendo seu estilo Prime Brasil) */}
        <div className="flex items-center space-x-2">
          <Link href={`/${lang}`} className="flex items-center">
            <div className="font-bold leading-tight">
              <span className="text-[#2D5A27] block text-xl">PRIME BRASIL</span>
              <span className="text-[#D4AF37] block text-xs tracking-[0.2em]">MARKET</span>
            </div>
          </Link>
        </div>

        {/* MENU CENTRAL */}
        <div className="hidden md:flex space-x-6 text-sm font-semibold text-gray-800">
          <Link href={`/${lang}`} className="hover:text-green-700">{dict.header.home}</Link>
          <Link href={`/${lang}/products`} className="hover:text-green-700">{dict.header.products}</Link>
          <Link href={`/${lang}/about`} className="hover:text-green-700">{dict.header.about}</Link>
          <Link href={`/${lang}/contact`} className="hover:text-green-700">{dict.header.contact}</Link>
        </div>

        {/* ÍCONES DIREITA (Bandeiras, Login e Carrinho) */}
        <div className="flex items-center space-x-4">
          
          {/* BANDEIRAS (Idiomas) */}
          <div className="flex items-center space-x-2 border-r pr-4 border-gray-200">
            <Link href="/pt" className="hover:opacity-80 transition-opacity">
              <Image src="/images/flags/br.svg" width={24} height={16} alt="PT" className="rounded-sm" />
            </Link>
            <Link href="/en" className="hover:opacity-80 transition-opacity">
              <Image src="/images/flags/uk.svg" width={24} height={16} alt="EN" className="rounded-sm" />
            </Link>
          </div>

          {/* BOTÃO LOGIN / USER (Novo!) */}
          <div className="flex items-center">
            {user ? (
              <Link href={`/${lang}/account`} className="text-gray-700 hover:text-green-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Link>
            ) : (
              <Link href={`/${lang}/login`} className="text-xs font-bold text-gray-700 hover:text-green-700 uppercase tracking-tighter">
                {dict.header.login || "Entrar"}
              </Link>
            )}
          </div>

          {/* CARRINHO (Mantendo seu estilo) */}
          <Link href={`/${lang}/cart`} className="relative group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-700 group-hover:text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">2</span>
          </Link>

        </div>
      </nav>
    </header>
  );
}
