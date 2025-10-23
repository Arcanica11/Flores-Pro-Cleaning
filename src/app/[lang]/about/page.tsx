// RUTA: src/app/[lang]/about/page.tsx (ACTUALIZADO)
import Image from 'next/image';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/i18n.config';
import { HeartHandshake, UserCheck, Leaf, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

export default async function AboutPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang);
  const t = dict.about_page;

  const values = [
    {
      icon: <HeartHandshake className="h-10 w-10 text-primary" />,
      title: t.values.value1_title,
      description: t.values.value1_desc,
    },
    {
      icon: <UserCheck className="h-10 w-10 text-primary" />,
      title: t.values.value2_title,
      description: t.values.value2_desc,
    },
    {
      icon: <Leaf className="h-10 w-10 text-primary" />,
      title: t.values.value3_title,
      description: t.values.value3_desc,
    },
    {
      icon: <Sparkles className="h-10 w-10 text-primary" />,
      title: t.values.value4_title,
      description: t.values.value4_desc,
    },
  ];

  return (
    <main className="bg-white text-soft-black">

      {/* --- HERO / MISIÓN --- */}
      <section className="relative py-32 md:py-48 bg-secondary">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/unsplash-image-owtKY1AVwg8.webp')" }}
        />
        <div className="container relative mx-auto px-4 text-center max-w-4xl">
           <p className="font-semibold text-primary uppercase tracking-wider mb-4">
              {t.mission_subtitle}
            </p>
          <h1 className="font-serif text-4xl md:text-5xl text-soft-black leading-tight mb-6"> {/* Añadido margen inferior */}
            &quot;{t.mission_text}&quot;
          </h1>
           {/* FIX: Añadido el eslogan debajo de la misión */}
           {t.slogan && (
             <p className="text-xl italic text-gray-700 mt-4">&quot;{t.slogan}&quot;</p>
           )}
        </div>
      </section>

      {/* --- HISTORIA --- */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Imagen */}
            <div className="relative h-[500px] md:h-[600px] w-full">
              <div className="absolute -left-4 -top-4 w-full h-full bg-secondary rounded-lg z-0" />
              <Image
                src="/lety.webp"
                alt={t.image_alt}
                fill
                className="object-cover object-center rounded-lg shadow-2xl z-10 relative"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
             {/* Texto */}
            <div className="text-left lg:-ml-16 bg-white p-8 md:p-12 rounded-lg shadow-xl relative z-20">
              {/* FIX: Cambiado el título a story_title */}
              <h2 className="text-4xl lg:text-5xl font-bold font-serif text-soft-black mb-6">
                {t.story_title}
              </h2>
              {/* FIX: Reemplazado párrafos individuales por el contenido completo */}
              <div className="text-lg text-gray-700 leading-relaxed space-y-6">
               <p>{t.story_p1}</p>
               <p>{t.story_p2}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- VALORES FUNDAMENTALES --- */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold font-serif text-soft-black mb-4">{t.values.title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
            {t.values.subtitle}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
            {values.map((value) => (
              <div key={value.title} className="bg-white p-8 flex flex-col items-center">
                <div className="mb-5">{value.icon}</div>
                <h3 className="text-lg font-bold font-serif text-primary uppercase tracking-wider mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* --- GALERÍA / TEAM IN ACTION --- */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-soft-black">{t.gallery_title}</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{t.gallery_subtitle}</p>
          </div>
          {/* Imágenes de la galería (sin cambios) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="grid gap-4">
                  <Image className="h-auto max-w-full rounded-lg shadow-md" src="/filler_images23.webp" alt="Cleaning oven" width={400} height={500}/>
                  <Image className="h-auto max-w-full rounded-lg shadow-md" src="/filler_images14.webp" alt="Cleaning window" width={400} height={600}/>
              </div>
              <div className="grid gap-4">
                  <Image className="h-auto max-w-full rounded-lg shadow-md" src="/filler_images27.webp" alt="High dusting" width={400} height={600}/>
                  <Image className="h-auto max-w-full rounded-lg shadow-md" src="/filler_images41.webp" alt="Spraying window" width={400} height={500}/>
              </div>
              <div className="grid gap-4">
                  <Image className="h-auto max-w-full rounded-lg shadow-md" src="/filler_images24.webp" alt="Wiping oven door" width={400} height={500}/>
                  <Image className="h-auto max-w-full rounded-lg shadow-md" src="/unsplash-image-WnuDJlnuOhU.webp" alt="Dusting furniture" width={400} height={600}/>
              </div>
              <div className="grid gap-4">
                  <Image className="h-auto max-w-full rounded-lg shadow-md" src="/unsplash-image-SqOMDOQb3ws.webp" alt="Cleaning kitchen counter" width={400} height={600}/>
                  <Image className="h-auto max-w-full rounded-lg shadow-md" src="/filler_images32.webp" alt="Dusting mirror" width={400} height={500}/>
              </div>
          </div>
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <section className="bg-soft-black text-white text-center py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-4xl font-bold">{t.cta_title}</h2>
          <p className="mt-4 max-w-2xl mx-auto">{t.cta_subtitle}</p>
          <div className="mt-8">
            <Button href={`/${lang}/agendar-visita`} className="!bg-white !text-primary hover:!bg-gray-200">
              {t.cta_button}
            </Button>
          </div>
        </div>
      </section>

    </main>
  );
}