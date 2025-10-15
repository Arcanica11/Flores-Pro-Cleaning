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
      <Hero title={dict.hero.title} />
      <WhyUs lang={lang} dictionary={dict.why_us} />
      <ServicesSection lang={lang} dictionary={dict.services_section} />
      <Process lang={lang} dictionary={dict.process} />
      <Testimonial lang={lang} />
      <FinalCTA lang={lang} />
    </main>
  );
}