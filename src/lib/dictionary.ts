import 'server-only';
import type { Locale } from '../i18n.config'; // FIX: Importar Locale desde el archivo consolidado.

// FIX: Importar los objetos 'dictionary' desde los nuevos módulos .ts
import { dictionary as esDict } from '@/dictionaries/es';
import { dictionary as enDict } from '@/dictionaries/en';

const dictionaries = {
  en: () => Promise.resolve(enDict),
  es: () => Promise.resolve(esDict),
};

// FIX: Aseguramos que el tipo de 'lang' sea el correcto y que el retorno sea inferido.
export const getDictionary = async (lang: Locale) => {
  const loader = dictionaries[lang] || dictionaries.en; // Usar 'en' como fallback
  return loader();
};