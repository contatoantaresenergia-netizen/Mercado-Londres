const dictionaries = {
  pt: () => import('../dictionaries/pt.json').then((module) => module.default),
  en: () => import('../dictionaries/en.json').then((module) => module.default),
}

export const getDictionary = async (locale) => {
  // Fallback para 'pt' se o idioma não existir
  return dictionaries[locale]?.() ?? dictionaries.pt()
}
