import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getDictionary } from '@/lib/dictionary';

type ServicesShowcaseProps = {
  lang: 'es' | 'en';
};

export default async function ServicesShowcase({ lang }: ServicesShowcaseProps) {
  const dict = await getDictionary(lang);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <Image
              src="/unsplash-image-BqTsh7ivTB8.webp"
              alt="Modern Kitchen"
              width={800}
              height={600}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:col-span-2">
            <h2 className="font-serif text-5xl font-bold text-primary">
              {dict.services.title}
            </h2>
            <p className="font-sans text-lg mt-4 text-soft-black">
              {dict.services.description}
            </p>
            <Link
              href={`/${lang}/services`}
              className="inline-flex items-center mt-6 text-primary font-semibold group"
            >
              {dict.services.explore}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}