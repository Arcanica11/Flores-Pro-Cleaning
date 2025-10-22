"use client";

import { motion, Variants } from "framer-motion"; // Asegúrate que Variants esté importado si lo usas para tipar

type HeroProps = {
  title: string;
  subtitle?: string;
};

const Hero = ({ title, subtitle }: HeroProps) => {

  // 1. DEFINICIÓN DE VARIANTES (dentro del componente)
  const containerVariants: Variants = { // Tipado opcional con Variants
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants: Variants = { // Tipado opcional con Variants
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const subtitleVariants: Variants = { // Tipado opcional con Variants
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center text-center px-4">
      {/* Fondo y superposición */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-75"
        style={{ backgroundImage: "url('/unsplash-image-U39FPHKfDu0.webp')" }}
      />
      <div className="absolute inset-0 bg-soft-black/40" />

      {/* Contenedor de contenido */}
      <div className="z-10 relative">
        {/* 2. APLICACIÓN DE VARIANTES AL CONTENEDOR PADRE */}
        <motion.h1
          className="text-6xl md:text-8xl font-serif text-white mb-4 md:mb-6"
          variants={containerVariants} // Correcto
          initial="hidden"
          animate="visible"
          aria-label={title}
        >
          {title.split("").map((letter, index) => (
            // 3. APLICACIÓN DE KEY Y VARIANTES A LOS HIJOS MAPEADOS
            <motion.span
              key={index}             // Correcto y necesario para React
              variants={letterVariants} // Correcto, hereda animación del padre
              className="inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* 4. APLICACIÓN DE VARIANTES AL SUBTÍTULO */}
        {subtitle && (
          <motion.p
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
            variants={subtitleVariants} // Correcto
            initial="hidden"
            animate="visible"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default Hero;