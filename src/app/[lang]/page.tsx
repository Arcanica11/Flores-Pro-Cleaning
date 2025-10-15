import { getDictionary } from '@/lib/dictionary';
import Hero from '@/components/sections/Hero';
import Testimonial from '@/components/sections/Testimonial';
import Process from '@/components/sections/Process';
import FinalCTA from '@/components/sections/FinalCTA';
import WhyUs from '@/components/sections/WhyUs';
import ServicesSection from '@/components/sections/ServicesSection'; // <-- 1. Importar la nueva sección

export default async function Home({ params: { lang } }: { params: { lang: 'es' | 'en' } }) {
  const dict = await getDictionary(lang);

  return (
    <main>
      <Hero title={dict.hero.title} />
      {/* 2. Reorganizamos el orden de las secciones para un mejor flujo narrativo */}
      <WhyUs lang={lang} dictionary={dict.why_us} />
      <ServicesSection lang={lang} dictionary={dict.services_section} />
      <Process lang={lang} />
      <Testimonial lang={lang} />
      <FinalCTA lang={lang} />
    </main>
  );
}