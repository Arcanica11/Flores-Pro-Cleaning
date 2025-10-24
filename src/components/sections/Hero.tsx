// RUTA: src/components/sections/Hero.tsx (CON CONSOLE.LOG)
'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
// Quitado useEffect/useState para simplificar y usar props directamente
// import { useEffect, useState } from 'react';
import type { Locale } from '@/i18n.config';

type HeroProps = {
  lang: Locale | undefined; // Hacer lang opcional por si acaso
  title: string | undefined;
  subtitle?: string | undefined;
};

// --- Animaciones ---
const containerVariants: Variants = { /* ... */ };
const letterVariants: Variants = { /* ... */ }; // Renombrado de itemVariants
const subtitleVariants: Variants = { /* ... */ };
const buttonVariants: Variants = { /* ... */ };
// --- Fin Animaciones ---

export default function Hero({ lang, title, subtitle }: HeroProps) {

  // FIX: Añadir console.log para ver las props recibidas DENTRO del componente Hero
  console.log('[Hero.tsx] Props recibidas:', { lang, title, subtitle });

  // Usar directamente las props o fallbacks
  const displayTitle = title ?? " ";
  const displaySubtitle = subtitle;
  const currentLang = lang ?? 'en'; // Usar 'en' si lang no llega

  // Texto y enlace del botón
  const buttonText = currentLang === 'es' ? 'Agendar Visita' : 'Book Visit';
  const buttonLink = `/${currentLang}/agendar-visita`; // Usar currentLang

  const words = typeof displayTitle === 'string' ? displayTitle.split(' ') : [];

  return (
    <section className="relative w-full min-h-[calc(100vh-80px)] md:min-h-screen bg-soft-black flex items-center justify-start text-white overflow-hidden">
      {/* Imagen Fondo */}
      <Image
        src="/unsplash-image-U39FPHKfDu0.webp"
        alt="Flores Pro-Cleaning Hero Background"
        fill
        priority
        className="object-cover object-center z-0 brightness-75"
      />
      {/* Overlay */}
      <div
        className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/40 to-transparent lg:from-black/80 lg:via-black/50 lg:to-transparent"
        aria-hidden="true"
       />
      {/* Contenido */}
      <div className="container relative z-20 mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 py-16 text-left">
        {/* Título */}
        <motion.h1
          key={displayTitle}
          className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-4 md:mb-6 leading-tight max-w-3xl min-h-[2em]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label={displayTitle}
        >
          {displayTitle !== " " ? words.map((word, i) => (
            <span key={i} className="inline-block mr-3 lg:mr-4">
              {word.split('').map((char, j) => (
                <motion.span key={j} className="inline-block" variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
            </span>
          )) : <>&nbsp;</>}
        </motion.h1>

        {/* Subtítulo */}
        {/* {displaySubtitle && (
          <motion.p
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl"
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
          >
            {displaySubtitle}
          </motion.p>
        )} */}

        {/* Botón */}
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