import Button from '../ui/Button';
import { getDictionary } from '@/lib/dictionary';

type FinalCTAProps = {
  lang: 'es' | 'en';
};

export default async function FinalCTA({ lang }: FinalCTAProps) {
  const dict = await getDictionary(lang);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-serif text-5xl font-bold text-primary">
          {dict.cta.title}
        </h2>
        <div className="mt-8">
          <Button href={`/${lang}/agendar-visita`}>
            {dict.cta.button}
          </Button>
        </div>
      </div>
    </section>
  );
}