import { NextResponse } from 'next/server'

const locales = ['pt', 'en']

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Verifica se o caminho já tem o idioma (ex: /en/...)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  
  if (pathnameHasLocale) return
  
  // Se não tiver idioma, redireciona para o padrão (pt)
  request.nextUrl.pathname = `/pt${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Pula arquivos internos do Next, imagens e api
    '/((?!api|_next/static|_next/image|favicon.ico|flags).*)',
  ],
}
