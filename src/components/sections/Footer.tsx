// RUTA: src/components/sections/Footer.tsx (CORREGIDO - Enlaces de Servicios)
import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/i18n.config';

export default async function Footer({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  const t = dict.footer;
  // NOTE: Acceder a los datos de servicios para obtener slugs
  const servicesData = dict.services_page.services;

  // FIX: Crear mapa de Título -> Slug para buscar fácilmente
  const serviceSlugMap = servicesData.reduce((map, service) => {
    map[service.title] = service.slug;
    return map;
  }, {} as Record<string, string>);

  // FIX: Mapear títulos en español/inglés a sus contrapartes en inglés (claves del mapa) si es necesario,
  // O buscar directamente en servicesData por título localizado si el diccionario es consistente.
  // Asumiremos que los títulos en navLinks coinciden con los títulos en servicesData para el idioma actual.

  // Lista de enlaces de navegación con hrefs corregidos
  const navLinks = [
    { name: dict.navbar.home, href: `/${lang}` },
    // FIX: Buscar slug basado en el título del diccionario para cada servicio
    { name: servicesData.find(s => s.slug === 'residential-cleaning')?.title || 'Residential', href: `/${lang}/services/residential-cleaning` },
    { name: servicesData.find(s => s.slug === 'private-homes')?.title || 'Private Homes', href: `/${lang}/services/private-homes` },
    { name: servicesData.find(s => s.slug === 'post-construction')?.title || 'Post-Construction', href: `/${lang}/services/post-construction` },
    { name: servicesData.find(s => s.slug === 'move-in-out')?.title || 'Move In / Out', href: `/${lang}/services/move-in-out` }, // Añadir más si es necesario (Eco-Friendly?)
    { name: dict.navbar.about, href: `/${lang}/about` },
    { name: dict.navbar.book, href: `/${lang}/agendar-visita` },
  ];

  return (
    <footer className="bg-soft-black border-t border-white/10 text-gray-400">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-8">

          {/* Columna 1: Logo y Descripción */}
          <div className="space-y-4 lg:col-span-4">
            <Link href={`/${lang}`}>
              <Image
                src="/floresLogoWeb.png" // Asegúrate que la ruta del logo sea correcta
                alt="Flores Pro-Cleaning Logo"
                width={180}
                height={45} // Ajusta si es necesario
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
             <h3 className="font-semibold text-white mb-4 uppercase tracking-wider">CONTACT</h3> {/* Podría venir del diccionario */}
             <ul className="space-y-2 text-sm">
                <li><a href={`mailto:${t.contact_email}`} className="hover:text-primary transition-colors">{t.contact_email}</a></li>
                <li><a href={`tel:+1${t.contact_phone.replace(/\D/g, '')}`} className="hover:text-primary transition-colors">{t.contact_phone}</a></li> {/* FIX: Añadir prefijo tel:+1 */}
             </ul>
          </div>

          {/* Columna 4: Navegación */}
           <div className="lg:col-span-3">
            <h3 className="font-semibold text-white mb-4 uppercase tracking-wider">{t.navigation_title}</h3>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {/* FIX: Usar Link de Next para navegación interna */}
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Línea final de créditos */}
      <div className="bg-black py-4">
        <div className="container mx-auto px-4 text-center text-xs text-gray-500 flex flex-col sm:flex-row justify-between">
           <span>{t.copyright}</span>
           <span>{t.credits}</span> {/* Asegúrate que t.credits tenga valor si quieres mostrar algo */}
        </div>
      </div>
    </footer>
  );
}