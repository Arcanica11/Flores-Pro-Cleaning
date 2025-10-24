// RUTA: src/app/[lang]/services/[slug]/ServiceDetails.tsx (CORREGIDO CON EXPORTACIÓN DE TIPO)

import { Check } from 'lucide-react';
import type { Locale } from '@/i18n.config';
import { dictionary as enDictType } from '@/dictionaries/en';

// FIX: Exportar el tipo ServiceData para que pueda ser importado
export type ServiceData = typeof enDictType.services_page.services[number];

type ServiceDetailsContentProps = {
  lang: Locale;
  serviceData: ServiceData;
};

// --- Subcomponentes (Sin cambios) ---
const TasksList = ({ title, items }: { title?: string; items: string[] }) => (
    <div className="mb-8">
      {title && <h3 className="font-bold text-soft-black text-xl mb-4">{title}</h3>}
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start">
            <Check className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );

const InfoSection = ({ title, description }: { title: string; description: string }) => (
    <div className="mb-10">
      <h3 className="font-serif text-3xl font-bold text-primary mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );

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

const ProcessSteps = ({ title, subtitle, description, steps }: { title: string; subtitle: string; description: string; steps: { title: string; description: string }[] }) => (
    <div className="mb-12 text-center bg-gray-50 p-6 sm:p-8 rounded-lg shadow-inner">
      <p className="font-semibold text-primary uppercase tracking-wider mb-2">{title}</p>
      <h3 className="font-serif text-3xl font-bold text-soft-black mb-4">{subtitle}</h3>
      <p className="text-gray-600 max-w-3xl mx-auto mb-8">{description}</p>
      <div className="grid md:grid-cols-3 gap-6 text-left space-y-6 md:space-y-0">
        {steps.map((step, index) => (
          <div key={step.title} className="bg-white border border-gray-200 p-4 rounded shadow-sm">
            <h4 className="font-bold text-primary mb-2">{`${index + 1}. ${step.title}`}</h4>
            <p className="text-gray-600 text-xs sm:text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

// --- Componente Principal ServiceDetailsContent ---
export default function ServiceDetailsContent({ lang, serviceData }: ServiceDetailsContentProps) {

  // NOTE: Función interna para renderizar el contenido distribuido
  const renderContent = () => {
    const columnSections: React.ReactNode[] = [];
    const fullWidthSections: React.ReactNode[] = [];

    // Lógica de distribución (Recuerda añadir casos para todos los slugs)
     if (serviceData.slug === 'residential-cleaning') {
        if (serviceData.deep_clean_tasks) { Object.entries(serviceData.deep_clean_tasks).forEach(([key, value]) => columnSections.push(<TasksList key={`deep-${key}`} title={value.title} items={value.items} />)); }
        if (serviceData.standard_clean_tasks) { Object.entries(serviceData.standard_clean_tasks).forEach(([key, value]) => columnSections.push(<TasksList key={`std-${key}`} title={value.title} items={value.items} />)); }
        if (serviceData.schedule_options_title && serviceData.schedules) { fullWidthSections.push( <div key="schedules" className="mb-8 bg-gray-50 p-6 rounded-lg shadow-inner lg:col-span-2"> <h3 className="font-bold text-soft-black text-xl mb-4">{serviceData.schedule_options_title}</h3> <ul className="space-y-3"> {serviceData.schedules.map(schedule => ( <li key={schedule.name}><strong className="text-primary">{schedule.name}:</strong> <span className="text-gray-700">{schedule.description}</span></li> ))} </ul> </div> ); }
        if (serviceData.additional_services_title && serviceData.additional_services) { fullWidthSections.push(<TasksList key="additional" title={serviceData.additional_services_title} items={serviceData.additional_services} />); }
        if (serviceData.deep_clean_intro_title && serviceData.deep_clean_intro_desc) { fullWidthSections.unshift(<InfoSection key="deep-intro" title={serviceData.deep_clean_intro_title} description={serviceData.deep_clean_intro_desc} />); }
        if (serviceData.standard_clean_title && serviceData.standard_clean_desc) { fullWidthSections.push(<InfoSection key="std-intro" title={serviceData.standard_clean_title} description={serviceData.standard_clean_desc} />); }
     }
     else if (serviceData.slug === 'private-homes') {
       if (serviceData.perks_title && serviceData.perks) { fullWidthSections.push(<PerksList key="ph-perks" title={serviceData.perks_title} perks={serviceData.perks} />); }
       if (serviceData.popular_services_title && serviceData.popular_services) { fullWidthSections.push(<PopularServicesList key="ph-popular" title={serviceData.popular_services_title} services={serviceData.popular_services} />); }
     }
      else if (serviceData.slug === 'post-construction') {
        if (serviceData.tasks_areas) { Object.entries(serviceData.tasks_areas).forEach(([key, value]) => columnSections.push(<TasksList key={`pc-${key}`} title={value.title} items={value.items} />)); }
        if (serviceData.process_title && serviceData.process_steps) { fullWidthSections.push( <ProcessSteps key="pc-process" title={serviceData.process_title} subtitle={serviceData.process_subtitle || ''} description={serviceData.process_description || ''} steps={serviceData.process_steps} /> ); }
        if (serviceData.why_hire_title && serviceData.why_hire) { fullWidthSections.push( <div key="pc-why" className="mt-10 bg-gray-50 p-6 rounded-lg shadow-inner"> <h3 className="font-bold text-soft-black text-xl mb-4">{serviceData.why_hire_title}</h3> <div className="space-y-4"> {serviceData.why_hire.map(reason => ( <div key={reason.title}> <h4 className="font-semibold text-primary">{reason.title}</h4> <p className="text-gray-600 text-sm">{reason.description}</p> </div> ))} </div> </div> ); }
     }
     else if (serviceData.slug === 'move-in-out') {
        if (serviceData.procedure_title && serviceData.procedure_description) { fullWidthSections.push(<InfoSection key="mio-proc" title={serviceData.procedure_title} description={serviceData.procedure_description} />); }
        if (serviceData.tasks_areas) { Object.entries(serviceData.tasks_areas).forEach(([key, value]) => columnSections.push(<TasksList key={`mio-${key}`} title={value.title} items={value.items} />)); }
     }
     else if (serviceData.slug === 'eco-friendly') {
        if (serviceData.methods_title && serviceData.methods_description && serviceData.methods_list) { fullWidthSections.push(<InfoSection key="eco-methods-intro" title={serviceData.methods_title} description={serviceData.methods_description} />); columnSections.push(<TasksList key="eco-methods-list" items={serviceData.methods_list} />); }
        if (serviceData.products_title && serviceData.products_description) { fullWidthSections.push(<InfoSection key="eco-products" title={serviceData.products_title} description={serviceData.products_description} />); }
        if (serviceData.benefits_title && serviceData.benefits) { fullWidthSections.push(<PerksList key="eco-benefits" title={serviceData.benefits_title} perks={serviceData.benefits} />); }
     }
     // Fallback genérico
     // @ts-ignore
     else if ('tasks' in serviceData && Array.isArray(serviceData.tasks)) {
       // @ts-ignore
       fullWidthSections.push(<TasksList key="generic-tasks" title={serviceData.includes_title || (lang === 'es' ? 'Qué incluye:' : 'What it includes:')} items={serviceData.tasks} />);
     }

    // Renderizado final del contenido distribuido
    return (
      <div className="bg-white p-6 md:p-10 lg:p-12 rounded-lg border border-gray-200 shadow-md">
        {fullWidthSections.length > 0 && (
          <div className="space-y-10 mb-10">
            {fullWidthSections}
          </div>
        )}
        {columnSections.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4">
               {columnSections}
            </div>
        )}
         {/* Mostrar mensaje si no hay contenido detallado específico */}
         {fullWidthSections.length === 0 && columnSections.length === 0 && (
             <p className="text-gray-500 italic">No hay detalles adicionales disponibles para este servicio.</p>
         )}
      </div>
    );
  };

  return renderContent();
}