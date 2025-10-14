import type { Metadata } from "next";
import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "../globals.css";
import { i18n } from "../../../i18n.config";

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

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }));
}

import Navbar from "@/components/sections/Navbar";
import { Locale } from "../../../i18n.config";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={params.lang}>
      <body className={`${inter.variable} ${lora.variable} font-sans`}>
        <Navbar lang={params.lang} />
        {children}
      </body>
    </html>
  );
}