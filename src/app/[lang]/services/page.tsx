// RUTA: src/app/[lang]/services/page.tsx (REEMPLAZO COMPLETO)

import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/i18n.config';
import { Check, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Link from 'next/link';

// NOTE: Ampliando mapeo de imágenes, añadiendo placeholders si es necesario
const serviceImages: { [key: string]: string } = {
  'residential-cleaning': '/unsplash-image-BqTsh7ivTB8.webp', // Kitchen
  'private-homes': '/unsplash-image-5hlO16f9whU.webp', // Luxury interior
  'post-construction': '/unsplash-image-F-CLtgZMsZM.webp', // Empty room under construction
  'move-in-out': '/unsplash-image-SCbkyJR3QSM.webp', // Empty clean room
  'eco-friendly': '/eco+friendly+cleaning+bottles.webp', // Eco products
  // Añadir más si tienes imágenes específicas
};

const placeholderImage = '/unsplash-image-U39FPHKfDu0.webp'; // Placeholder general

// --- Subcomponentes para renderizar secciones ---

// Componente para listas de tareas con icono Check
const TasksList = ({ title, items }: { title?: string; items: string[] }) => (
  <>
    {title && <h3 className="font-bold text-soft-black text-xl mb-4">{title}</h3>}
    <ul className="space-y-3 mb-8">
      {items.map((item) => (
        <li key={item} className="flex items-start">
          <Check className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
          <span className="text-gray-700">{item}</span>
        </li>
      ))}
    </ul>
  </>
);

// Componente para secciones con título y descripción
const InfoSection = ({ title, description }: { title: string; description: string }) => (
    <div className="mb-10">
        <h3 className="font-serif text-3xl font-bold text-primary mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

// Componente para los 'perks' de Private Homes
const PerksList = ({ title, perks }: { title: string; perks: { title: string; description: string }[] }) => (
    <div className="mb-10">
        <h3 className="font-serif text-3xl font-bold text-primary mb-6">{title}</h3>
        <div className="grid md:grid-cols-2 gap-6">
            {perks.map(perk => (
                <div key={perk.title} className="bg-white p-6 rounded-lg shadow">
                    <h4 className="font-bold text-soft-black mb-2">{perk.title}</h4>
                    <p className="text-gray-600 text-sm">{perk.description}</p>
                </div>
            ))}
        </div>
    </div>
);

// Componente para los servicios populares de Private Homes
const PopularServicesList = ({ title, services }: { title: string; services: { name: string; description: string }[] }) => (
    <div className="mb-10">
        <h3 className="font-serif text-3xl font-bold text-primary mb-6">{title}</h3>
        <div className="space-y-4">
            {services.map(service => (
                <div key={service.name} className="border-b pb-4">
                    <h4 className="font-bold text-soft-black uppercase tracking-wider mb-1">{service.name}</h4>
                    <p className="text-gray-600">{service.description}</p>
                </div>
            ))}
        </div>
    </div>
);

// Componente para los pasos del proceso (Post-Construction)
const ProcessSteps = ({ title, subtitle, description, steps }: { title: string; subtitle: string; description: string; steps: { title: string; description: string }[] }) => (
    <div className="mb-12 text-center bg-white p-8 rounded-lg shadow-lg">
        <p className="font-semibold text-primary uppercase tracking-wider mb-2">{title}</p>
        <h3 className="font-serif text-3xl font-bold text-soft-black mb-4">{subtitle}</h3>
        <p className="text-gray-600 max-w-3xl mx-auto mb-8">{description}</p>
        <div className="grid md:grid-cols-3 gap-6 text-left">
            {steps.map((step, index) => (
               <div key={step.title} className="border border-gray-200 p-4 rounded"> {/* Padding reducido */}                     <h4 className="font-bold text-primary mb-2">{`${index + 1}. ${step.title}`}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">{step.description}</p> {/* Tamaño de fuente reducido */}
                </div>
            ))}
        </div>
    </div>
);

// Componente principal de la página
export default async function ServicesPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang);
  const t = dict.services_page;

  return (
    <main className="bg-secondary text-soft-black">
      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center bg-white border-b">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-soft-black">
            {t.title}
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
            {t.description}
          </p>
        </div>
      </section>

      {/* Services List con Layout Alternado y Detalles Expandidos */}
      <div className="container mx-auto px-4 py-24">
        <div className="space-y-24">
          {t.services.map((service, index) => (
            <section key={service.slug} id={service.slug} className="scroll-mt-20">
              {/* Contenedor Grid Principal */}
            <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-start">
                {/* --- Columna de Texto --- */}
              <div className={`order-1 ${index % 2 !== 0 ? 'md:order-2' : 'md:order-1'}`}>                  <h2 className="font-serif text-4xl font-bold text-primary mb-4">{service.title}</h2>
                  {/* Mostrar descripción del héroe si existe */}
                  {service.hero_description && (
                    <p className="text-gray-600 mb-8 leading-relaxed">{service.hero_description}</p>
                  )}

                  {/* Renderizar contenido específico del servicio */}
                  {service.slug === 'residential-cleaning' && (
                    <>
                      {service.schedule_options_title && service.schedules && (
                        <div className="mb-8 bg-white p-6 rounded-lg shadow">
                          <h3 className="font-bold text-soft-black text-xl mb-4">{service.schedule_options_title}</h3>
                          <ul className="space-y-3">
                            {service.schedules.map(schedule => (
                              <li key={schedule.name}>
                                <strong className="text-primary">{schedule.name}:</strong> <span className="text-gray-700">{schedule.description}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {service.deep_clean_intro_title && service.deep_clean_intro_desc && (
                         <InfoSection title={service.deep_clean_intro_title} description={service.deep_clean_intro_desc} />
                      )}
                      {service.deep_clean_includes_title && service.deep_clean_tasks && (
                          Object.entries(service.deep_clean_tasks).map(([key, value]) => (
                              <TasksList key={key} title={value.title} items={value.items} />
                          ))
                      )}
                      {service.standard_clean_title && service.standard_clean_desc && (
                         <InfoSection title={service.standard_clean_title} description={service.standard_clean_desc} />
                      )}
                       {service.standard_clean_includes_title && service.standard_clean_tasks && (
                          Object.entries(service.standard_clean_tasks).map(([key, value]) => (
                              <TasksList key={key} title={value.title} items={value.items} />
                          ))
                      )}
                      {service.additional_services_title && service.additional_services && (
                          <TasksList title={service.additional_services_title} items={service.additional_services} />
                      )}
                    </>
                  )}

                  {service.slug === 'private-homes' && (
                     <>
                        {service.perks_title && service.perks && (
                            <PerksList title={service.perks_title} perks={service.perks} />
                        )}
                        {service.popular_services_title && service.popular_services && (
                            <PopularServicesList title={service.popular_services_title} services={service.popular_services} />
                        )}
                     </>
                  )}

                   {service.slug === 'post-construction' && (
                     <>
                        {service.process_title && service.process_subtitle && service.process_description && service.process_steps && (
                            <ProcessSteps
                                title={service.process_title}
                                subtitle={service.process_subtitle}
                                description={service.process_description}
                                steps={service.process_steps}
                            />
                        )}
                         {service.tasks_description && <p className="text-lg font-semibold text-soft-black mb-4">{service.tasks_description}</p>}
                         {service.tasks_areas && (
                             Object.entries(service.tasks_areas).map(([key, value]) => (
                                 <TasksList key={key} title={value.title} items={value.items} />
                             ))
                         )}
                         {service.why_hire_title && service.why_hire && (
                            <div className="mt-10 bg-white p-6 rounded-lg shadow">
                                <h3 className="font-bold text-soft-black text-xl mb-4">{service.why_hire_title}</h3>
                                <div className="space-y-4">
                                {service.why_hire.map(reason => (
                                    <div key={reason.title}>
                                        <h4 className="font-semibold text-primary">{reason.title}</h4>
                                        <p className="text-gray-600 text-sm">{reason.description}</p>
                                    </div>
                                ))}
                                </div>
                            </div>
                         )}
                     </>
                  )}

                  {service.slug === 'move-in-out' && (
                     <>
                         {service.procedure_title && service.procedure_description && (
                            <InfoSection title={service.procedure_title} description={service.procedure_description} />
                         )}
                         {service.tasks_areas && (
                             Object.entries(service.tasks_areas).map(([key, value]) => (
                                 <TasksList key={key} title={value.title} items={value.items} />
                             ))
                         )}
                     </>
                  )}

                  {service.slug === 'eco-friendly' && (
                     <>
                         {service.methods_title && service.methods_description && service.methods_list && (
                            <>
                                <InfoSection title={service.methods_title} description={service.methods_description} />
                                <TasksList items={service.methods_list} />
                            </>
                         )}
                         {service.products_title && service.products_description && (
                            <InfoSection title={service.products_title} description={service.products_description} />
                         )}
                         {service.benefits_title && service.benefits && (
                            <PerksList title={service.benefits_title} perks={service.benefits} />
                         )}
                     </>
                  )}

                   {/* Fallback para servicios sin estructura específica (si aplica) */}
                   {/* Opcional: Renderizar tareas genéricas si existen fuera de estructuras específicas */}
                   {/* @ts-ignore */}
                   {service.tasks && !service.deep_clean_tasks && !service.standard_clean_tasks && !service.tasks_areas && (
                       // @ts-ignore
                       <TasksList title={service.includes_title || (lang === 'es' ? 'Qué incluye:' : 'What it includes:')} items={service.tasks} />
                   )}

                </div>

                {/* --- Columna de Imagen --- */}
                <div className={`order-2 relative h-80 md:h-[500px] w-full rounded-lg overflow-hidden shadow-xl ${index % 2 !== 0 ? 'md:order-1' : 'md:order-2'} mt-8 md:mt-0`}> {/* Añadido margen superior en móvil */}                   <Image
                      src={serviceImages[service.slug] || placeholderImage}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px" // Ajustar sizes
                   />
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* CTA Final de la página */}
        <div className="text-center mt-24 pt-16 border-t">
            <h2 className="font-serif text-3xl font-bold text-soft-black mb-4">
              {lang === 'es' ? '¿Listo para un Hogar Impecable?' : 'Ready for a Spotless Home?'}
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-8">
               {lang === 'es' ? 'Permítenos transformar tu espacio. Agenda una estimación gratuita hoy mismo.' : 'Let us transform your space. Schedule a free estimate today.'}
            </p>
            <Button href={`/${lang}/agendar-visita`}>
                {lang === 'es' ? 'Agendar Estimación Gratuita' : 'Schedule Free Estimate'}
            </Button>
        </div>
      </div>
    </main>
  );
}