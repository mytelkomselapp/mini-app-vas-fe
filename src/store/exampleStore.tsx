import { create } from "zustand";
import { TaroStorage } from "../core/storage";
import { createJSONStorage, persist } from "zustand/middleware";

/** This file is used for saving persist data and state management, we are use zustand for state management */

interface ExampleState {
  sample: number;
  increase: (by: number) => void;
}

export const useExampleState = create<ExampleState>()((set) => ({
  sample: 0,
  increase: (by) => set((state) => ({ sample: state.sample + by })),
}));

/** Persist state is when you want to save data that remains even after refreshing or reopening the app, as the state is stored in localStorage. */
interface ExamplePersistState {
  token: string;
  setToken: (token: string) => void;
}

export const useExamplePersistState = create<ExamplePersistState>()(
  persist(
    (set) => ({
      token: "",
      setToken: (token: string) => set(() => ({ token })),
    }),
    {
      name: "example-persist-state",
      storage: createJSONStorage(() => TaroStorage),
      version: 1, // versioning of your persist state, if you change the version, previous data of the version will expired
    }
  )
);
