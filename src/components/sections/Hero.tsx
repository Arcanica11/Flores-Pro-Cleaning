// RUTA: src/components/sections/Hero.tsx (RESTAURADO + lang + DISEÑO OSCURO)
'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/i18n.config'; // Necesario para 'lang'

// FIX: Props que coinciden con page.tsx + lang añadido
type HeroProps = {
  lang: Locale;
  title: string | undefined; // Usar undefined por si no llega del diccionario
  subtitle?: string | undefined; // Usar undefined por si no llega del diccionario
};

// --- Animaciones ---
const containerVariants: Variants = { /* ... (igual que antes) ... */ };
const letterVariants: Variants = { /* ... (igual que antes) ... */ }; // Renombrado de itemVariants
const subtitleVariants: Variants = { /* ... (igual que antes) ... */ };
const buttonVariants: Variants = { /* ... (añadido) ... */
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 1.0, // Delay después del subtítulo
            duration: 0.8,
            ease: 'easeOut',
        },
    },
};
// --- Fin Animaciones ---


// FIX: Recibir lang, title, subtitle
export default function Hero({ lang, title, subtitle }: HeroProps) {

  // Texto y enlace del botón (usa 'lang')
  const buttonText = lang === 'es' ? 'Agendar Visita' : 'Book Visit';
  const buttonLink = `/${lang}/agendar-visita`;

  // Usar directamente las props o un fallback simple
  const displayTitle = title ?? " "; // Fallback para evitar error si es undefined
  const displaySubtitle = subtitle;

  const words = typeof displayTitle === 'string' ? displayTitle.split(' ') : [];

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] md:min-h-screen bg-soft-black flex items-center justify-start text-white overflow-hidden">
      {/* Imagen de Fondo */}
      <Image
        src="/unsplash-image-U39FPHKfDu0.webp"
        alt="Flores Pro-Cleaning Hero Background"
        fill
        priority
        className="object-cover object-center z-0 brightness-75" // Diseño oscuro
      />

      {/* Overlay con degradado oscuro */}
      <div
        className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/40 to-transparent lg:from-black/80 lg:via-black/50 lg:to-transparent" // Diseño oscuro
        aria-hidden="true"
       />

      {/* Contenido del Hero */}
      <div className="container relative z-20 mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 py-16 text-left">
        {/* Título Animado */}
        <motion.h1
          key={displayTitle} // Key para reanimación
          // FIX: Quitado whitespace-nowrap para ajuste móvil
          className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-4 md:mb-6 leading-tight max-w-3xl min-h-[2em]" // Texto blanco
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label={displayTitle}
        >
          {displayTitle !== " " ? words.map((word, i) => (
            // FIX: Quitado whitespace-nowrap
            <span key={i} className="inline-block mr-3 lg:mr-4">
              {word.split('').map((char, j) => (
                <motion.span key={j} className="inline-block" variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
            </span>
          )) : <>&nbsp;</>}
        </motion.h1>

        {/* Párrafo (Subtítulo) */}
        {displaySubtitle && (
          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl" // Texto claro
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
          >
            {displaySubtitle}
          </motion.p>
        )}

        {/* Botón CTA */}
        {/* FIX: Botón visible */}
        <motion.div
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
        >
          <Link
             href={buttonLink}
             className="inline-flex items-center justify-center rounded-md text-base font-medium transition-colors bg-primary text-white shadow hover:bg-primary-hover h-12 px-8"
           >
             {buttonText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}