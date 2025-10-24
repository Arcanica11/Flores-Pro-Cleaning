// RUTA: src/app/page.tsx (CORREGIDO Y COMPLETO)
import { redirect } from 'next/navigation';
import { i18n } from '@/i18n.config'; // Importar configuración i18n

export default function RootPage() {
  // Redirigir inmediatamente a la ruta del idioma por defecto (ej. /en)
  redirect(`/${i18n.defaultLocale}`);

  // No se renderiza nada aquí
  return null;
}