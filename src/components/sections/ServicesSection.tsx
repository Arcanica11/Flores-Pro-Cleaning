// RUTA: src/components/sections/ServicesSection.tsx (ACTUALIZADO con enlaces individuales)
'use client';

import { motion, Variants } from 'framer-motion';
// FIX: Importar Link de next/link para los enlaces de las tarjetas
import Link from 'next/link';
// FIX: Importar el tipo directamente desde el archivo JS para precisión
import { dictionary as enDictType } from '@/dictionaries/en';
import { Sparkles, Home, Construction, Leaf, Truck } from 'lucide-react';

// FIX: Usar typeof para obtener el tipo correcto de la sección de servicios del diccionario inglés
type ServicesDictionary = typeof enDictType.services_section;
// NOTE: Importar también el tipo de la página de servicios para obtener los slugs
type ServicesPageDictionary = typeof enDictType.services_page;

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

const serviceIcons: { [key: string]: React.ReactNode } = {
  "Residential Cleaning": <Home className="h-10 w-10 text-primary" />,
  "Private Homes": <Sparkles className="h-10 w-10 text-primary" />,
  "Post-Construction": <Construction className="h-10 w-10 text-primary" />,
  "Move In / Move Out": <Truck className="h-10 w-10 text-primary" />,
  "Eco-Friendly Cleaning": <Leaf className="h-10 w-10 text-primary" />,
  // Español
  "Limpieza Residencial": <Home className="h-10 w-10 text-primary" />,
  "Casas Privadas": <Sparkles className="h-10 w-10 text-primary" />,
  "Post-Construcción": <Construction className="h-10 w-10 text-primary" />,
  "Múdate Adentro / Afuera": <Truck className="h-10 w-10 text-primary" />, // Corregido: Mudanza Adentro / Afuera -> Múdate Adentro / Afuera
  "Limpieza Ecológica": <Leaf className="h-10 w-10 text-primary" />,
};

// NOTE: Necesitamos mapear los títulos de `services_section` a los slugs de `services_page`
// Esta es una forma simple, asumiendo que el orden y los nombres base coinciden.
// Una solución más robusta buscaría por título si fuera necesario.
const serviceSlugs = [
    'residential-cleaning',
    'private-homes',
    'post-construction',
    'move-in-out',
    'eco-friendly'
];


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
        <p className="font-semibold text-accent uppercase tracking-wider mb-2">
          {dictionary.subtitle}
        </p>
        <h2 className="font-serif text-5xl font-bold text-white mb-16">
          {dictionary.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {dictionary.services.map((service, index) => {
            // FIX: Obtener el slug correspondiente al índice actual
            const slug = serviceSlugs[index];
            return (
              // FIX: Envolver la tarjeta con Link
              <Link href={`/${lang}/services/${slug}`} key={service.title} className="block group">
                <motion.div
                  className="bg-secondary p-6 rounded-lg text-center flex flex-col items-center h-full transition-all duration-300 group-hover:shadow-card-hover group-hover:-translate-y-2" // FIX: Añadido h-full para igualar alturas, movido hover a Link (group-hover)
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  custom={index}
                >
                  <div className="mb-5">
                    {serviceIcons[service.title] || <Sparkles className="h-10 w-10 text-primary" />}
                  </div>
                  <h3 className="text-xl font-bold font-serif text-soft-black mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm flex-grow">
                    {service.description}
                  </p>
                   {/* FIX: Añadir un indicador visual de "Más detalles" */}
                   <span className="mt-4 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                     {lang === 'es' ? 'Ver Detalles' : 'View Details'} &rarr;
                   </span>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* FIX: Botón general eliminado */}
        {/* <div className="mt-16">
           <Button href={`/${lang}/services`}>
            {dictionary.button}
          </Button>
        </div> */}
      </div>
    </motion.section>
  );
}