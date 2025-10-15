export const languages = {
  defaultLocale: 'en',
  locales: ['en', 'es'],
} as const;

export type Locale = (typeof languages)['locales'][number];