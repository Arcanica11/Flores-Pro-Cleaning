"use client";

import { useBookingStore } from "@/lib/store";
import { useForm } from "react-hook-form";
import { getDictionary } from "@/lib/dictionary";
import { useEffect, useState } from "react";
import { create_calendar_appointment } from "@/lib/google-calendar";

type Step3Props = {
  lang: 'es' | 'en';
};

type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

type FormData = {
  name: string;
  email: string;
  phone: string;
};

export default function Step3_UserInfoForm({ lang }: Step3Props) {
  const { selectedService, selectedSlot, prevStep, reset } = useBookingStore();
  const [dict, setDict] = useState<Dictionary | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  useEffect(() => {
    const fetchDict = async () => {
      const d = await getDictionary(lang);
      setDict(d);
    };
    fetchDict();
  }, [lang]);

  const onSubmit = async (data: FormData) => {
    alert('Form submitted (simulation). Thank you!');
    reset();
  };

  if (!dict) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={prevStep} className="mb-4 text-sm text-gray-600">&larr; Back</button>
      <h2 className="text-3xl font-bold text-center mb-8">{dict.booking.step3_title}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">{dict.form.name}</label>
          <input {...register("name", { required: true })} id="name" className="w-full p-2 border rounded-md" />
          {errors.name && <span className="text-red-500 text-sm">This field is required</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">{dict.form.email}</label>
          <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} id="email" className="w-full p-2 border rounded-md" />
          {errors.email && <span className="text-red-500 text-sm">Please enter a valid email</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2">{dict.form.phone}</label>
          <input {...register("phone", { required: true })} id="phone" className="w-full p-2 border rounded-md" />
          {errors.phone && <span className="text-red-500 text-sm">This field is required</span>}
        </div>
        <button type="submit" className="w-full p-3 bg-primary text-white rounded-md font-bold hover:bg-primary/90">
          {dict.form.submit}
        </button>
      </form>
    </div>
  );
}