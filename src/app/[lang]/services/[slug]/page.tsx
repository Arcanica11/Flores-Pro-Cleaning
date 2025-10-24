// RUTA: src/app/[lang]/services/[slug]/page.tsx (VERSIÓN COMPLETA FINAL)

import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/i18n.config';
import { notFound } from 'next/navigation';
// Importar el componente cliente que manejará la visualización
import ServiceDisplay from './ServiceDisplay';
// Importar el tipo ServiceData si es necesario (o si se exporta desde ServiceDetails)
// import type { ServiceData } from './ServiceDetails';

// Mapeo de imágenes (igual que antes)
const serviceImages: { [key: string]: string } = {
  'residential-cleaning': '/unsplash-image-BqTsh7ivTB8.webp', // Kitchen
  'private-homes': '/unsplash-image-5hlO16f9whU.webp', // Luxury interior
  'post-construction': '/unsplash-image-F-CLtgZMsZM.webp', // Empty room under construction
  'move-in-out': '/unsplash-image-SCbkyJR3QSM.webp', // Empty clean room
  'eco-friendly': '/eco+friendly+cleaning+bottles.webp', // Eco products
};
const placeholderImage = '/unsplash-image-U39FPHKfDu0.webp'; // Placeholder general

// Props para la página dinámica
type ServicePageProps = {
  params: {
    lang: Locale;
    slug: string; // El slug del servicio viene de la URL
  };
};

export default async function ServicePage({ params: { lang, slug } }: ServicePageProps) {
  // Obtener el diccionario y los datos específicos del servicio
  const dict = await getDictionary(lang);
  const t_services_page = dict.services_page; // Acceder a la sección correcta del diccionario

  // Encontrar el servicio usando el slug
  const service = t_services_page.services.find(s => s.slug === slug);

  // Si no se encuentra el servicio, mostrar página 404
  if (!service) {
    notFound();
  }

  // Obtener la URL de la imagen
  const imageUrl = serviceImages[service.slug] || placeholderImage;

  return (
    // Fondo base blanco para la página
    <main className="bg-white text-soft-black">
      {/* Hero Section Específico del Servicio (Solo Título) */}
      <section className="py-20 md:py-28 text-center bg-white border-b">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-soft-black">
            {service.title} {/* Título del servicio */}
          </h1>
        </div>
      </section>

      {/* Componente Cliente para mostrar Imagen, Resumen, Botón y Detalles */}
      {/* Toda la lógica de layout y expansión está encapsulada aquí */}
      <ServiceDisplay
        lang={lang}
        // @ts-ignore - Usar si hay discrepancias entre el tipo inferido del diccionario y ServiceData
        serviceData={service} // Pasar todos los datos del servicio encontrado
        imageUrl={imageUrl}   // Pasar la URL de la imagen
      />

      {/* Puedes añadir otras secciones aquí si fueran necesarias, debajo del ServiceDisplay */}

    </main>
  );
}

// Generar páginas estáticas para cada slug de servicio (sin cambios)
export async function generateStaticParams({ params: { lang } }: { params: { lang: Locale }}) {
   const dict = await getDictionary(lang);
   const t_services_page = dict.services_page; // Acceder a la sección correcta
   // Asegurarse de que t_services_page.services es un array antes de mapear
   if (!t_services_page || !Array.isArray(t_services_page.services)) {
       console.warn(`generateStaticParams: No se encontraron servicios para el idioma '${lang}'`);
       return [];
   }
   return t_services_page.services.map((service) => ({
      slug: service.slug,
   }));
}