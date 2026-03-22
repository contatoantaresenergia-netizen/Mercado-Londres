'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '../../lib/supabase/client';
import { useParams } from 'next/navigation';

export default function Header({ dict, lang }) {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const supabase = createClient();

  // ✅ PEGA LANG CORRETAMENTE
  const params = useParams();
  const currentLang = lang || params?.lang || 'pt';

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
        
        {/* LOGO */}
        <div className="flex-shrink-0">
          <Link href={`/${currentLang}`} className="flex flex-col items-start leading-none">
            <span className="text-[#2D5A27] font-bold text-2xl tracking-tight">PRIME BRASIL</span>
            <span className="text-[#D4AF37] font-semibold text-[10px] tracking-[0.3em] uppercase ml-0.5">Market</span>
          </Link>
        </div>

        {/* MENU DESKTOP */}
        <div className="hidden md:flex space-x-8 text-sm font-bold text-gray-800 uppercase tracking-wide">
          <Link href={`/${currentLang}`} className="hover:text-[#2D5A27]"> {headerDict.home} </Link>
          <Link href={`/${currentLang}/produtos`} className="hover:text-[#2D5A27]"> {headerDict.products} </Link>
          <Link href={`/${currentLang}/sobre`} className="hover:text-[#2D5A27]"> {headerDict.about} </Link>
          <Link href={`/${currentLang}/contato`} className="hover:text-[#2D5A27]"> {headerDict.contact} </Link>
        </div>

        {/* DIREITA */}
        <div className="flex items-center space-x-4">
          
          {/* IDIOMAS */}
          <div className="flex items-center space-x-2 border-r pr-3 border-gray-200">
            <Link href="/pt">
              <Image src="/images/flags/br.svg" width={24} height={16} alt="PT" />
            </Link>
            <Link href="/en">
              <Image src="/images/flags/uk.svg" width={24} height={16} alt="EN" />
            </Link>
          </div>

          {/* LOGIN */}
          <div className="flex items-center min-w-[80px] justify-center">
            {user ? (
              <Link href={`/${currentLang}/minha-conta`}>
                👤
              </Link>
            ) : (
              <Link href={`/${currentLang}/login`} className="bg-[#2D5A27] text-white px-4 py-2 rounded text-[11px]">
                {headerDict.login}
              </Link>
            )}
          </div>

          {/* CARRINHO */}
          <Link href={`/${currentLang}/carrinho`} className="relative">
            🛒
          </Link>

          {/* MOBILE */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            ☰
          </button>
        </div>
      </nav>

      {/* MENU MOBILE */}
      {isMenuOpen && (
        <div className="md:hidden p-4 space-y-4">
          <Link href={`/${currentLang}`} onClick={() => setIsMenuOpen(false)}> {headerDict.home} </Link>
          <Link href={`/${currentLang}/produtos`} onClick={() => setIsMenuOpen(false)}> {headerDict.products} </Link>
          <Link href={`/${currentLang}/sobre`} onClick={() => setIsMenuOpen(false)}> {headerDict.about} </Link>
          <Link href={`/${currentLang}/contato`} onClick={() => setIsMenuOpen(false)}> {headerDict.contact} </Link>
          <Link href={`/${currentLang}/carrinho`} onClick={() => setIsMenuOpen(false)}> {headerDict.cart} </Link>
          <Link href={`/${currentLang}/login`} onClick={() => setIsMenuOpen(false)}> {headerDict.login} </Link>
        </div>
      )}
    </header>
  );
}
