// RUTA: src/actions/sendBookingEmail.ts (NUEVO ARCHIVO)
'use server'; // Marcar como Server Action

import { Resend } from 'resend';
import { z } from 'zod';

// Esquema de validación para los datos esperados
const BookingSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  service: z.string().min(1, 'Service is required'),
  slot: z.date({ message: 'Valid date/time slot is required' }),
});

// Inicializar Resend con la API Key del entorno
const resend = new Resend(process.env.RESEND_API_KEY);

// La función Server Action
export async function sendBookingEmail(formData: {
  name: string;
  email: string;
  phone: string;
  service: string;
  slot: Date;
}) {
  // 1. Validar los datos recibidos
  const validatedFields = BookingSchema.safeParse(formData);

  if (!validatedFields.success) {
    console.error('Validation Errors:', validatedFields.error.flatten().fieldErrors);
    return { success: false, error: 'Invalid form data provided.', errors: validatedFields.error.flatten().fieldErrors };
  }

  const { name, email, phone, service, slot } = validatedFields.data;

  // 2. Formatear la fecha/hora para el correo
  const formattedSlot = slot.toLocaleString('en-US', { // O 'es-ES' si prefieres español
    dateStyle: 'full',
    timeStyle: 'short',
    // timeZone: 'America/New_York', // Especifica la zona horaria si es necesario
  });

  // 3. Obtener correos de origen y destino del entorno
  const emailFrom = process.env.EMAIL_FROM;
  const emailTo = process.env.EMAIL_TO;

  if (!emailFrom || !emailTo) {
      console.error('Missing EMAIL_FROM or EMAIL_TO environment variables');
      return { success: false, error: 'Server configuration error.' };
  }

  // 4. Intentar enviar el correo
  try {
    const { data, error } = await resend.emails.send({
      from: emailFrom, // Ej: 'Flores Pro Cleaning <booking@yourdomain.com>' o 'onboarding@resend.dev'
      to: [emailTo],   // Correo de destino
      subject: `New Booking Request - ${service}`,
      html: `
        <h1>New Booking Estimate Request</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Requested Service:</strong> ${service}</p>
        <p><strong>Requested Time Slot:</strong> ${formattedSlot}</p>
      `,
      // Opcional: Responder al cliente
      // reply_to: email,
    });

    if (error) {
      console.error('Resend Error:', error);
      return { success: false, error: 'Failed to send email.' };
    }

    console.log('Email sent successfully:', data);
    return { success: true, message: 'Booking request sent successfully!' };

  } catch (exception) {
    console.error('Exception sending email:', exception);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}