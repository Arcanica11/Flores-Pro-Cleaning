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
      colors: {
        primary: '#2C5F2D',    // Forest Green
        secondary: '#FBF8F1',  // Soft Beige
        accent: '#E5D5A4',     // Pale Gold
        'soft-black': '#1A1A1A',
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        serif: ['var(--font-lora)', ...fontFamily.serif],
      },
      boxShadow: {
        'primary-hover': '0 4px 15px rgba(44, 95, 45, 0.2)',
        'card-hover': '0 8px 25px rgba(0, 0, 0, 0.08)',
      },
      keyframes: {
        aurora: {
          'from': { transform: 'translate(0px, 0px) rotate(0deg)' },
          'to': { transform: 'translate(100px, 100px) rotate(360deg)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        aurora: 'aurora 20s linear infinite alternate',
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [],
};
export default config;