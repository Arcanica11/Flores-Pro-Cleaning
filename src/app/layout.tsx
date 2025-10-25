// RUTA: src/app/layout.tsx (ACTUALIZAR LLAMADA A NAVBAR)

import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/sections/Navbar";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n.config";
import Footer from "@/components/sections/Footer";
import FloatingCallButton from "@/components/ui/FloatingCallButton";

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  const dict = await getDictionary(params.lang);

  return (
    <html lang={params.lang}>
      <body className={`${inter.variable} ${lora.variable} font-sans bg-soft-black text-white`}>
              {/* FIX: Pasar también dict.services_page a Navbar */}
              <Navbar
                lang={params.lang}
                dictionary={dict.navbar}
                footerDictionary={dict.footer}
                servicesDictionary={dict.services_page} // <-- Añadir esta línea
              />
        {children}
        <Footer lang={params.lang} />
        <FloatingCallButton />
      </body>
    </html>
  );
}