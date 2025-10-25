// RUTA: src/components/booking/Step3_UserInfoForm.tsx (ACTUALIZADO)
"use client";

import { useBookingStore } from "@/lib/store";
import { useForm } from "react-hook-form";
import { Locale } from "../../i18n.config";
import { useState } from "react"; // Para estado de carga/mensaje
// FIX: Importar la Server Action
import { sendBookingEmail } from "@/actions/sendBookingEmail";

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
    submitting: string; // Texto mientras envía
    success_message: string; // Mensaje de éxito
    error_message: string; // Mensaje de error genérico
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
  // FIX: Obtener datos del store y controlar estado local
  const { prevStep, reset, selectedService, selectedSlot } = useBookingStore();
  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null); // Resetear estado

    // Validar que tengamos servicio y slot del store
    if (!selectedService || !selectedSlot) {
      setSubmitStatus({ success: false, message: "Missing service or time slot selection." });
      setIsSubmitting(false);
      return;
    }

    // Llamar a la Server Action
    const result = await sendBookingEmail({
      ...data,
      service: selectedService, // Añadir servicio
      slot: selectedSlot,     // Añadir slot (es un objeto Date)
    });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitStatus({ success: true, message: formDictionary.success_message || "Appointment requested successfully!" });
      // Opcional: Resetear el formulario y el store después de un breve delay
      setTimeout(() => {
        reset(); // Resetea el store de Zustand (vuelve al paso 1)
        // Podrías querer resetear solo el formulario aquí si prefieres
      }, 3000); // Espera 3 segundos antes de resetear
    } else {
        // Mostrar error genérico o errores específicos si la acción los devuelve
        let errorMessage = result.error || formDictionary.error_message || "An error occurred.";
        // Si hay errores de validación específicos, podrías mostrarlos (opcional)
        // if (result.errors) {
        //    Object.entries(result.errors).forEach(([field, messages]) => {
        //        if (messages && messages.length > 0) {
        //            setError(field as keyof FormData, { type: 'server', message: messages[0] });
        //        }
        //    });
        //    errorMessage = "Please correct the errors above."; // Mensaje más específico
        // }
      setSubmitStatus({ success: false, message: errorMessage });
    }
  };

  // No mostrar el formulario si ya se envió con éxito
  if (submitStatus?.success) {
      return (
          <div className="text-center py-10">
              <h2 className="text-2xl font-semibold text-green-600 mb-4">¡Éxito!</h2>
              <p>{submitStatus.message}</p>
              {/* Podrías añadir un botón para volver al inicio */}
          </div>
      );
  }


  return (
    <div>
      <button onClick={prevStep} className="mb-4 text-sm text-gray-600 disabled:opacity-50" disabled={isSubmitting}>&larr; {dictionary.back_button}</button>
      <h2 className="text-3xl font-bold text-center mb-8">{dictionary.step3_title}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        {/* Campos del formulario (sin cambios) */}
        <div className="mb-4"> <label htmlFor="name" className="block mb-2">{formDictionary.name}</label> <input {...register("name", { required: formDictionary.errors.required })} id="name" className="w-full p-2 border rounded-md transition-colors duration-300 ease-in-out focus:border-primary focus:ring-1 focus:ring-primary disabled:bg-gray-100" disabled={isSubmitting} /> {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>} </div>
        <div className="mb-4"> <label htmlFor="email" className="block mb-2">{formDictionary.email}</label> <input {...register("email", { required: formDictionary.errors.required, pattern: { value: /^\S+@\S+$/i, message: formDictionary.errors.invalid_email } })} id="email" type="email" className="w-full p-2 border rounded-md transition-colors duration-300 ease-in-out focus:border-primary focus:ring-1 focus:ring-primary disabled:bg-gray-100" disabled={isSubmitting} /> {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>} </div>
        <div className="mb-4"> <label htmlFor="phone" className="block mb-2">{formDictionary.phone}</label> <input {...register("phone", { required: formDictionary.errors.required })} id="phone" type="tel" className="w-full p-2 border rounded-md transition-colors duration-300 ease-in-out focus:border-primary focus:ring-1 focus:ring-primary disabled:bg-gray-100" disabled={isSubmitting} /> {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>} </div>

        {/* Mensaje de estado de envío */}
        {submitStatus && (
            <p className={`mb-4 text-center text-sm ${submitStatus.success ? 'text-green-600' : 'text-red-600'}`}>
                {submitStatus.message}
            </p>
        )}

        <button type="submit" className="w-full p-3 bg-primary text-white rounded-md font-bold hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed" disabled={isSubmitting}>
          {isSubmitting ? (formDictionary.submitting || 'Sending...') : formDictionary.submit}
        </button>
      </form>
    </div>
  );
}