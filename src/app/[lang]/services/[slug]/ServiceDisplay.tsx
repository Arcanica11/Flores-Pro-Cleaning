// RUTA: src/app/[lang]/services/[slug]/ServiceDisplay.tsx (AÑADIR TELÉFONO ANTES DEL BOTÓN)
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
// FIX: Importar Phone
import { ChevronDown, ChevronUp, Phone } from 'lucide-react';
import type { Locale } from '@/i18n.config';
import type { ServiceData } from './ServiceDetails';
import ServiceDetailsContent from './ServiceDetails';

type ServiceDisplayProps = {
  lang: Locale;
  serviceData: ServiceData;
  imageUrl: string;
  // FIX: Necesitamos el número de teléfono aquí
  phoneNumber: string;
};

export default function ServiceDisplay({ lang, serviceData, imageUrl, phoneNumber }: ServiceDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const buttonText = isExpanded ? (lang === 'es' ? 'Leer Menos' : 'Read Less') : (lang === 'es' ? 'Leer Más' : 'Read More');
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;
  const telLink = `tel:+1${phoneNumber.replace(/\D/g, '')}`;

  // Texto para la llamada a la acción
  const callPrompt = lang === 'es' ? 'O comuníquese con nosotros:' : 'Or contact us at:';


  return (
    <div>
      {/* Sección Inicial: Imagen + Resumen + Botón */}
      <section className="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Columna de Imagen Principal con Elemento Decorativo */}
          <div className="relative">
             <div className="absolute -inset-4 sm:-inset-6 bg-secondary rounded-lg z-0 hidden lg:block" aria-hidden="true" />
             <div className="relative h-80 md:h-[500px] w-full rounded-lg overflow-hidden shadow-xl z-10">
               <Image src={imageUrl} alt={serviceData.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
             </div>
          </div>

          {/* Columna de Descripción Breve, Teléfono y Botón */}
          <div className="flex flex-col">
            {serviceData.hero_description && (
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {serviceData.hero_description}
              </p>
            )}

            {/* FIX: Añadir sección de contacto con teléfono */}
            <div className="my-6 pt-6 border-t border-gray-200">
                <p className="text-md text-gray-600 mb-2">{callPrompt}</p>
                <a href={telLink} className="inline-flex items-center text-xl font-semibold text-primary hover:text-primary-hover transition-colors">
                    <Phone className="h-5 w-5 mr-2" />
                    {phoneNumber}
                </a>
            </div>

            {/* Botón "Leer Más" */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-6 inline-flex items-center self-start px-8 py-3 bg-white hover:bg-gray-50 text-primary font-semibold text-center transition-colors border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
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
        {isExpanded && ( <motion.section /* ... (sin cambios) ... */ > <div className="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 pb-16 md:pb-24 pt-8"> <ServiceDetailsContent lang={lang} serviceData={serviceData} /> </div> </motion.section> )}
      </AnimatePresence>
    </div>
  );
}