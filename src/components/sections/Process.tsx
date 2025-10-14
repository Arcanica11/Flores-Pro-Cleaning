import { Calendar, MapPin, Sparkles } from 'lucide-react';
import { getDictionary } from '@/lib/dictionary';

type ProcessProps = {
  lang: 'es' | 'en';
};

export default async function Process({ lang }: ProcessProps) {
  const dict = await getDictionary(lang);

  const processSteps = [
    {
      icon: <Calendar className="h-12 w-12 text-primary" />,
      title: dict.process.step1_title,
      description: dict.process.step1_desc,
    },
    {
      icon: <MapPin className="h-12 w-12 text-primary" />,
      title: dict.process.step2_title,
      description: dict.process.step2_desc,
    },
    {
      icon: <Sparkles className="h-12 w-12 text-primary" />,
      title: dict.process.step3_title,
      description: dict.process.step3_desc,
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-center font-serif text-5xl font-bold text-primary">
          {dict.process.title}
        </h2>
        <div className="mt-12 grid gap-12 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center">{step.icon}</div>
              <h3 className="mt-6 font-serif text-2xl font-bold text-soft-black">
                {step.title}
              </h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}