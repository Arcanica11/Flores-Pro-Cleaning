"use client"; // <-- CRITICAL: ADD THIS LINE

import { useBookingStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import Step1_ServiceSelector from "@/components/booking/Step1_ServiceSelector";
import Step2_DateTimePicker from "@/components/booking/Step2_DateTimePicker";
import Step3_UserInfoForm from "@/components/booking/Step3_UserInfoForm";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

export default function BookingClientPage({ lang, dictionary }: { lang: Locale, dictionary: Dictionary }) {
  const { currentStep } = useBookingStore();

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? "100%" : "-100%", opacity: 0 }),
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <AnimatePresence initial={false} custom={1}>
        <motion.div
          key={currentStep}
          custom={1}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
        >
          {currentStep === 1 && <Step1_ServiceSelector lang={lang} dictionary={dictionary.booking} />}
          {currentStep === 2 && <Step2_DateTimePicker lang={lang} dictionary={dictionary.booking} />}
          {currentStep === 3 && <Step3_UserInfoForm lang={lang} dictionary={dictionary.booking} formDictionary={dictionary.form} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}