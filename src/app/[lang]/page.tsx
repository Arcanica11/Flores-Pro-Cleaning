import { getDictionary } from '@/lib/dictionary';
import Hero from '@/components/sections/Hero';
import Testimonial from '@/components/sections/Testimonial';
import Process from '@/components/sections/Process';
import FinalCTA from '@/components/sections/FinalCTA';
import WhyUs from '@/components/sections/WhyUs'; // <-- 1. Importar el nuevo componente

export default async function Home({ params: { lang } }: { params: { lang: 'es' | 'en' } }) {
  const dict = await getDictionary(lang);

  return (
    <main>
      <Hero title={dict.hero.title} />
      <WhyUs lang={lang} dictionary={dict.why_us} />
      <Testimonial lang={lang} />
      <Process lang={lang} />
      <FinalCTA lang={lang} />
    </main>
  );
}