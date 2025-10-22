// RUTA: src/app/[lang]/page.tsx (SOLO SE AÑADE LA PROP subtitle)

import { getDictionary } from '@/lib/dictionary';
import Hero from '@/components/sections/Hero';
import Testimonial from '@/components/sections/Testimonial';
import Process from '@/components/sections/Process';
import FinalCTA from '@/components/sections/FinalCTA';
import WhyUs from '@/components/sections/WhyUs';
import ServicesSection from '@/components/sections/ServicesSection';

export default async function Home({ params: { lang } }: { params: { lang: 'es' | 'en' } }) {
  const dict = await getDictionary(lang);

  return (
    <main>
      {/* FIX: Pasar el subtítulo al componente Hero */}
      <Hero title={dict.hero.title} subtitle={dict.hero.subtitle} />
      <WhyUs lang={lang} dictionary={dict.why_us} />
      <ServicesSection lang={lang} dictionary={dict.services_section} />
      <Process lang={lang} dictionary={dict.process} />
      <Testimonial lang={lang} dictionary={dict.testimonial} />
      <FinalCTA lang={lang} dictionary={dict.cta} />
    </main>
  );
}