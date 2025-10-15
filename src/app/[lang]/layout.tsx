import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "../globals.css";
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

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  // 1. Obtenemos el diccionario completo en el servidor.
  const dict = await getDictionary(params.lang);

  return (
    <html lang={params.lang}>
      <body className={`${inter.variable} ${lora.variable} font-sans bg-background text-foreground`}>
        {/* 2. Pasamos solo la parte del diccionario que el Navbar necesita como prop. */}
        <Navbar lang={params.lang} dictionary={dict.navbar} />
        {children}
      </body>
    </html>
  );
}