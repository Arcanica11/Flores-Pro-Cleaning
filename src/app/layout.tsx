// RUTA: src/app/layout.tsx (REEMPLAZO COMPLETO)

import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/sections/Navbar";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n.config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Flores Pro-Cleaning",
  description: "Premium cleaning services with a touch of serenity.",
};

// Este es ahora el ÚNICO layout. Es asíncrono y maneja todo.
export default async function RootLayout({
  children,
  params, // Los parámetros de la URL (como 'lang') están disponibles aquí.
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const dict = await getDictionary(params.lang);

  return (
    // La etiqueta <html> necesita saber el idioma actual.
    <html lang={params.lang}>
      <body className={`${inter.variable} ${lora.variable} font-sans bg-soft-black text-white`}>
        {/* Renderizamos el Navbar aquí, pasándole los datos necesarios */}
        <Navbar lang={params.lang} dictionary={dict.navbar} />
        {children}
      </body>
    </html>
  );
}