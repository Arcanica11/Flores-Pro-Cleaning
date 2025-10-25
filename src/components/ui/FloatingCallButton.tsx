// RUTA: src/components/ui/FloatingCallButton.tsx (NUEVO ARCHIVO)
'use client';

import { Phone } from 'lucide-react';

// NOTE: Número de teléfono hardcodeado aquí o idealmente pasado como prop si se obtiene del diccionario en el layout
const phoneNumber = "+15123670154"; // Tu número de teléfono
const telLink = `tel:${phoneNumber}`;

export default function FloatingCallButton() {
  return (
    // FIX: Botón fijo en esquina inferior derecha, visible solo en móviles (hidden md:hidden)
    <a
      href={telLink}
      className="fixed bottom-6 right-6 z-40 md:hidden bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-hover transition-colors flex items-center justify-center"
      aria-label={`Call ${phoneNumber}`} // Para accesibilidad
    >
      <Phone className="h-6 w-6" />
    </a>
  );
}