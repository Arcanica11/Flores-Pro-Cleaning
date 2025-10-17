// RUTA: src/components/sections/ServicesSection.tsx (REEMPLAZO COMPLETO)
'use client';

import { motion, Variants } from 'framer-motion';
import Button from '../ui/Button';
import { dictionary } from '@/dictionaries/en'; // Para inferir el tipo
import { Sparkles, Construction, Leaf } from 'lucide-react'; // NOTE: Usamos iconos de Lucide para consistencia

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

// NOTE: Mapeo de iconos a los títulos de los servicios para flexibilidad
const serviceIcons: { [key: string]: React.ReactNode } = {
  "Residential Cleaning": <Sparkles className="h-10 w-10 text-primary" />,
  "Post-Construction": <Construction className="h-10 w-10 text-primary" />,
  "Eco-Friendly Cleaning": <Leaf className="h-10 w-10 text-primary" />,
};

export default function ServicesSection({ lang, dictionary }: { lang: 'es' | 'en'; dictionary: ServicesDictionary }) {
  return (
    // FIX: Fondo cambiado a marrón primario y texto a blanco para alto contraste
    <motion.section
      className="py-24 bg-soft-black"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 text-center">
        <p className="font-semibold text-accent uppercase tracking-wider mb-2">
          {dictionary.subtitle}
        </p>
        <h2 className="font-serif text-5xl font-bold text-white mb-16">
          {dictionary.title}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {dictionary.services.map((service, index) => (
            <motion.div
              key={service.title}
              // FIX: Tarjetas con fondo claro (secondary) y texto oscuro para contraste
              className="bg-secondary p-8 rounded-lg text-center flex flex-col items-center transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              custom={index}
            >
              <div className="mb-6">
                {serviceIcons[service.title] || <Sparkles className="h-10 w-10 text-primary" />}
              </div>
              <h3 className="text-2xl font-bold font-serif text-soft-black mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 flex-grow">
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