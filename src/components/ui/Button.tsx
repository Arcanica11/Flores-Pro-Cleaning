// RUTA: src/components/ui/Button.tsx (REEMPLAZO COMPLETO)
'use client';

import Link from 'next/link';

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

// NOTE: Componente de botón simplificado para coincidir con el estilo del sitio de Squarespace
const Button = ({ href, children, className = '' }: ButtonProps) => {
  return (
    <Link href={href} passHref>
      <button
        className={`inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white bg-primary rounded-md transition-colors duration-300 ease-in-out hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${className}`}
      >
        {children}
      </button>
    </Link>
  );
};

export default Button;