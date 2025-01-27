import { create } from "zustand";
import { RamadhanSearchLocationProps } from "../network/types/response-props";

interface SearchLocationProps {
  data?: RamadhanSearchLocationProps;
  setData: (data: RamadhanSearchLocationProps) => void;
}

export const useRamadhanSearchLocation = create<SearchLocationProps>()(
  (set) => ({
    setData: (data: RamadhanSearchLocationProps) => set(() => ({ data })),
  })
);

interface PrayerNotificationProps {
  isActive?: boolean;
  setIsActive: (isActive: boolean) => void;
}

export const usePrayerNotification = create<PrayerNotificationProps>()(
  (set) => ({
    isActive: false,
    setIsActive: (isActive: boolean) => set(() => ({ isActive })),
  })
);
