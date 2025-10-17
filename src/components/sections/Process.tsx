// RUTA: src/components/sections/Process.tsx (REEMPLAZO COMPLETO)
'use client';

import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { dictionary } from '@/dictionaries/en';

type ProcessDictionary = typeof dictionary.process;

export default function Process({ lang, dictionary }: { lang: 'es' | 'en'; dictionary: ProcessDictionary }) {
  
  // NOTE: El texto ahora viene del diccionario, que hemos actualizado con el contenido del PDF.
  const processSteps = [
    {
      title: dictionary.step1_title,
      description: dictionary.step1_desc,
    },
    {
      title: dictionary.step2_title,
      description: dictionary.step2_desc,
    },
    {
      title: dictionary.step3_title,
      description: dictionary.step3_desc,
    },
  ];

  return (
    // FIX: Fondo oscuro y texto claro para coincidir con el diseño de referencia.
    <section className="py-24 bg-soft-black">
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Columna Izquierda: Título y CTA */}
          <div className="text-left">
            <p className="font-semibold text-accent uppercase tracking-wider mb-2">
              {dictionary.subtitle}
            </p>
            <h2 className="font-serif text-5xl font-bold text-white mb-8">
              {dictionary.title}
            </h2>
            <Button href={`/${lang}/agendar-visita`}>
              {dictionary.button}
            </Button>
          </div>

          {/* Columna Derecha: Pasos */}
          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-left border-b border-gray-700 pb-6">
                <h3 className="font-serif text-2xl font-bold text-white mb-3">
                  {`${index + 1}. ${step.title}`}
                </h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}