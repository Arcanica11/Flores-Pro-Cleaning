'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import type { Locale } from '@/i18n.config';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { dictionary } from '@/dictionaries/en'; 

type NavbarDictionary = typeof dictionary.navbar;

export default function Navbar({ lang, dictionary }: { lang: Locale; dictionary: NavbarDictionary }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // FIX: Detectamos si la página actual es la de inicio.
  const isHomePage = pathname === `/${lang}`;

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  const navLinks = [
    { name: dictionary.home, href: `/${lang}` },
    { name: dictionary.services, href: `/${lang}/services` },
    { name: dictionary.about, href: `/${lang}/about` },
  ];
  
  // FIX: Lógica de clases mejorada.
  // El fondo será oscuro si (el usuario ha hecho scroll) O (no estamos en la página de inicio).
  // Será transparente solo si estamos en la página de inicio Y en la parte superior.
  const headerClasses = `fixed top-0 z-50 w-full transition-colors duration-300 ${
    hasScrolled || !isHomePage
      ? 'bg-soft-black/90 backdrop-blur-sm border-b border-white/10'
      : 'bg-transparent'
  }`;

  return (
    <>
      <header className={headerClasses}>
        <div className="container mx-auto flex h-20 items-center justify-between px-4">
          
          <div className="flex-1 flex justify-start">
            <Link href={`/${lang}`} className="z-50 flex-shrink-0">
              <Image
                src="/floresLogoWeb.png"
                alt="Flores Pro-Cleaning Logo"
                width={140}
                height={40}
                className="h-auto w-200"
                priority
              />
            </Link>
          </div>

          <nav className="hidden lg:flex flex-1 justify-center items-center gap-8 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="transition-colors hover:text-white text-gray-300 font-medium uppercase tracking-wider"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex flex-1 justify-end items-center gap-4">
            <LanguageSwitcher />
            <Link
              href={`/${lang}/agendar-visita`}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-soft-black shadow hover:bg-primary-hover h-10 px-6"
            >
              {dictionary.book}
            </Link>
          </div>

          <div className="lg:hidden z-50">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Menú Overlay para Móvil (Sin cambios) */}
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