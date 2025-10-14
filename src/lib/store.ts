import { create } from 'zustand';

type UserInfo = {
  name: string;
  email: string;
  phone: string;
};

type BookingState = {
  currentStep: number;
  selectedService: string | null;
  selectedSlot: Date | null;
  userInfo: UserInfo | null;
  setService: (service: string) => void;
  setSlot: (slot: Date) => void;
  setUserInfo: (info: UserInfo) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  currentStep: 1,
  selectedService: null,
  selectedSlot: null,
  userInfo: null,
  setService: (service) => set({ selectedService: service, currentStep: 2 }),
  setSlot: (slot) => set({ selectedSlot: slot, currentStep: 3 }),
  setUserInfo: (info) => set({ userInfo: info }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  reset: () => set({ currentStep: 1, selectedService: null, selectedSlot: null, userInfo: null }),
}));