// RUTA: src/components/sections/Hero.tsx (COMPLETO - CORREGIDO PARA COINCIDIR CON page.tsx)
'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/i18n.config'; // Asumimos que lang vendrá con page.tsx
import { useEffect, useState } from 'react';

// FIX: Las props deben coincidir con CÓMO las envía page.tsx
// page.tsx envía: title, subtitle. También añadimos lang.
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


// FIX: Recibir lang, title, y subtitle directamente
export default function Hero({ lang, title: initialTitle, subtitle: initialSubtitle }: HeroProps) {
  
  // Estado local para manejar textos y evitar fallbacks visibles
  const [heroTitle, setHeroTitle] = useState(" ");
  const [heroSubtitle, setHeroSubtitle] = useState<string | undefined>(undefined);

  // Actualizar estado local cuando las props cambien
  useEffect(() => {
    setHeroTitle(initialTitle ?? " "); // Usar prop 'initialTitle'
    setHeroSubtitle(initialSubtitle); // Usar prop 'initialSubtitle'
  }, [initialTitle, initialSubtitle]);

  // Texto y enlace del botón (usa 'lang')
  const buttonText = lang === 'es' ? 'Agendar Visita' : 'Book Visit';
  const buttonLink = `/${lang}/agendar-visita`;

  const words = typeof heroTitle === 'string' ? heroTitle.split(' ') : [];

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
          key={heroTitle}
          // FIX: Quitado whitespace-nowrap para ajuste en móvil
          className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-4 md:mb-6 leading-tight max-w-3xl min-h-[2em]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label={heroTitle}
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block mr-3 lg:mr-4"> {/* Quitado whitespace-nowrap */}
              {word.split('').map((char, j) => (
                <motion.span key={j} className="inline-block" variants={itemVariants}>
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
          {heroTitle === " " && <>&nbsp;</>}
        </motion.h1>

        {/* Párrafo (Subtítulo) */}
        {heroSubtitle && (
          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl"
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
          >
            {heroSubtitle}
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