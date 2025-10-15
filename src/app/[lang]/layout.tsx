import Navbar from "@/components/sections/Navbar";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/i18n.config";

// FIX: Este layout ya NO es async y no define Metadata, <html> o <body>.
export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  // Su única responsabilidad de servidor es obtener el diccionario.
  const dict = await getDictionary(params.lang);

  return (
    <>
     {children}
    </>
  );
}