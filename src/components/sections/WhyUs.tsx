// RUTA: src/components/sections/WhyUs.tsx (NUEVO ARCHIVO)
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '../ui/Button'; // Usamos nuestro nuevo botón elegante
import { dictionary } from '@/dictionaries/en'; // Para inferir el tipo

type WhyUsDictionary = typeof dictionary.why_us;

export default function WhyUs({ lang, dictionary }: { lang: 'es' | 'en'; dictionary: WhyUsDictionary }) {
  return (
    <motion.section 
      className="py-24 bg-secondary"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Columna de la Imagen */}
          <motion.div 
            className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src="/unsplash-image-VKQzgxJEsJU.webp" // Una imagen elegante que ya tienes
              alt="Interior de una casa limpia y moderna"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
          {/* Columna del Texto */}
          <div className="text-left">
            <p className="font-semibold text-primary uppercase tracking-wider mb-2">
              {dictionary.subtitle}
            </p>
            <h2 className="font-serif text-5xl font-bold text-soft-black mb-6">
              {dictionary.title}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              {dictionary.description}
            </p>
            <Button href={`/${lang}/services`}>
              {dictionary.button}
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}