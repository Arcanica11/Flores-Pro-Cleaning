"use server";

import { google } from 'googleapis';
import { z } from 'zod';

const calendarId = process.env.GOOGLE_CALENDAR_ID;

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

const calendar = google.calendar({ version: 'v3', auth });

const DateRangeSchema = z.object({
  start: z.string().datetime(),
  end: z.string().datetime(),
});

export async function get_calendar_availability(dateRange: { start: string; end: string }) {
  const validation = DateRangeSchema.safeParse(dateRange);
  if (!validation.success) {
    return { error: 'Invalid date range provided.' };
  }

  try {
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: dateRange.start,
        timeMax: dateRange.end,
        items: [{ id: calendarId }],
      },
    });

    if (!response.data.calendars || !response.data.calendars[calendarId!]) {
      return { busy: [] };
    }

    const busySlots = response.data.calendars[calendarId!].busy;
    return { busy: busySlots };
  } catch (error) {
    console.error('Error fetching free/busy slots:', error);
    return { error: 'Failed to fetch calendar availability.' };
  }
}

const AppointmentDataSchema = z.object({
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  summary: z.string(),
  description: z.string(),
  attendeeEmail: z.string().email(),
});

export async function create_calendar_appointment(appointmentData: {
  startTime: string;
  endTime: string;
  summary: string;
  description: string;
  attendeeEmail: string;
}) {
  const validation = AppointmentDataSchema.safeParse(appointmentData);
  if (!validation.success) {
    return { success: false, error: 'Invalid appointment data provided.' };
  }

  const { startTime, endTime, summary, description, attendeeEmail } = appointmentData;

  try {
    // Final check to ensure the slot is still free
    const availability = await get_calendar_availability({ start: startTime, end: endTime });
    if ('error' in availability || (availability.busy && availability.busy.length > 0)) {
        return { success: false, error: 'The selected time slot is no longer available.' };
    }

    const event = {
      summary,
      description,
      start: {
        dateTime: startTime,
        timeZone: 'America/New_York',
      },
      end: {
        dateTime: endTime,
        timeZone: 'America/New_York',
      },
      attendees: [{ email: attendeeEmail }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 10 },
        ],
      },
    };

    const createdEvent = await calendar.events.insert({
      calendarId: calendarId,
      requestBody: event,
      sendNotifications: true,
    });

    return { success: true, event: createdEvent.data };
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return { success: false, error: 'Failed to create appointment.' };
  }
}