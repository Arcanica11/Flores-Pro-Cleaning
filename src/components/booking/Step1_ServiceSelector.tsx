"use client";

import { useBookingStore } from "@/lib/store";
import { Locale } from "../../i18n.config";
// FIX: Importar el tipo completo del diccionario para obtener la estructura correcta
import { dictionary as enDictType } from '@/dictionaries/en';

// FIX: Usar el tipo de la sección 'booking' del diccionario
type BookingDictionary = typeof enDictType.booking;

// FIX: Actualizar Step1Props para reflejar la estructura REAL de dictionary.booking
type Step1Props = {
  lang: Locale;
  dictionary: {
    step1_title: string;
    services: { // <-- Tipo actualizado aquí
      residential: string;
      private: string;         // <-- Añadido
      post_construction: string; // <-- Añadido
      move_in_out: string;     // <-- Añadido
      // commercial y deep eliminados porque no están en dictionary.booking.services
    };
    // Añadir otras propiedades de dictionary.booking si fueran necesarias aquí
  };
};

export default function Step1_ServiceSelector({ lang, dictionary }: Step1Props) {
  const { setService } = useBookingStore();

  // FIX: Actualizar la lista de servicios para usar las claves y nombres correctos del diccionario
  const services = [
    { id: 'residential', name: dictionary.services.residential },
    { id: 'private', name: dictionary.services.private }, // <-- Usar clave 'private'
    { id: 'post_construction', name: dictionary.services.post_construction }, // <-- Usar clave 'post_construction'
    { id: 'move_in_out', name: dictionary.services.move_in_out }, // <-- Usar clave 'move_in_out'
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-8">{dictionary.step1_title}</h2>
      {/* FIX: Ajustar grid para acomodar 4 servicios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => setService(service.id)} // La lógica de Zustand no necesita cambiar aquí
            className="p-8 border rounded-lg text-lg md:text-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-card-hover"
          >
            {service.name}
          </button>
        ))}
      </div>
    </div>
  );
}