// RUTA: tailwind.config.ts (REEMPLAZO COMPLETO)
import type { Config } from "tailwindcss";
const { fontFamily } = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // FIX: Paleta de colores actualizada para coincidir con el diseño de Squarespace (marrones y neutros)
      colors: {
        'primary': '#a8824a',        // Marrón oscuro de los botones
        'primary-hover': '#7a6255',    // Un tono más claro para el hover
        'secondary': '#F9F5F0',      // Beige/Blanco hueso para fondos
        'accent': '#E5D5A4',         // Dorado pálido (mantenido por si es útil)
        'soft-black': '#1A1A1A',      // Texto principal
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        serif: ['var(--font-lora)', ...fontFamily.serif],
      },
      boxShadow: {
        'card-hover': '0 8px 25px rgba(0, 0, 0, 0.08)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [],
};
export default config;