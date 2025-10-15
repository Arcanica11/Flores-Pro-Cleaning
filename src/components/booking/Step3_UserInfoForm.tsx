"use client";

import { useBookingStore } from "@/lib/store";
import { useForm } from "react-hook-form";
import { Locale } from "@/languages.config";

type Step3Props = {
  lang: Locale;
  dictionary: {
    step3_title: string;
    back_button: string;
  };
  formDictionary: {
    name: string;
    email: string;
    phone: string;
    submit: string;
    errors: {
      required: string;
      invalid_email: string;
    };
  };
};

type FormData = {
  name: string;
  email: string;
  phone: string;
};

export default function Step3_UserInfoForm({ lang, dictionary, formDictionary }: Step3Props) {
  const { prevStep, reset } = useBookingStore();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    alert('Form submitted (simulation). Thank you!');
    reset();
  };

  return (
    <div>
      <button onClick={prevStep} className="mb-4 text-sm text-gray-600">&larr; {dictionary.back_button}</button>
      <h2 className="text-3xl font-bold text-center mb-8">{dictionary.step3_title}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">{formDictionary.name}</label>
          <input {...register("name", { required: true })} id="name" className="w-full p-2 border rounded-md transition-colors duration-300 ease-in-out focus:border-primary focus:ring-1 focus:ring-primary" />
          {errors.name && <span className="text-red-500 text-sm">{formDictionary.errors.required}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">{formDictionary.email}</label>
          <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} id="email" className="w-full p-2 border rounded-md transition-colors duration-300 ease-in-out focus:border-primary focus:ring-1 focus:ring-primary" />
          {errors.email && <span className="text-red-500 text-sm">{formDictionary.errors.invalid_email}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2">{formDictionary.phone}</label>
          <input {...register("phone", { required: true })} id="phone" className="w-full p-2 border rounded-md transition-colors duration-300 ease-in-out focus:border-primary focus:ring-1 focus:ring-primary" />
          {errors.phone && <span className="text-red-500 text-sm">{formDictionary.errors.required}</span>}
        </div>
        <button type="submit" className="w-full p-3 bg-primary text-white rounded-md font-bold hover:bg-primary/90">
          {formDictionary.submit}
        </button>
      </form>
    </div>
  );
}