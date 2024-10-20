import { AutoCompleteDropdownOptionProps } from "../../components/AutocompleteInput/components/Dropdown/Dropdown";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// type data AutoCompleteDropdownOptionProps akan diubah ketika udah ada response api

interface FlighSearchHistoryState {
  travelSearchHistory?: AutoCompleteDropdownOptionProps[];
  removeTravelSearchHistory: () => void;
  addTravelSearchHistory: (history: AutoCompleteDropdownOptionProps) => void;
}

export const useTravelSearchHistory = create<FlighSearchHistoryState>()(
  persist(
    (set, get) => ({
      travelSearchHistory: [],
      removeTravelSearchHistory: () => set(() => ({ travelSearchHistory: [] })),
      addTravelSearchHistory: (history: AutoCompleteDropdownOptionProps) => {
        const previousSearchHistory: AutoCompleteDropdownOptionProps[] =
          get()?.travelSearchHistory ?? [];

        const isUniqueData = ![...previousSearchHistory]?.find(
          (data) => data?.title === history?.title
        );

        if (isUniqueData) {
          const travelHistory = [history, ...previousSearchHistory]?.slice(
            0,
            5
          );
          return set(() => ({ travelSearchHistory: travelHistory }));
        }

        set(() => ({ travelSearchHistory: previousSearchHistory }));
      },
    }),
    {
      name: "travel-search-history",
      version: 1, //force clear prev storage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export interface PriceRangeStateProps {
  startPrice: number | undefined;
  endPrice: number | undefined;
}

export interface TravelFilterDataProps {
  airline: string;
  priceRange: PriceRangeStateProps;
  transit: string;
  departureTime: string;
  arrivalTime: string;
  setAirline: (airline: string) => void;
  setPriceRange: (price: PriceRangeStateProps) => void;
  setTransit: (transit: string) => void;
  setDepartureTime: (departureTime: string) => void;
  setArrivalTime: (arrivalTime: string) => void;
  resetFilterData: () => void;
}

export const useTravelFilterFlightData = create<TravelFilterDataProps>()(
  (set) => ({
    airline: "",
    transit: "",
    departureTime: "",
    arrivalTime: "",
    priceRange: {
      startPrice: undefined,
      endPrice: undefined,
    },
    setAirline: (airline) => set(() => ({ airline })),
    setTransit: (transit) => set(() => ({ transit })),
    setDepartureTime: (departureTime) => set(() => ({ departureTime })),
    setArrivalTime: (arrivalTime) => set(() => ({ arrivalTime })),
    setPriceRange: (priceRange: PriceRangeStateProps) =>
      set(() => ({ priceRange })),
    resetFilterData: () =>
      set(() => ({
        transit: "",
        priceRange: {
          startPrice: undefined,
          endPrice: undefined,
        },
      })),
  })
);

export interface PassengerDetailProps {
  firstName: string;
  lastName: string;
  salutation: string;
  birthDate: Date | undefined;
  nationality: string;
}

export interface PassengerListProps {
  passengers: PassengerDetailProps[];
  setPassengers: (passengers: PassengerDetailProps[]) => void;
  setPassenger: (index: number, passenger: PassengerDetailProps) => void;
}

export const usePassengers = create<PassengerListProps>()((set) => ({
  passengers: [] as PassengerDetailProps[],
  setPassenger: (index: number, passenger: PassengerDetailProps) =>
    set((state) => {
      const updatedPassengers = [...state.passengers];
      if (index < 0 || index > updatedPassengers.length) {
        return state;
      }
      if (index === updatedPassengers.length) {
        updatedPassengers.push(passenger);
      } else {
        updatedPassengers[index] = passenger;
      }
      return {
        passengers: updatedPassengers,
      };
    }),
  setPassengers: (passengers: PassengerDetailProps[]) =>
    set(() => ({ passengers })),
}));

export interface OrdererDataProps {
  name?: string;
  phoneNumber?: string;
  email?: string;
}
export interface OrdererStateProps {
  orderer?: OrdererDataProps;
  setOrderer: (data: OrdererDataProps) => void;
  resetOrdererData: () => void;
}

export const useOrdererData = create<OrdererStateProps>()((set) => ({
  orderer: undefined,
  setOrderer: (data: OrdererDataProps) => set(() => ({ orderer: data })),
  resetOrdererData: () =>
    set(() => ({
      orderer: undefined,
    })),
}));
