'use client'

import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  const changeLanguage = (newLang) => {
    // Exemplo: se o caminho é /pt/produtos, vira /en/produtos
    const segments = pathname.split('/')
    segments[1] = newLang
    router.push(segments.join('/'))
  }

  return (
    <div className="flex gap-4 items-center">
      <button onClick={() => changeLanguage('pt')} className="hover:opacity-80 transition">
        <Image src="/flags/br.svg" alt="Português" width={24} height={18} />
      </button>
      <button onClick={() => changeLanguage('en')} className="hover:opacity-80 transition">
        <Image src="/flags/uk.svg" alt="English UK" width={24} height={18} />
      </button>
    </div>
  )
}
