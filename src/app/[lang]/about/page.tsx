// RUTA: src/app/[lang]/about/page.tsx (REEMPLAZO COMPLETO)
import Image from 'next/image';
import { getDictionary } from '@/lib/dictionary';
import type { Locale } from '@/i18n.config';
import { Heart, Leaf, Smile } from 'lucide-react'; // NOTE: Iconos para la sección de valores

export default async function AboutPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang);
  const t = dict.about_page;

  const values = [
    {
      icon: <Heart className="h-10 w-10 text-primary" />,
      title: t.values.value1_title,
      description: t.values.value1_desc,
    },
    {
      icon: <Leaf className="h-10 w-10 text-primary" />,
      title: t.values.value2_title,
      description: t.values.value2_desc,
    },
    {
      icon: <Smile className="h-10 w-10 text-primary" />,
      title: t.values.value3_title,
      description: t.values.value3_desc,
    },
  ];

  return (
    <main className="bg-secondary text-soft-black">
      {/* Hero Section */}
      <section className="container mx-auto py-20 px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <h1 className="text-5xl lg:text-6xl font-bold font-serif text-soft-black">
              {t.title}
            </h1>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              {t.paragraph1}
            </p>
            <p className="mt-4 text-lg text-gray-700 leading-relaxed">
              {t.paragraph2}
            </p>
          </div>
          <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/lety.webp"
              alt={t.image_alt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold font-serif text-soft-black mb-16">
            {t.values.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {values.map((value) => (
              <div key={value.title} className="flex flex-col items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold font-serif text-soft-black mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 max-w-xs">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}