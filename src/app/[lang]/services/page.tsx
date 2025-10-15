import { Check } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    "Residential Cleaning",
    "Private Homes",
    "Post-Construction",
    "Move In / Move Out",
    "Eco-Friendly Cleaning"
  ];

  return (
    <main className="container mx-auto py-16 px-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold font-serif text-soft-black">Our Services</h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          We provide high-standard cleaning with care shaped by your preferences, from trusted products to personal expectations.
        </p>
      </div>
      <div className="mt-12 max-w-lg mx-auto">
        <ul className="space-y-4">
          {services.map((service, index) => (
            <li key={index} className="flex items-center text-lg p-4 bg-secondary rounded-lg">
              <Check className="h-6 w-6 text-primary mr-4" />
              <span>{service}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}