import { create } from "zustand";
import {
  RamadhanSearchLocationProps,
  StampMissionListDataMission,
} from "../network/types/response-props";
import {
  getCurrentDayRamadhan,
  getCurrentWeekRamadhan,
  TaroStorage,
} from "../lib/utils";
import { createJSONStorage, persist } from "zustand/middleware";

interface SearchLocationProps {
  data?: RamadhanSearchLocationProps;
  setData: (data: RamadhanSearchLocationProps) => void;
}

export const useHistoryRamadhanSearchLocation = create<SearchLocationProps>()(
  persist(
    (set) => ({
      setData: (data: RamadhanSearchLocationProps) => set(() => ({ data })),
    }),
    {
      name: "history-ramadhan-search-location",
      storage: createJSONStorage(() => TaroStorage),
      version: 1,
    }
  )
);
export const useRamadhanSearchLocation = create<SearchLocationProps>()(
  (set) => ({
    setData: (data: RamadhanSearchLocationProps) => set(() => ({ data })),
  })
);

export interface DataDetailTaskRamadhanProps
  extends StampMissionListDataMission {}
interface DetailTaskRamadhanStateProps {
  data?: DataDetailTaskRamadhanProps;
  setData: (data: DataDetailTaskRamadhanProps) => void;
}

export const useDetailTaskRamadhan = create<DetailTaskRamadhanStateProps>()(
  (set) => ({
    setData: (data: DataDetailTaskRamadhanProps) => set(() => ({ data })),
  })
);

export interface DataCatatanIbadahProps {
  currentDay: string;
  currentView: "all" | "weekly";
  currentWeek: number;
  setCurrentDay: (day: string) => void;
  setCurrentView: (view: "all" | "weekly") => void;
  setCurrentWeek: (value: number) => void;
}

export const useDataCatatanIbadah = create<DataCatatanIbadahProps>()((set) => ({
  currentDay: getCurrentDayRamadhan() as string,
  currentView: "weekly",
  currentWeek: getCurrentWeekRamadhan(getCurrentDayRamadhan()) as number,
  setCurrentDay: (day: string) => set(() => ({ currentDay: day })),
  setCurrentView: (view: "all" | "weekly") =>
    set(() => ({ currentView: view })),
  setCurrentWeek: (value: number) => set(() => ({ currentWeek: value })),
}));

export type PrayerStatus = "adzan" | "bedug" | "notifikasi" | "tidak-aktif";

interface Prayer {
  id: number;
  name: string;
  time: string | undefined;
  status: PrayerStatus;
  isReminderActive: boolean;
  reminderTime?: "5min" | "10min" | "15min" | "";
}

interface PrayerNotificationProps {
  isActive?: boolean;
  setIsActive: (isActive: boolean) => void;
  prayerData: Prayer[];
  setPrayerData: (payload: Prayer[]) => void;
  updatePrayerStatus: (index: number, status: PrayerStatus) => void;
}

export const usePrayerNotification = create<PrayerNotificationProps>()(
  (set) => ({
    isActive: false,
    setIsActive: (isActive: boolean) => set(() => ({ isActive })),
    setPrayerData: (prayers: Prayer[]) =>
      set(() => ({
        prayerData: prayers,
      })),

    prayerData: [
      // {
      //   id: 1,
      //   name: "Imsak",
      //   time: "04:06",
      //   status: "notifikasi",
      //   isReminderActive: false,
      //   reminderTime: "",
      // },
      // {
      //   id: 2,
      //   name: "Subuh",
      //   time: "04:16",
      //   status: "notifikasi",
      //   isReminderActive: false,
      //   reminderTime: "",
      // },
      // {
      //   id: 3,
      //   name: "Zuhur",
      //   time: "11:40",
      //   status: "notifikasi",
      //   isReminderActive: false,
      //   reminderTime: "",
      // },
      // {
      //   id: 4,
      //   name: "Ashar",
      //   time: "15:10",
      //   status: "notifikasi",
      //   isReminderActive: false,
      //   reminderTime: "",
      // },
      // {
      //   id: 5,
      //   name: "Maghrib",
      //   time: "17:50",
      //   status: "notifikasi",
      //   isReminderActive: false,
      // },
      // {
      //   id: 6,
      //   name: "Isya",
      //   time: "19:05",
      //   status: "notifikasi",
      //   isReminderActive: false,
      //   reminderTime: "",
      // },
    ],
    updatePrayerStatus: (id, status) =>
      set((state) => {
        const updatedPrayerData = state.prayerData.map((prayer) =>
          prayer.id === id ? { ...prayer, status } : prayer
        );
        return { prayerData: updatedPrayerData };
      }),
  })
);
