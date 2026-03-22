'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function Header({ dict, lang }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const supabase = createClient();

  // Verifica se o usuário está logado ao carregar a página
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    // Escuta mudanças na autenticação (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const navLinks = [
    { name: dict.header.home, href: `/${lang}` },
    { name: dict.header.products, href: `/${lang}/products` },
    { name: dict.header.about, href: `/${lang}/about` },
    { name: dict.header.contact, href: `/${lang}/contact` },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* LOGO */}
          <div className="flex-shrink-0">
            <Link href={`/${lang}`} className="text-2xl font-bold text-blue-600">
              MERCADO LONDRES
            </Link>
          </div>

          {/* MENU DESKTOP */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* ICONES DIREITA (CARRINHO E LOGIN) */}
          <div className="flex items-center space-x-5">
            {/* Link do Carrinho */}
            <Link href={`/${lang}/cart`} className="text-gray-700 hover:text-blue-600 relative">
              <span className="font-medium">{dict.header.cart}</span>
            </Link>

            {/* BOTÃO DE LOGIN / MINHA CONTA */}
            <div className="border-l pl-5 flex items-center">
              {user ? (
                <Link 
                  href={`/${lang}/account`} 
                  className="text-sm font-semibold text-gray-700 hover:text-blue-600 bg-gray-100 px-3 py-2 rounded-lg"
                >
                  {dict.header.myAccount || "Minha Conta"}
                </Link>
              ) : (
                <Link 
                  href={`/${lang}/login`} 
                  className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-all"
                >
                  {dict.header.login || "Entrar"}
                </Link>
              )}
            </div>

            {/* Menu Mobile Button */}
            <button 
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* MENU MOBILE EXPANDIDO */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
