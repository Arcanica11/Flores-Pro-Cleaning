import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/sections/Navbar";

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
  params: { lang: 'es' | 'en' };
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