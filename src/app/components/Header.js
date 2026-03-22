'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Header({ dict, lang }) {
  const [user, setUser] = useState(undefined);
  const [menuOpen, setMenuOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = lang || params?.lang || 'pt';

  useEffect(() => {
    if (!supabase) return;

    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const headerDict = dict?.header || {
    home: "Início",
    products: "Produtos",
    about: "Sobre",
    contact: "Contato",
    cart: "Carrinho",
    login: "Entrar"
  };

  const switchLang = (newLang) => {
    const segments = pathname.split('/');
    segments[1] = newLang;
    router.push(segments.join('/'));
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link href={`/${currentLang}`} className="flex items-center gap-2">
          <Image
            src="https://vpqevrxwiglfpyrwxmne.supabase.co/storage/v1/object/public/images/fav.icon/89036172-8A4B-4886-89B7-1B20DCD9FC45-removebg-preview.png"
            alt="Prime Brasil Market"
            width={48}
            height={48}
            className="object-contain"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-green-700 font-black text-lg tracking-tight">PRIME BRASIL</span>
            <span className="text-gray-400 text-xs font-medium uppercase tracking-widest">Market</span>
          </div>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link href={`/${currentLang}`} className="hover:text-green-700 transition">{headerDict.home}</Link>
          <Link href={`/${currentLang}/produtos`} className="hover:text-green-700 transition">{headerDict.products}</Link>
          <Link href={`/${currentLang}/sobre`} className="hover:text-green-700 transition">{headerDict.about}</Link>
          <Link href={`/${currentLang}/contato`} className="hover:text-green-700 transition">{headerDict.contact}</Link>
        </nav>

        {/* DIREITA */}
        <div className="flex items-center gap-3">

          {/* SELETOR DE IDIOMA */}
          <button
            onClick={() => switchLang('pt')}
            className={`text-lg transition-opacity ${currentLang === 'pt' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
            title="Português"
          >
            🇧🇷
          </button>
          <button
            onClick={() => switchLang('en')}
            className={`text-lg transition-opacity ${currentLang === 'en' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
            title="English"
          >
            🇬🇧
          </button>

          {/* CARRINHO */}
          <Link
            href={`/${currentLang}/carrinho`}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-green-50 hover:ring-2 hover:ring-green-700 transition"
            title="Carrinho"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </Link>

          {/* LOGIN / CONTA */}
          {user === undefined ? (
            <div className="w-20 h-8 rounded bg-gray-100 animate-pulse" />
          ) : user ? (
            <Link
              href={`/${currentLang}/minha-conta`}
              className="w-9 h-9 rounded-full bg-green-700 flex items-center justify-center hover:bg-green-800 transition"
              title="Minha Conta"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
            </Link>
          ) : (
            <Link
              href={`/${currentLang}/login`}
              className="bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-4 py-2 rounded transition"
            >
              {headerDict.login}
            </Link>
          )}

          {/* MENU MOBILE */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* MENU MOBILE DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4 text-sm font-medium text-gray-700">
          <Link href={`/${currentLang}`} onClick={() => setMenuOpen(false)} className="hover:text-green-700">{headerDict.home}</Link>
          <Link href={`/${currentLang}/produtos`} onClick={() => setMenuOpen(false)} className="hover:text-green-700">{headerDict.products}</Link>
          <Link href={`/${currentLang}/sobre`} onClick={() => setMenuOpen(false)} className="hover:text-green-700">{headerDict.about}</Link>
          <Link href={`/${currentLang}/contato`} onClick={() => setMenuOpen(false)} className="hover:text-green-700">{headerDict.contact}</Link>
        </div>
      )}
    </header>
  );
}
