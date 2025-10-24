// RUTA: src/app/[lang]/page.tsx (COMPLETO - PASAR 'lang' A HERO)

import { getDictionary } from '@/lib/dictionary';
import Hero from '@/components/sections/Hero';
import Testimonial from '@/components/sections/Testimonial';
import Process from '@/components/sections/Process';
import FinalCTA from '@/components/sections/FinalCTA';
import WhyUs from '@/components/sections/WhyUs';
import ServicesSection from '@/components/sections/ServicesSection';
import type { Locale } from '@/i18n.config'; // Importar Locale

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) { // Usar Locale
  const dict = await getDictionary(lang);

  const heroData = dict?.hero;
  const whyUsData = dict?.why_us;
  const servicesSectionData = dict?.services_section;
  const processData = dict?.process;
  const testimonialData = dict?.testimonial;
  const ctaData = dict?.cta;

  return (
    <main>
      {/* FIX: Pasar 'lang', 'title' y 'subtitle' */}
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