// RUTA: src/components/sections/ServicesSection.tsx (REEMPLAZO COMPLETO)
'use client';

import { motion, Variants } from 'framer-motion';
import Button from '../ui/Button';
// FIX: Importar el tipo directamente desde el archivo JS para precisión
import { dictionary as enDictType } from '@/dictionaries/en';
import { Sparkles, Home, Construction, Leaf, Truck } from 'lucide-react'; // NOTE: Importamos algunos iconos relevantes

// FIX: Usar typeof para obtener el tipo correcto de la sección de servicios del diccionario inglés
type ServicesDictionary = typeof enDictType.services_section;

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

// NOTE: Mapeo de iconos más robusto basado en títulos (ajustar si es necesario)
// Se usan iconos de Lucide para consistencia. Añadí algunos más.
const serviceIcons: { [key: string]: React.ReactNode } = {
  "Residential Cleaning": <Home className="h-10 w-10 text-primary" />,
  "Private Homes": <Sparkles className="h-10 w-10 text-primary" />, // Usando Sparkles para lujo
  "Post-Construction": <Construction className="h-10 w-10 text-primary" />,
  "Move In / Move Out": <Truck className="h-10 w-10 text-primary" />, // Icono de mudanza
  "Eco-Friendly Cleaning": <Leaf className="h-10 w-10 text-primary" />,
  // Español (asegúrate que las llaves coincidan EXACTAMENTE con los títulos en es.js)
  "Limpieza Residencial": <Home className="h-10 w-10 text-primary" />,
  "Casas Privadas": <Sparkles className="h-10 w-10 text-primary" />,
  "Post-Construcción": <Construction className="h-10 w-10 text-primary" />,
  "Múdate Adentro / Afuera": <Truck className="h-10 w-10 text-primary" />,
  "Limpieza Ecológica": <Leaf className="h-10 w-10 text-primary" />,
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
        <p className="font-semibold text-accent uppercase tracking-wider mb-2">
          {dictionary.subtitle}
        </p>
        <h2 className="font-serif text-5xl font-bold text-white mb-16">
          {dictionary.title}
        </h2>

        {/* FIX: Ajustado a grid-cols-5 en lg y reducido el gap */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {dictionary.services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-secondary p-6 rounded-lg text-center flex flex-col items-center transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2" // FIX: Padding reducido un poco
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              custom={index}
            >
              <div className="mb-5">
                {/* FIX: Usar el mapeo de iconos; fallback a Sparkles si no se encuentra */}
                {serviceIcons[service.title] || <Sparkles className="h-10 w-10 text-primary" />}
              </div>
              <h3 className="text-xl font-bold font-serif text-soft-black mb-3"> {/* FIX: Tamaño de fuente ajustado */}
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm flex-grow"> {/* FIX: Tamaño de fuente ajustado */}
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
           {/* FIX: El botón ahora redirige a la página de servicios principal */}
          <Button href={`/${lang}/services`}>
            {dictionary.button}
          </Button>
        </div>
      </div>
    </motion.section>
  );
}