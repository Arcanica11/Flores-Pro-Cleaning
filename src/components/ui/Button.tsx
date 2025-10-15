// RUTA: src/components/ui/Button.tsx (REEMPLAZO COMPLETO)
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string; // Permitir clases adicionales para flexibilidad
};

const Button = ({ href, children, className = '' }: ButtonProps) => {
  return (
    <Link href={href} passHref>
      <motion.button
        className={`relative inline-flex items-center justify-center px-8 py-3 text-md font-bold text-soft-black bg-primary rounded-lg overflow-hidden group transition-all duration-300 ease-in-out ${className}`}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 20px rgba(212, 175, 55, 0.5)", // Usamos el nuevo 'glow'
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        {/* Capa para el efecto de brillo (shimmer) */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          initial={{ x: '-150%' }}
          whileHover={{ x: '150%' }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />
        
        {/* El contenido del botón se coloca en una capa superior para que no se vea afectado por el brillo */}
        <span className="relative z-10">
          {children}
        </span>
      </motion.button>
    </Link>
  );
};

export default Button;