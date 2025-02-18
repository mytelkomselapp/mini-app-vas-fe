import { create } from "zustand";
import {
  DzikirCMSData,
  RamadhanSearchLocationProps,
  StampMissionListDataMission,
  RewardItemData,
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

interface DzikirProps {
  data?: DzikirCMSData[];
  setData: (data: DzikirCMSData[]) => void;
}

export const useDzikirDetail = create<DzikirProps>()((set) => ({
  setData: (data: DzikirCMSData[]) => set(() => ({ data })),
}));

export interface MerchandiseFormError {
  fullName: string;
  phoneNumber: string;
  province: string;
  city: string;
  subdistrict: string;
  zipcode: string;
  address: string;
  email: string;
  labelAddress: string;
}

export interface MerchandiseFormState {
  fullName: string;
  phoneNumber: string;
  province: string;
  city: string;
  subdistrict: string;
  zipcode: string;
  address: string;
  email: string;
  labelAddress: string;
  error: MerchandiseFormError;
  getHasData: () => boolean;
  setError: (error: MerchandiseFormError) => void;
  setFullName: (fullName: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setProvince: (province: string) => void;
  setCity: (city: string) => void;
  setSubdistrict: (subdistrict: string) => void;
  setZipcode: (zipcode: string) => void;
  setAddress: (address: string) => void;
  setEmail: (email: string) => void;
  setLabelAddress: (labelAddress: string) => void;
  resetMerchandiseForm: () => void;
}

export const useMerchandiseForm = create<MerchandiseFormState>()(
  (set, get) => ({
    fullName: "",
    phoneNumber: "",
    province: "",
    city: "",
    subdistrict: "",
    zipcode: "",
    address: "",
    email: "",
    labelAddress: "",
    error: {
      fullName: "",
      phoneNumber: "",
      province: "",
      city: "",
      subdistrict: "",
      zipcode: "",
      address: "",
      email: "",
      labelAddress: "",
    },
    getHasData: () => {
      const state = get();
      return !!(
        state.fullName ||
        state.phoneNumber ||
        state.province ||
        state.city ||
        state.subdistrict ||
        state.zipcode ||
        state.address ||
        state.email ||
        state.labelAddress
      );
    },
    setError: (error: MerchandiseFormError) => set(() => ({ error })),
    setFullName: (fullName: string) => set(() => ({ fullName })),
    setPhoneNumber: (phoneNumber: string) => set(() => ({ phoneNumber })),
    setProvince: (province: string) => set(() => ({ province })),
    setCity: (city: string) => set(() => ({ city })),
    setSubdistrict: (subdistrict: string) => set(() => ({ subdistrict })),
    setZipcode: (zipcode: string) => set(() => ({ zipcode })),
    setAddress: (address: string) => set(() => ({ address })),
    setEmail: (email: string) => set(() => ({ email })),
    setLabelAddress: (labelAddress: string) => set(() => ({ labelAddress })),
    resetMerchandiseForm: () =>
      set(() => ({
        fullName: "",
        phoneNumber: "",
        province: "",
        city: "",
        subdistrict: "",
        zipcode: "",
        address: "",
        email: "",
        labelAddress: "",
        error: {
          fullName: "",
          phoneNumber: "",
          province: "",
          city: "",
          subdistrict: "",
          zipcode: "",
          address: "",
          email: "",
          labelAddress: "",
        },
      })),
  })
);

interface CurrentSelectedRewardState {
  currentSelectedReward?: RewardItemData;
  setCurrentSelectedReward: (reward: RewardItemData) => void;
}

export const useCurrentSelectedReward = create<CurrentSelectedRewardState>(
  (set) => ({
    setCurrentSelectedReward: (reward: RewardItemData) => {
      set(() => ({ currentSelectedReward: reward }));
      if (reward) {
        useSelectedRewardList
          .getState()
          .setSelectedRewardList([
            ...useSelectedRewardList.getState().selectedRewardList,
            reward,
          ]);
      }
    },
  })
);

interface SelectedRewardListState {
  selectedRewardList: RewardItemData[];
  setSelectedRewardList: (rewardList: RewardItemData[]) => void;
}

export const useSelectedRewardList = create<SelectedRewardListState>((set) => ({
  selectedRewardList: [],
  setSelectedRewardList: (rewardList: RewardItemData[]) =>
    set(() => ({ selectedRewardList: rewardList })),
}));
