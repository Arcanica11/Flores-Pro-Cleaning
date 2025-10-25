// RUTA: src/components/sections/Navbar.tsx (ACTUALIZADO con Dropdown)
'use client';

import { useState, useEffect, useRef } from 'react'; // NOTE: Añadido useRef
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react'; // NOTE: Añadido ChevronDown
import type { Locale } from '@/i18n.config';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { dictionary as enDictType } from '@/dictionaries/en';

// NOTE: Usar el tipo del diccionario completo
type FullDictionary = typeof enDictType;
type NavbarDictionary = FullDictionary['navbar'];
type FooterDictionary = FullDictionary['footer'];
// NOTE: Tipo para la sección de servicios, necesario para obtener los slugs y títulos
type ServicesPageDictionary = FullDictionary['services_page'];

export default function Navbar({ lang, dictionary, footerDictionary, servicesDictionary }: { // NOTE: Añadida prop servicesDictionary
  lang: Locale;
  dictionary: NavbarDictionary;
  footerDictionary: FooterDictionary;
  servicesDictionary: ServicesPageDictionary; // NOTE: Tipo para los datos de servicios
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // Estado para menú móvil
  const [isServicesOpen, setIsServicesOpen] = useState(false); // FIX: Estado para dropdown de servicios (desktop)
  const [hasScrolled, setHasScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // FIX: Ref para detectar clics fuera

  const isHomePage = pathname === `/${lang}`;

  // NOTE: Efecto para detectar scroll (sin cambios)
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // NOTE: Efecto para overflow del body en menú móvil (sin cambios)
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  // FIX: Efecto para cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);


  // FIX: Enlaces principales sin "Services"
  const mainNavLinks = [
    { name: dictionary.home, href: `/${lang}` },
    // { name: dictionary.services, href: `/${lang}/services` }, // Eliminado de aquí
    { name: dictionary.about, href: `/${lang}/about` },
  ];

  // FIX: Obtener enlaces de servicios desde servicesDictionary
  const serviceNavLinks = servicesDictionary.services.map(service => ({
    name: service.title,
    href: `/${lang}/services/${service.slug}`
  }));

  const headerClasses = `fixed top-0 z-50 w-full transition-colors duration-300 ${
    hasScrolled || !isHomePage
      ? 'bg-soft-black/90 backdrop-blur-sm border-b border-white/10'
      : 'bg-transparent'
  }`;

  // NOTE: Lógica de WhatsApp (sin cambios)
  const rawPhoneNumber = footerDictionary.contact_phone;
  const cleanedPhoneNumber = rawPhoneNumber.replace(/\D/g, '');
  const whatsappNumber = `1${cleanedPhoneNumber}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <>
      <header className={headerClasses}>
        <div className="container mx-auto flex h-20 items-center justify-between px-4">

          {/* Logo */}
          <div className="flex-1 flex justify-start">
             {/* ... (sin cambios) ... */}
             <Link href={`/${lang}`} className="z-50 flex-shrink-0">
               <Image
                 src="/floresLogoWeb.png"
                 alt="Flores Pro-Cleaning Logo"
                 width={160}
                 height={46}
                 className="h-auto"
                 priority
               />
             </Link>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden lg:flex flex-1 justify-center items-center gap-8 text-sm relative" ref={dropdownRef}> {/* FIX: Añadido relative y ref */}
            {mainNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="transition-colors hover:text-white text-gray-300 font-medium uppercase tracking-wider"
              >
                {link.name}
              </Link>
            ))}
            {/* FIX: Botón para desplegar Servicios */}
            <div className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center transition-colors hover:text-white text-gray-300 font-medium uppercase tracking-wider"
              >
                {dictionary.services}
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {/* FIX: Dropdown Menu */}
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 bg-soft-black border border-white/10 rounded-md shadow-lg py-1 z-50"
                  >
                    {serviceNavLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsServicesOpen(false)} // Cerrar al hacer clic
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white whitespace-nowrap" // FIX: Estilos dropdown
                      >
                        {link.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Acciones Derecha (Desktop) */}
          <div className="hidden lg:flex flex-1 justify-end items-center gap-4">
            {/* ... (LanguageSwitcher y Book Visit sin cambios) ... */}
            <LanguageSwitcher />
            {/* <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-white shadow hover:bg-primary-hover h-10 px-6"
            >
              {dictionary.book}
            </Link> */}
          </div>

          {/* Botón Menú Móvil */}
          <div className="lg:hidden z-50">
             {/* ... (sin cambios) ... */}
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
            // ... (animación overlay sin cambios) ...
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg lg:hidden"
          >
            <motion.div
              // ... (animación contenido overlay sin cambios) ...
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center h-full pt-20 overflow-y-auto" // FIX: Añadido padding top y overflow
            >
              <nav className="flex flex-col items-center gap-6 text-center"> {/* FIX: Reducido gap */}
                {/* Enlaces Principales */}
                {mainNavLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-3xl font-semibold text-gray-300 transition-colors hover:text-white"
                  >
                    {link.name}
                  </Link>
                ))}
                {/* FIX: Título Servicios (no clickeable) y lista de servicios */}
                 <span className="text-3xl font-semibold text-gray-500 mt-2"> {/* Título no clickeable */}
                   {dictionary.services}
                 </span>
                 <div className="flex flex-col items-center gap-4 mt-1 mb-4"> {/* Contenedor para sub-enlaces */}
                    {serviceNavLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-xl font-medium text-gray-400 transition-colors hover:text-white" // Tamaño menor para sub-enlaces
                      >
                        {link.name}
                      </Link>
                    ))}
                 </div>
                 {/* Botón Book Visit y Language Switcher */}
                  {/* <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="mt-4 inline-flex items-center justify-center rounded-md text-xl font-medium transition-colors bg-primary text-white shadow hover:bg-primary-hover h-12 px-8" // FIX: Reducido margen superior
                  >
                    {dictionary.book}
                  </Link> */}
                <div className="mt-6"> {/* FIX: Reducido margen superior */}
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