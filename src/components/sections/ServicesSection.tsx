// RUTA: src/components/sections/ServicesSection.tsx (NUEVO ARCHIVO)
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { dictionary } from '@/dictionaries/en'; // Para inferir el tipo
import { Variants } from 'framer-motion';

type ServicesDictionary = typeof dictionary.services_section;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function ServicesSection({ lang, dictionary }: { lang: 'es' | 'en'; dictionary: ServicesDictionary }) {
  return (
    <motion.section
      className="py-24 bg-soft-black"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 text-center">
        <p className="font-semibold text-primary uppercase tracking-wider mb-2">
          {dictionary.subtitle}
        </p>
        <h2 className="font-serif text-5xl font-bold text-white mb-16">
          {dictionary.title}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {dictionary.services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-gray-900/50 p-8 rounded-lg border border-white/10 text-center flex flex-col items-center transition-all duration-300 hover:border-primary hover:-translate-y-2"
              variants={cardVariants}
              initial="hidden" // No necesitamos 'custom' aquí si el delay se maneja en el whileInView
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              custom={index}
            >
              <Image
                src={`/${service.icon}`}
                alt={`${service.title} icon`}
                width={64}
                height={64}
                className="mb-6"
              />
              <h3 className="text-2xl font-bold font-serif text-white mb-4">
                {service.title}
              </h3>
              <p className="text-gray-400 flex-grow">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <Button href={`/${lang}/services`}>
            {dictionary.button}
          </Button>
        </div>
      </div>
    </motion.section>
  );
}