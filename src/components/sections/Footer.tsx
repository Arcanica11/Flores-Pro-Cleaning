// RUTA: src/components/sections/Footer.tsx (REEMPLAZO COMPLETO)
import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/i18n.config';

export default async function Footer({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  const t = dict.footer;

  // Lista de enlaces de navegación completa, como en el sitio anterior
  const navLinks = [
    { name: dict.navbar.home, href: `/${lang}` },
    { name: 'Residential Cleaning', href: `/${lang}/services` }, // Estos pueden apuntar a secciones o páginas específicas más adelante
    { name: 'Private Homes', href: `/${lang}/services` },
    { name: 'Post-Construction', href: `/${lang}/services` },
    { name: dict.navbar.about, href: `/${lang}/about` },
    { name: dict.navbar.book, href: `/${lang}/agendar-visita` },
  ];

  return (
    <footer className="bg-soft-black border-t border-white/10 text-gray-400">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-8">
          
          {/* Columna 1: Logo y Descripción (más ancha) */}
          <div className="space-y-4 lg:col-span-4">
            <Link href={`/${lang}`}>
              <Image 
                src="/floresLogoWeb.png" 
                alt="Flores Pro-Cleaning Logo" 
                width={180} 
                height={45} 
                className="opacity-90"
              />
            </Link>
            <p className="text-sm pr-8">{t.description}</p>
          </div>

          {/* Columna 2: Horarios */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-white mb-4 uppercase tracking-wider">{t.hours_title}</h3>
            <p className="text-sm" dangerouslySetInnerHTML={{ __html: t.hours_content }} />
          </div>
          
          {/* Columna 3: Contacto */}
          <div className="lg:col-span-3">
             <h3 className="font-semibold text-white mb-4 uppercase tracking-wider">CONTACT</h3>
             <ul className="space-y-2 text-sm">
                <li><a href={`mailto:${t.contact_email}`} className="hover:text-primary transition-colors">{t.contact_email}</a></li>
                <li><a href={`tel:${t.contact_phone}`} className="hover:text-primary transition-colors">{t.contact_phone}</a></li>
             </ul>
          </div>
          
          {/* Columna 4: Navegación */}
           <div className="lg:col-span-3">
            <h3 className="font-semibold text-white mb-4 uppercase tracking-wider">{t.navigation_title}</h3>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Línea final de créditos que solicitaste */}
      <div className="bg-black py-4">
        <div className="container mx-auto px-4 text-center text-xs text-gray-500 flex flex-col sm:flex-row justify-between">
           <span>{t.copyright}</span>
           <span>{t.credits}</span>
        </div>
      </div>
    </footer>
  );
}