// RUTA: src/components/sections/Hero.tsx (RESTAURADO Y CORREGIDO)
'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/i18n.config'; // Necesario para 'lang'

// FIX: Definición de props que coincide con page.tsx + lang
type HeroProps = {
  lang: Locale;
  title: string | undefined;
  subtitle?: string | undefined;
};

// --- Animaciones ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            damping: 12,
            stiffness: 100,
        },
    },
};

const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.8,
            duration: 0.8,
            ease: 'easeOut',
        },
    },
};

const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 1.0,
            duration: 0.8,
            ease: 'easeOut',
        },
    },
};
// --- Fin Animaciones ---


// FIX: Recibir lang, title, subtitle directamente
export default function Hero({ lang, title, subtitle }: HeroProps) {

  // FIX: Usar directamente las props o un fallback simple si son undefined
  const displayTitle = title ?? " "; // Usar espacio para fallback inicial
  const displaySubtitle = subtitle;

  // Texto y enlace del botón
  const buttonText = lang === 'es' ? 'Agendar Visita' : 'Book Visit';
  const buttonLink = `/${lang}/agendar-visita`;

  // Dividir título (solo si es string)
  const words = typeof displayTitle === 'string' ? displayTitle.split(' ') : [];

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] md:min-h-screen bg-soft-black flex items-center justify-start text-white overflow-hidden">
      {/* Imagen de Fondo */}
      <Image
        src="/unsplash-image-U39FPHKfDu0.webp"
        alt="Flores Pro-Cleaning Hero Background"
        fill
        priority
        className="object-cover object-center z-0 brightness-75"
      />

      {/* Overlay con degradado oscuro */}
      <div
        className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/40 to-transparent lg:from-black/80 lg:via-black/50 lg:to-transparent"
        aria-hidden="true"
       />

      {/* Contenido del Hero */}
      <div className="container relative z-20 mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 py-16 text-left">
        {/* Título Animado */}
        <motion.h1
          key={displayTitle} // Key para reanimación si cambia el idioma
          // FIX: Quitado whitespace-nowrap para ajuste móvil
          className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-4 md:mb-6 leading-tight max-w-3xl min-h-[2em]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label={displayTitle}
        >
          {/* FIX: Renderizar solo si displayTitle no es solo un espacio */}
          {displayTitle !== " " ? words.map((word, i) => (
            <span key={i} className="inline-block mr-3 lg:mr-4"> {/* Quitado whitespace-nowrap */}
              {word.split('').map((char, j) => (
                <motion.span key={j} className="inline-block" variants={itemVariants}>
                  {char}
                </motion.span>
              ))}
            </span>
          )) : <>&nbsp;</>} {/* Espacio reservado si aún no hay título */}
        </motion.h1>

        {/* Párrafo (Subtítulo) */}
        {displaySubtitle && (
          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl"
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
          >
            {displaySubtitle}
          </motion.p>
        )}

        {/* Botón CTA */}
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