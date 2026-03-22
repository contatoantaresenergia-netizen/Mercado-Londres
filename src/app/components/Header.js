'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase'; // ✅ arquivo correto
import { useParams } from 'next/navigation';

export default function Header({ dict, lang }) {
  const [user, setUser] = useState(undefined);
  const params = useParams();
  const currentLang = lang || params?.lang || 'pt';

  useEffect(() => {
    if (!supabase) return; // proteção caso supabase seja null

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

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">

      {/* LOGO */}
      <Link href={`/${currentLang}`} className="font-bold text-lg">
        PRIME BRASIL
      </Link>

      {/* MENU */}
      <nav className="flex gap-4">
        <Link href={`/${currentLang}`}>{headerDict.home}</Link>
        <Link href={`/${currentLang}/produtos`}>{headerDict.products}</Link>
        <Link href={`/${currentLang}/contato`}>{headerDict.contact}</Link>
      </nav>

      {/* DIREITA */}
      <div className="flex gap-4 items-center">

        {/* LOGIN */}
        {user === undefined ? (
          <span className="text-gray-400 text-sm">...</span>
        ) : user ? (
          <Link href={`/${currentLang}/minha-conta`}>👤</Link>
        ) : (
          <Link
            href={`/${currentLang}/login`}
            className="bg-green-700 text-white px-3 py-1 rounded"
          >
            {headerDict.login}
          </Link>
        )}

        {/* CARRINHO */}
        <Link href={`/${currentLang}/carrinho`}>🛒</Link>
      </div>
    </header>
  );
}
