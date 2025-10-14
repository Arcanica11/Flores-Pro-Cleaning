"use client";

import { motion } from "framer-motion";

type HeroProps = {
  title: string;
};

const Hero = ({ title }: HeroProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-soft-black/50" />
      <motion.h1
        className="z-10 text-6xl md:text-8xl font-serif text-white text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {title.split("").map((letter, index) => (
          <motion.span key={index} variants={letterVariants}>
            {letter}
          </motion.span>
        ))}
      </motion.h1>
    </section>
  );
};

export default Hero;