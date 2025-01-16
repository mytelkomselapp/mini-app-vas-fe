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
