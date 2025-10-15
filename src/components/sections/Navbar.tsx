'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import type { Locale } from '@/i18n.config';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { dictionary } from '@/dictionaries/en'; // Se usa solo para inferir el tipo

// Definimos un tipo para la porción del diccionario que el Navbar espera recibir.
type NavbarDictionary = typeof dictionary.navbar;

// Las props del componente ahora incluyen 'lang' y 'dictionary'.
export default function Navbar({ lang, dictionary }: { lang: Locale; dictionary: NavbarDictionary }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Efecto para detectar el scroll y cambiar el fondo del navbar.
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efecto para bloquear el scroll del body cuando el menú móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  const navLinks = [
    { name: dictionary.home, href: `/${lang}` },
    { name: dictionary.services, href: `/${lang}/services` },
    { name: dictionary.about, href: `/${lang}/about` },
  ];

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
          hasScrolled ? 'bg-black/80 backdrop-blur-sm border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          {/* Logo a la izquierda */}
          <Link href={`/${lang}`} className="z-50 flex-shrink-0">
            <Image
              src="/FPC_Primary_Logo_WHITE.webp"
              alt="Flores Pro-Cleaning Logo"
              width={160}
              height={40}
              className="h-auto w-auto"
              priority
            />
          </Link>

          {/* Enlaces de navegación en el centro (solo para desktop) */}
          <nav className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors hover:text-white text-gray-300 font-medium uppercase tracking-wider ${
                  pathname === link.href ? '!text-white' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Acciones a la derecha (solo para desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href={`/${lang}/agendar-visita`}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-white shadow hover:bg-primary/90 h-10 px-6"
            >
              {dictionary.book}
            </Link>
          </div>

          {/* Botón de Menú para Móvil */}
          <div className="lg:hidden z-50">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Menú Overlay para Móvil con Animación */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg lg:hidden"
          >
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center h-full"
            >
              <nav className="flex flex-col items-center gap-8 text-center">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-semibold text-gray-300 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href={`/${lang}/agendar-visita`}
                  onClick={() => setIsOpen(false)}
                  className="mt-8 inline-flex items-center justify-center rounded-md text-xl font-medium transition-colors bg-primary text-white shadow hover:bg-primary/90 h-12 px-8"
                >
                  {dictionary.book}
                </Link>
                <div className="mt-8">
                  <LanguageSwitcher />
                </div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}