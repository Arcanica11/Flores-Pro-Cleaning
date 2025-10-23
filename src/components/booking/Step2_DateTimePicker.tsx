"use client";

import { useBookingStore } from "@/lib/store";
import { Locale } from "../../i18n.config";
import { useEffect, useState } from "react";
// Asumiendo que esta función está correctamente implementada
// import { get_calendar_availability } from "@/lib/google-calendar";

// Simulación de la función si la real no está disponible o da problemas
async function get_calendar_availability_mock(dateRange: { start: string; end: string }): Promise<{ busy?: { start: string; end: string }[]; error?: string }> {
  console.log("Fetching mock availability for:", dateRange);
  // Simula algunos horarios ocupados para probar la UI
  const day = new Date(dateRange.start).getDay();
  if (day === 1) { // Lunes simulado ocupado por la mañana
      const busyStart = new Date(dateRange.start);
      busyStart.setUTCHours(14, 0, 0, 0); // 9 AM en zona horaria -5 (ej. CT)
      const busyEnd = new Date(dateRange.start);
      busyEnd.setUTCHours(16, 0, 0, 0); // 11 AM en zona horaria -5
      return Promise.resolve({ busy: [{ start: busyStart.toISOString(), end: busyEnd.toISOString() }] });
  }
   if (day === 2) { // Martes simulado ocupado por la tarde
      const busyStart = new Date(dateRange.start);
      busyStart.setUTCHours(19, 0, 0, 0); // 2 PM en zona horaria -5 (ej. CT)
      const busyEnd = new Date(dateRange.start);
      busyEnd.setUTCHours(21, 0, 0, 0); // 4 PM en zona horaria -5
      return Promise.resolve({ busy: [{ start: busyStart.toISOString(), end: busyEnd.toISOString() }] });
   }
  return Promise.resolve({ busy: [] }); // Por defecto, disponible
}


type Step2Props = {
  lang: Locale;
  dictionary: {
    step2_title: string;
    back_button: string;
  };
};

export default function Step2_DateTimePicker({ lang, dictionary }: Step2Props) {
  const { setSlot, prevStep } = useBookingStore();
  // NOTE: Inicializar con fecha actual sin la hora para evitar saltos inesperados
  const initialDate = new Date();
  initialDate.setHours(0, 0, 0, 0);
  const [date, setDate] = useState(initialDate); // Fecha seleccionada por el usuario (solo día)
  const [selectedTime, setSelectedTime] = useState<string | null>(null); // Hora seleccionada 'HH:MM' (24h)
  const [busySlotsISO, setBusySlotsISO] = useState<string[]>([]); // Almacenar horas ocupadas en ISO UTC
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [fetchError, setFetchError] = useState<string | null>(null); // Estado de error

  useEffect(() => {
    const fetchAvailability = async () => {
      setIsLoading(true); // Iniciar carga
      setFetchError(null); // Resetear error
      // Crear rango de fechas en UTC para la API de Google Calendar
      const startOfDayUTC = new Date(date);
      startOfDayUTC.setUTCHours(0, 0, 0, 0);
      const startOfDayISO = startOfDayUTC.toISOString();

      const endOfDayUTC = new Date(date);
      endOfDayUTC.setUTCHours(23, 59, 59, 999);
      const endOfDayISO = endOfDayUTC.toISOString();

      setSelectedTime(null); // Resetear selección al cambiar fecha
      setBusySlotsISO([]); // Resetear horas ocupadas

      try {
        // Usar la función real o el mock
        const result = await get_calendar_availability_mock({ start: startOfDayISO, end: endOfDayISO });
        // const result = await get_calendar_availability({ start: startOfDayISO, end: endOfDayISO });

        if (result.busy && Array.isArray(result.busy)) {
          // Guardar solo la hora de inicio (en ISO UTC) de los slots ocupados
          const busyStartTimes = result.busy.map(slot => slot.start);
          setBusySlotsISO(busyStartTimes);
        } else if (result.error) {
          console.error("Error fetching availability:", result.error);
          setFetchError("Could not load available times. Please try again later.");
        }
      } catch (error) {
         console.error("Network or other error fetching availability:", error);
         setFetchError("Failed to connect. Please check your connection and try again.");
      } finally {
         setIsLoading(false); // Finalizar carga
      }
    };
    fetchAvailability();
  }, [date]); // Re-ejecutar cuando cambie la fecha seleccionada

  // Definición de slots: display (12h AM/PM), value (24h HH:MM)
  const timeSlots = [
    { display: '9:00 AM', value: '09:00' }, { display: '10:00 AM', value: '10:00' }, { display: '11:00 AM', value: '11:00' },
    { display: '12:00 PM', value: '12:00' }, { display: '1:00 PM', value: '13:00' }, { display: '2:00 PM', value: '14:00' },
    { display: '3:00 PM', value: '15:00' }, { display: '4:00 PM', value: '16:00' }, { display: '5:00 PM', value: '17:00' }
  ];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = e.target.value; // YYYY-MM-DD
    const [year, month, day] = dateString.split('-').map(Number);
    // Crear fecha asegurando zona horaria local
    setDate(new Date(year, month - 1, day));
  };

  const handleSlotSelect = (timeValue: string) => { // Recibe 'HH:MM'
    setSelectedTime(timeValue);
    const [hours, minutes] = timeValue.split(':').map(Number);
    // Crear el objeto Date usando la fecha seleccionada (que ya está en zona local sin hora)
    // y añadir la hora/minutos seleccionados
    const selectedDateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);
    setSlot(selectedDateTime); // Actualizar Zustand con el objeto Date completo (zona local)
  };

  // Función para verificar si un slot está ocupado comparando con UTC
  const isSlotBusy = (timeValue: string): boolean => {
    const [hours, minutes] = timeValue.split(':').map(Number);
    // Crear hora de inicio del slot en UTC para comparar con las de Google Calendar
    const slotStartTimeUTC = new Date(date);
    slotStartTimeUTC.setUTCHours(hours, minutes, 0, 0);
    const slotStartTimeISO = slotStartTimeUTC.toISOString();

    // Comprobar si la hora de inicio (UTC) coincide con alguna hora ocupada (UTC)
    return busySlotsISO.some(busyISO => busyISO === slotStartTimeISO);
  };

  // Obtener fecha de hoy para 'min'
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = today.toISOString().split('T')[0];

  // Formatear la fecha actual para el defaultValue del input
  const defaultDateValue = date.toLocaleDateString('en-CA'); // Formato 'yyyy-mm-dd'

  return (
    <div className="bg-white p-6 md:p-10 rounded-lg shadow-xl max-w-2xl mx-auto text-soft-black">
      <button onClick={prevStep} className="mb-6 text-sm text-gray-500 hover:text-primary">&larr; {dictionary.back_button}</button>
      <h2 className="text-3xl font-bold font-serif text-center text-primary mb-8">{dictionary.step2_title}</h2>
      <div className="flex flex-col items-center space-y-8">
        <input
          type="date"
          value={defaultDateValue} // Usar value para controlar el input
          min={minDate}
          onChange={handleDateChange}
          className="p-3 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
          aria-label="Select date"
        />
        {isLoading && <p className="text-gray-500">Loading availability...</p>}
        {fetchError && <p className="text-red-600">{fetchError}</p>}
        {!isLoading && !fetchError && (
          <div className="grid grid-cols-3 gap-3 md:gap-4 w-full max-w-md">
            {timeSlots.map(slot => {
              const busy = isSlotBusy(slot.value);
              return (
                <button
                  key={slot.value}
                  onClick={() => handleSlotSelect(slot.value)}
                  disabled={busy}
                  className={`
                    p-3 md:p-4 border rounded-lg text-base md:text-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                    ${busy
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed line-through'
                      : selectedTime === slot.value
                        ? 'bg-primary text-white border-primary ring-2 ring-primary ring-offset-2'
                        : 'bg-white text-primary border-gray-300 hover:bg-primary/10 hover:border-primary'
                    }
                  `}
                >
                  {slot.display} {/* Muestra 9:00 AM */}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}