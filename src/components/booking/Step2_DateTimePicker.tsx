"use client";

import { useBookingStore } from "@/lib/store";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "../../../i18n.config";
import { useEffect, useState } from "react";
import { get_calendar_availability } from "@/lib/google-calendar";

type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

type Step2Props = {
  lang: Locale;
  dictionary: Dictionary['booking'];
};

export default function Step2_DateTimePicker({ lang, dictionary }: Step2Props) {
  const { setSlot, prevStep } = useBookingStore();
  const [date, setDate] = useState(new Date());
  const [busySlots, setBusySlots] = useState<any[]>([]);

  useEffect(() => {
    const fetchAvailability = async () => {
      const startOfDay = new Date(date.setHours(0, 0, 0, 0)).toISOString();
      const endOfDay = new Date(date.setHours(23, 59, 59, 999)).toISOString();
      const { busy } = await get_calendar_availability({ start: startOfDay, end: endOfDay });
      if (busy) {
        setBusySlots(busy);
      }
    };
    fetchAvailability();
  }, [date]);

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(e.target.value));
  };

  const handleSlotSelect = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const selectedDate = new Date(date);
    selectedDate.setHours(hours, minutes);
    setSlot(selectedDate);
  };

  return (
    <div>
      <button onClick={prevStep} className="mb-4 text-sm text-gray-600">&larr; Back</button>
      <h2 className="text-3xl font-bold text-center mb-8">{dictionary.step2_title}</h2>
      <div className="flex flex-col items-center">
        <input type="date" onChange={handleDateChange} className="p-2 border rounded-md mb-8" />
        <div className="grid grid-cols-3 gap-4">
          {timeSlots.map(time => (
            <button
              key={time}
              onClick={() => handleSlotSelect(time)}
              className="p-4 border rounded-lg text-lg font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}