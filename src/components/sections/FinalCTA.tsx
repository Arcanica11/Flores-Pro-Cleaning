// RUTA: src/components/sections/FinalCTA.tsx (REEMPLAZO COMPLETO)
'use client';

import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { dictionary } from '@/dictionaries/en';

type CtaDictionary = typeof dictionary.cta;

export default function FinalCTA({ lang, dictionary }: { lang: 'es' | 'en'; dictionary: CtaDictionary }) {
  return (
    <section className="relative py-24 bg-gray-800">
      {/* Imagen de fondo con superposición oscura */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: "url('/unsplash-image-BqTsh7ivTB8.webp')" }}
      />
      <div className="absolute inset-0 bg-soft-black/70" />

      <motion.div
        className="container relative mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-serif text-5xl font-bold text-white">
          {dictionary.title}
        </h2>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          {dictionary.description}
        </p>
        <div className="mt-8">
          <Button href={`/${lang}/agendar-visita`} className="!px-10 !py-4 text-lg">
            {dictionary.button}
          </Button>
        </div>
      </motion.div>
    </section>
  );
}