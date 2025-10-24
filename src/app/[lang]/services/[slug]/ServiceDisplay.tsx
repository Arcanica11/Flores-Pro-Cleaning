// RUTA: src/app/[lang]/services/[slug]/ServiceDisplay.tsx (REDISEÑADO)
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Locale } from '@/i18n.config';
import type { ServiceData } from './ServiceDetails'; // Asegúrate que el tipo se exporte
import ServiceDetailsContent from './ServiceDetails';

type ServiceDisplayProps = {
  lang: Locale;
  serviceData: ServiceData;
  imageUrl: string;
};

export default function ServiceDisplay({ lang, serviceData, imageUrl }: ServiceDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const buttonText = isExpanded
    ? (lang === 'es' ? 'Leer Menos' : 'Read Less')
    : (lang === 'es' ? 'Leer Más' : 'Read More');
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div>
      {/* Sección Inicial: Imagen + Resumen + Botón */}
      {/* FIX: Aumentado padding horizontal significativamente en pantallas grandes (lg:px-16 xl:px-24) */}
      <section className="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Columna de Imagen Principal con Elemento Decorativo */}
          {/* FIX: Añadido 'relative' y un div::before para el fondo decorativo */}
          <div className="relative">
            {/* Elemento Decorativo */}
            <div className="absolute -inset-4 sm:-inset-6 bg-secondary rounded-lg z-0 hidden lg:block" aria-hidden="true" />
             {/* Contenedor de la Imagen */}
            <div className="relative h-80 md:h-[500px] w-full rounded-lg overflow-hidden shadow-xl z-10"> {/* Añadido z-10 */}
              <Image
                src={imageUrl}
                alt={serviceData.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Columna de Descripción Breve y Botón */}
          <div className="flex flex-col">
            {serviceData.hero_description && (
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {serviceData.hero_description}
              </p>
            )}
            {/* Botón "Leer Más" */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              // FIX: Estilo refinado para el botón
              className="mt-4 inline-flex items-center self-start px-8 py-3 bg-white hover:bg-gray-50 text-primary font-semibold text-center transition-colors border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              aria-expanded={isExpanded}
            >
              {buttonText}
              <ButtonIcon className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Sección para el Contenido Detallado Expandible */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.section
            key="details-section"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto', marginTop: 0 },
              collapsed: { opacity: 0, height: 0, marginTop: 0 }
            }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            {/* FIX: Mantenido padding aumentado aquí también (lg:px-16 xl:px-24) */}
            <div className="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 pb-16 md:pb-24 pt-8">
               <ServiceDetailsContent lang={lang} serviceData={serviceData} />
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}