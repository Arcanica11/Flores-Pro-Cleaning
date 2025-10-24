// RUTA: src/app/[lang]/page.tsx (CORREGIDO Y COMPLETO)

import { getDictionary } from '@/lib/dictionary';
import Hero from '@/components/sections/Hero';
import Testimonial from '@/components/sections/Testimonial';
import Process from '@/components/sections/Process';
import FinalCTA from '@/components/sections/FinalCTA';
import WhyUs from '@/components/sections/WhyUs';
import ServicesSection from '@/components/sections/ServicesSection';
import type { Locale } from '@/i18n.config';
// FIX: Importar 'i18n' de la configuración
import { i18n } from '@/i18n.config';
// FIX: Importar 'redirect' de next/navigation
import { redirect } from 'next/navigation';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  
  // Validar 'lang' antes de buscar el diccionario
  if (!i18n.locales.includes(lang)) {
     // Si el 'lang' en la URL no es válido (ej. /fr), redirigir al default
     redirect(`/${i18n.defaultLocale}`);
     return null; 
  }

  const dict = await getDictionary(lang);

  // Definir datos de forma segura
  const heroData = dict?.hero;
  const whyUsData = dict?.why_us;
  const servicesSectionData = dict?.services_section;
  const processData = dict?.process;
  const testimonialData = dict?.testimonial;
  const ctaData = dict?.cta;

  return (
    <main>
      {/* Pasar 'lang', 'title' y 'subtitle' a Hero */}
      <Hero lang={lang} title={heroData?.title} subtitle={heroData?.subtitle} />

      {/* Renderizar otras secciones de forma segura */}
      {whyUsData && <WhyUs lang={lang} dictionary={whyUsData} />}
      {servicesSectionData && <ServicesSection lang={lang} dictionary={servicesSectionData} />}
      {processData && <Process lang={lang} dictionary={processData} />}
      {testimonialData && <Testimonial lang={lang} dictionary={testimonialData} />}
      {ctaData && <FinalCTA lang={lang} dictionary={ctaData} />}
    </main>
  );
}