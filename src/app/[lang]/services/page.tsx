// RUTA: src/app/[lang]/services/page.tsx (VERSIÓN MEJORADA)

import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/i18n.config';
import { Check } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';

// Un objeto para mapear slugs a las imágenes que ya tenemos
const serviceImages: { [key: string]: string } = {
  'residential-cleaning': '/unsplash-image-BqTsh7ivTB8.webp',
  'post-construction': '/unsplash-image-F-CLtgZMsZM.webp',
  'move-in-out': '/unsplash-image-SCbkyJR3QSM.webp',
};

export default async function ServicesPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang);
  const t = dict.services_page;

  return (
    <main className="bg-secondary text-soft-black">
      {/* Hero Section */}
      <section className="py-20 text-center bg-white">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-soft-black">
            {t.title}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>
      </section>

      {/* Services List con Layout Alternado */}
      <div className="container mx-auto px-4 py-24">
        <div className="space-y-20">
          {t.services.map((service, index) => (
            <section key={service.slug} id={service.slug} className="grid md:grid-cols-2 gap-12 items-center">
              
              {/* Columna de Texto */}
              <div className={`text-left ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                <h2 className="font-serif text-4xl font-bold text-primary mb-4">{service.title}</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                <h3 className="font-bold text-soft-black mb-4">{service.includes_title}</h3>
                <ul className="space-y-3">
                  {service.tasks.map((task) => (
                    <li key={task} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Columna de Imagen */}
              <div className={`relative h-96 w-full rounded-lg overflow-hidden shadow-xl ${index % 2 !== 0 ? 'md:order-1' : ''}`}>
                 <Image
                    src={serviceImages[service.slug] || '/placeholder.jpg'}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                 />
              </div>

            </section>
          ))}
        </div>
        
        {/* CTA Final de la página */}
        <div className="text-center mt-20">
            <Button href={`/${lang}/agendar-visita`}>
                {lang === 'es' ? 'Agendar una Estimación Gratuita' : 'Schedule a Free Estimate'}
            </Button>
        </div>
      </div>
    </main>
  );
}