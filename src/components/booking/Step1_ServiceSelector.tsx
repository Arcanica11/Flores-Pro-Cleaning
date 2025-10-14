"use client";

import { useBookingStore } from "@/lib/store";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "../../../i18n.config";

type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

type Step1Props = {
  lang: Locale;
  dictionary: Dictionary['booking'];
};

export default function Step1_ServiceSelector({ lang, dictionary }: Step1Props) {
  const { setService } = useBookingStore();

  const services = [
    { id: 'residential', name: dictionary.services.residential },
    { id: 'commercial', name: dictionary.services.commercial },
    { id: 'deep', name: dictionary.services.deep },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-8">{dictionary.step1_title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => setService(service.id)}
            className="p-8 border rounded-lg text-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-card-hover"
          >
            {service.name}
          </button>
        ))}
      </div>
    </div>
  );
}