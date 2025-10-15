import { getDictionary } from '@/lib/dictionary';
import { Locale } from '@/languages.config';
import BookingClientPage from './booking-client-page';

export default async function BookingPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dict = await getDictionary(lang);

  return <BookingClientPage lang={lang} dictionary={dict} />;
}