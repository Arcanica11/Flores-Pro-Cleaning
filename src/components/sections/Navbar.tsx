'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import type { Locale } from '@/i18n.config';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
// FIX: Importar el tipo completo para acceder a footer.contact_phone
import { dictionary as enDictType } from '@/dictionaries/en';

// FIX: Usar el tipo del diccionario completo para tener acceso a todo
type FullDictionary = typeof enDictType;
// FIX: Extraer el tipo específico para Navbar de forma segura
type NavbarDictionary = FullDictionary['navbar'];
// FIX: Extraer el tipo específico para Footer de forma segura
type FooterDictionary = FullDictionary['footer'];

// FIX: Actualizar las props para recibir el diccionario completo o las partes necesarias
export default function Navbar({ lang, dictionary, footerDictionary }: {
  lang: Locale;
  dictionary: NavbarDictionary;
  footerDictionary: FooterDictionary; // <-- Añadir prop para el footer
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

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

  const headerClasses = `fixed top-0 z-50 w-full transition-colors duration-300 ${
    hasScrolled || !isHomePage
      ? 'bg-soft-black/90 backdrop-blur-sm border-b border-white/10'
      : 'bg-transparent'
  }`;

  // NOTE: Construir la URL de WhatsApp a partir del número en el diccionario del footer
  const rawPhoneNumber = footerDictionary.contact_phone;
  // Limpiar el número: quitar paréntesis, espacios, guiones. Asumir código de país 1 si no está presente.
  const cleanedPhoneNumber = rawPhoneNumber.replace(/\D/g, '');
  // Asumiendo que el número ya incluye el código de área y local, solo añadimos el código de país (ej: 1 para US/Canada)
  // Si el número ya viene con código de país, este paso podría necesitar ajuste.
  const whatsappNumber = `1${cleanedPhoneNumber}`; // Ajusta el '1' si el código de país es diferente o ya está incluido.
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

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
                className="h-auto w-200" // Puede que quieras ajustar esto o usar object-contain
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
            {/* FIX: Cambiar href a whatsappUrl y añadir target="_blank" */}
            <Link
              href={whatsappUrl}
              target="_blank" // Abrir WhatsApp en una nueva pestaña/app
              rel="noopener noreferrer" // Buenas prácticas de seguridad para target="_blank"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-white shadow hover:bg-primary-hover h-10 px-6" // FIX: Color de texto blanco
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

      {/* Menú Overlay para Móvil */}
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
                 {/* FIX: Cambiar href a whatsappUrl también en el menú móvil */}
                 <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="mt-8 inline-flex items-center justify-center rounded-md text-xl font-medium transition-colors bg-primary text-white shadow hover:bg-primary-hover h-12 px-8"
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