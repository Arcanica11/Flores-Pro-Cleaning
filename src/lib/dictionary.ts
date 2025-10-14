// src/lib/dictionary.ts
import 'server-only';
import esDict from '@/dictionaries/es.json';
import enDict from '@/dictionaries/en.json';

const dictionaries = {
  en: () => Promise.resolve(enDict),
  es: () => Promise.resolve(esDict),
};

export const getDictionary = async (lang: 'es' | 'en') => {
  const loader = dictionaries[lang] || dictionaries.es;
  return loader();
};