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

export type PrayerStatus = "adzan" | "bedug" | "notifikasi" | "tidak-aktif"

interface Prayer {
  id: number
  name: string;
  time: string;
  status: PrayerStatus;
  isReminderActive: boolean;
  reminderTime?: '5min' | '10min' | '15min' | ''
}

interface PrayerNotificationProps {
  isActive?: boolean;
  setIsActive: (isActive: boolean) => void;
  prayerData: Prayer[];
  updatePrayerStatus: (index: number, status: PrayerStatus) => void;
}

export const usePrayerNotification = create<PrayerNotificationProps>()((set) => ({
  isActive: false,
  setIsActive: (isActive: boolean) => set(() => ({ isActive })),
  prayerData: [
    { id: 1,name: "Imsak", time: "04:06", status: "notifikasi", isReminderActive: false, reminderTime: '' },
    { id: 2,name: "Subuh", time: "04:16", status: "notifikasi", isReminderActive: false, reminderTime: '' },
    { id: 3,name: "Zuhur", time: "11:40", status: "notifikasi", isReminderActive: false, reminderTime: '' },
    { id: 4,name: "Ashar", time: "15:10", status: "notifikasi", isReminderActive: false, reminderTime: '' },
    { id: 5,name: "Maghrib", time: "17:50", status: "notifikasi", isReminderActive: false },
    { id: 6,name: "Isya", time: "19:05", status: "notifikasi", isReminderActive: false, reminderTime: '' },
  ],
  updatePrayerStatus: (id, status) =>
    set((state) => {
      const updatedPrayerData = state.prayerData.map((prayer) =>
        prayer.id === id ? { ...prayer, status } : prayer
      );
      return { prayerData: updatedPrayerData };
    }),
}));
