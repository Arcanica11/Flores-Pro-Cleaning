import Link from 'next/link';
import { getDictionary } from '@/lib/dictionary';
import { Locale } from '../../../i18n.config';

type NavbarProps = {
  lang: Locale;
};

export default async function Navbar({ lang }: NavbarProps) {
  const dict = await getDictionary(lang);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href={`/${lang}`} className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Flores Pro-Cleaning
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href={`/${lang}/services`}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {dict.navbar.services}
            </Link>
            <Link
              href={`/${lang}/about`}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {dict.navbar.about}
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <Link
              href={`/${lang}/agendar-visita`}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
            >
              {dict.navbar.book}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}