// RUTA: src/components/sections/Testimonial.tsx (REEMPLAZO COMPLETO)
'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react'; // Usaremos un ícono para la cita
import { dictionary } from '@/dictionaries/en';

type TestimonialDictionary = typeof dictionary.testimonial;

export default function Testimonial({ lang, dictionary }: { lang: 'es' | 'en'; dictionary: TestimonialDictionary }) {
  return (
    <section className="py-24 bg-soft-black">
      <motion.div
        className="container mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Quote className="mx-auto h-12 w-12 text-primary mb-6" />
        <blockquote className="max-w-3xl mx-auto">
          <p className="font-serif text-3xl md:text-4xl font-medium text-white leading-tight">
            &quot;{dictionary.text}&quot;
          </p>
          <footer className="mt-8 font-sans text-lg text-gray-400">
            - {dictionary.author}
          </footer>
        </blockquote>
      </motion.div>
    </section>
  );
}