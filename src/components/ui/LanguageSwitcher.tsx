// RUTA: src/components/ui/LanguageSwitcher.tsx (NUEVO ARCHIVO)
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n.config';

export default function LanguageSwitcher() {
  const pathname = usePathname();

  const getRedirectedPath = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <div className="flex items-center space-x-2">
      {i18n.locales.map((locale) => {
        const isCurrent = pathname.split('/')[1] === locale;
        return (
          <Link
            key={locale}
            href={getRedirectedPath(locale)}
            className={`
              px-3 py-1 rounded-md text-sm font-medium transition-colors
              ${isCurrent
                ? 'bg-primary text-black pointer-events-none'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
              }
            `}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}