import { getDictionary } from '@/lib/dictionary';

type TestimonialProps = {
  lang: 'es' | 'en';
};

export default async function Testimonial({ lang }: TestimonialProps) {
  const dict = await getDictionary(lang);

  return (
    <section className="bg-secondary py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-lg bg-white p-12 shadow-lg">
          <div className="absolute inset-0 -z-10 animate-aurora bg-[radial-gradient(circle,_#2C5F2D,_#E5D5A4)] opacity-30 blur-[80px]"></div>
          <blockquote className="text-center">
            <p className="font-serif text-3xl font-bold text-soft-black">
              &quot;{dict.testimonial.text}&quot;
            </p>
            <footer className="mt-6 font-sans text-lg text-gray-600">
              - {dict.testimonial.author}
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}