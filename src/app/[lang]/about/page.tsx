import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="container mx-auto py-16 px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-bold font-serif text-soft-black">About Us</h1>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            Flores Pro Cleaning is a family-owned business dedicated to providing high-quality professional cleaning services to the residents of Austin, TX.
          </p>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            With years of experience, we have developed efficient cleaning practices, including eco-friendly methods that make it easier to take care of Earth and have a sparkling home.
          </p>
        </div>
        <div>
          <Image
            src="/lety.webp" // Assuming the owner's image is named lety.webp in the public folder
            alt="Founder of Flores Pro-Cleaning"
            width={500}
            height={600}
            className="rounded-lg shadow-xl object-cover"
          />
        </div>
      </div>
    </main>
  );
}