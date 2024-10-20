import { create } from "zustand";

interface SampleState {
  sample: number;
  increase: (by: number) => void;
}

export const useSampleStore = create<SampleState>()((set) => ({
  sample: 0,
  increase: (by) => set((state) => ({ sample: state.sample + by })),
}));
