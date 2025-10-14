import { getDictionary } from '@/lib/dictionary';
import { Locale } from '../../../i18n.config';
import Hero from '@/components/sections/Hero';
import ServicesShowcase from '@/components/sections/ServicesShowcase';
import Testimonial from '@/components/sections/Testimonial';
import Process from '@/components/sections/Process';
import FinalCTA from '@/components/sections/FinalCTA';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang);

  return (
    <main>
      <Hero title={dict.hero.title} />
      <ServicesShowcase lang={lang} />
      <Testimonial lang={lang} />
      <Process lang={lang} />
      <FinalCTA lang={lang} />
    </main>
  );
}