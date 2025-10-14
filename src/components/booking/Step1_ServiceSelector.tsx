"use client";

import { useBookingStore } from "@/lib/store";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "../../../i18n.config";
import { useEffect, useState } from "react";

type Step1Props = {
  lang: Locale;
};

type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

export default function Step1_ServiceSelector({ lang }: Step1Props) {
  const { setService } = useBookingStore();
  const [dict, setDict] = useState<Dictionary | null>(null);

  useEffect(() => {
    const fetchDict = async () => {
      const d = await getDictionary(lang);
      setDict(d);
    };
    fetchDict();
  }, [lang]);

  const services = dict ? [
    { id: 'residential', name: dict.booking.services.residential },
    { id: 'commercial', name: dict.booking.services.commercial },
    { id: 'deep', name: dict.booking.services.deep },
  ] : [];

  if (!dict) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-8">{dict.booking.step1_title}</h2>
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