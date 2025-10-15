// RUTA: src/components/sections/Process.tsx (REEMPLAZO COMPLETO)
'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import { dictionary } from '@/dictionaries/en';

type ProcessDictionary = typeof dictionary.process;

const icons = [
  <Calendar key="1" className="h-10 w-10 text-primary" />,
  <MapPin key="2" className="h-10 w-10 text-primary" />,
  <Sparkles key="3" className="h-10 w-10 text-primary" />,
];

export default function Process({ lang, dictionary }: { lang: 'es' | 'en'; dictionary: ProcessDictionary }) {
  
  const processSteps = [
    {
      icon: icons[0],
      title: dictionary.step1_title,
      description: dictionary.step1_desc,
    },
    {
      icon: icons[1],
      title: dictionary.step2_title,
      description: dictionary.step2_desc,
    },
    {
      icon: icons[2],
      title: dictionary.step3_title,
      description: dictionary.step3_desc,
    },
  ];

  return (
    <section className="py-24 bg-secondary">
      <motion.div
        className="container mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-semibold text-primary uppercase tracking-wider mb-2">
          {dictionary.subtitle}
        </p>
        <h2 className="font-serif text-5xl font-bold text-soft-black mb-16">
          {dictionary.title}
        </h2>
        <div className="grid gap-12 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md mb-6">
                {step.icon}
              </div>
              <h3 className="font-serif text-2xl font-bold text-soft-black mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-16">
          <Button href={`/${lang}/agendar-visita`}>
            {dictionary.button}
          </Button>
        </div>
      </motion.div>
    </section>
  );
}