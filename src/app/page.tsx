// RUTA: src/app/page.tsx (NUEVO ARCHIVO)

import { redirect } from 'next/navigation';
import { i18n } from '@/i18n.config';

// Este componente de servidor se ejecutará cuando alguien visite la raíz del dominio.
export default function RootPage() {
  // Redirige permanentemente al idioma por defecto definido en tu configuración.
  // En nuestro caso, redirigirá de "/" a "/en".
  redirect(`/${i18n.defaultLocale}`);
}