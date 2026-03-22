'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '../../lib/supabase/client';

export default function Header({ dict, lang }) {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const supabase = createClient();

  // Verifica o status do usuário
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      }
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  // Se o dict falhar, usamos valores padrão para não ficar em branco
  const headerDict = dict?.header || {
    home: "Início",
    products: "Produtos",
    about: "Sobre",
    contact: "Contato",
    cart: "Carrinho",
    login: "Entrar",
    myAccount: "Minha Conta"
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-[100] w-full">
      <nav className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        
        {/* LOGO - PRIME BRASIL */}
        <div className="flex-shrink-0">
          <Link href={`/${lang}`} className="flex flex-col items-start leading-none">
            <span className="text-[#2D5A27] font-bold text-2xl tracking-tight">PRIME BRASIL</span>
            <span className="text-[#D4AF37] font-semibold text-[10px] tracking-[0.3em] uppercase ml-0.5">Market</span>
          </Link>
        </div>

        {/* MENU CENTRAL (Desktop) */}
        <div className="hidden md:flex space-x-8 text-sm font-bold text-gray-800 uppercase tracking-wide">
          <Link href={`/${lang}`} className="hover:text-[#2D5A27] transition-colors">{headerDict.home}</Link>
          <Link href={`/${lang}/produtos`} className="hover:text-[#2D5A27] transition-colors">{headerDict.products}</Link>
          <Link href={`/${lang}/sobre`} className="hover:text-[#2D5A27] transition-colors">{headerDict.about}</Link>
          <Link href={`/${lang}/contato`} className="hover:text-[#2D5A27] transition-colors">{headerDict.contact}</Link>
        </div>

        {/* ÍCONES DIREITA */}
        <div className="flex items-center space-x-4">
          
          {/* BANDEIRAS */}
          <div className="flex items-center space-x-2 border-r pr-3 border-gray-200">
            <Link href="/pt" className="hover:scale-110 transition-transform">
              <Image src="/images/flags/br.svg" width={24} height={16} alt="PT" className="rounded-sm shadow-sm" />
            </Link>
            <Link href="/en" className="hover:scale-110 transition-transform">
              <Image src="/images/flags/uk.svg" width={24} height={16} alt="EN" className="rounded-sm shadow-sm" />
            </Link>
          </div>

          {/* BOTÃO LOGIN / ACCOUNT (Obrigatório aparecer) */}
          <div className="flex items-center min-w-[80px] justify-center">
            {user ? (
              <Link href={`/${lang}/minha-conta`} className="text-[#2D5A27] hover:text-[#D4AF37] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            ) : (
              <Link 
                href={`/${lang}/login`} 
                className="bg-[#2D5A27] text-white px-4 py-2 rounded font-bold text-[11px] uppercase tracking-tighter hover:bg-[#1e3d1a] transition-all shadow-sm"
              >
                {headerDict.login || "Entrar"}
              </Link>
            )}
          </div>

          {/* CARRINHO */}
          <Link href={`/${lang}/carrinho`} className="relative p-1 text-gray-700 hover:text-[#2D5A27] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
              0
            </span>
          </Link>

          {/* MOBILE MENU TOGGLE */}
          <button className="md:hidden p-1 text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </nav>

      {/* MENU MOBILE EXPANDIDO */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-inner">
          <Link href={`/${lang}`} className="block font-bold text-gray-800 uppercase" onClick={() => setIsMenuOpen(false)}>{headerDict.home}</Link>
          <Link href={`/${lang}/produtos`} className="block font-bold text-gray-800 uppercase" onClick={() => setIsMenuOpen(false)}>{headerDict.products}</Link>
          <Link href={`/${lang}/login`} className="block font-bold text-[#2D5A27] uppercase" onClick={() => setIsMenuOpen(false)}>{headerDict.login}</Link>
        </div>
      )}
    </header>
  );
}
