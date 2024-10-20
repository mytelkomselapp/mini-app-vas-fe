import { FollowFlightPayloadProps } from "../../network/types/request-payload";
import {
  CMSFlightLandingPopularCitiesSection,
  FlightETicketFileFormat,
} from "../../network/types/response-props";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface DestinationOriginProps {
  city: string;
  cityId?: number;
}

interface DestinationState {
  destination: DestinationOriginProps;
  setDestination: (to: DestinationOriginProps) => void;
}

export const useDestination = create<DestinationState>()((set) => ({
  destination: {
    city: "",
  },
  setDestination: (to: DestinationOriginProps) =>
    set(() => ({ destination: to })),
}));

interface OriginState {
  origin: DestinationOriginProps;
  setOrigin: (to: DestinationOriginProps) => void;
}

export const useOrigin = create<OriginState>()((set) => ({
  origin: {
    city: "",
  },
  setOrigin: (to: DestinationOriginProps) => set(() => ({ origin: to })),
}));

interface IDPlaneState {
  idPlane: string;
  setIdPlane: (to: string) => void;
}

export const useIDPlane = create<IDPlaneState>()((set) => ({
  idPlane: "",
  setIdPlane: (to: string) => set(() => ({ idPlane: to })),
}));

interface PlaneDateState {
  date: string;
  setDate: (to: string) => void;
}

export const usePlaneDate = create<PlaneDateState>()((set) => ({
  date: "",
  setDate: (to: string) => set(() => ({ date: to })),
}));

interface FlightBookmarkState {
  bookmarked: boolean;
  setBookmark: () => void;
}

export const useFlightBookmarkState = create<FlightBookmarkState>()((set) => ({
  bookmarked: false,
  setBookmark: () => set((state) => ({ bookmarked: !state.bookmarked })),
}));

interface FlighSearchHistoryState {
  flightSearchHistory?: CMSFlightLandingPopularCitiesSection[];
  removeFlightSearchHistory: () => void;
  addFlightSearchHistory: (
    history: CMSFlightLandingPopularCitiesSection
  ) => void;
}

export const useFlightSearchHistory = create<FlighSearchHistoryState>()(
  persist(
    (set, get) => ({
      flightSearchHistory: [],
      removeFlightSearchHistory: () => set(() => ({ flightSearchHistory: [] })),
      addFlightSearchHistory: (
        history: CMSFlightLandingPopularCitiesSection
      ) => {
        const previousSearchHistory: CMSFlightLandingPopularCitiesSection[] =
          get()?.flightSearchHistory ?? [];

        const isUniqueData = ![...previousSearchHistory]?.find(
          (data) => data?.cityName === history?.cityName
        );

        if (isUniqueData) {
          const flightHistory = [history, ...previousSearchHistory]?.slice(
            0,
            5
          );
          return set(() => ({ flightSearchHistory: flightHistory }));
        }

        set(() => ({ flightSearchHistory: previousSearchHistory }));
      },
    }),
    {
      name: "flight-search-history",
      version: 2, //force clear prev storage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface FlightTicketFormError {
  ticketName: string;
  departureDate: string;
  planeNo: string;
  eTicket: string;
}

interface FlightTicketFormState {
  ticketName: string;
  departureDate: string;
  planeNo: string;
  eTicket?: FlightETicketFileFormat | null;
  error: FlightTicketFormError;
  setError: (errors: FlightTicketFormError) => void;
  setTicketName: (ticketName: string) => void;
  setDepartureDate: (departureDate: string) => void;
  setPlaneNo: (planeNo: string) => void;
  setETicket: (payload: FlightETicketFileFormat | null) => void;
  resetFlightTicketState: () => void;
}

export const useFlightTicketForm = create<FlightTicketFormState>()((set) => ({
  ticketName: "",
  departureDate: "",
  planeNo: "",
  eTicket: null,
  error: { ticketName: "", departureDate: "", planeNo: "", eTicket: "" },
  setError: (error: FlightTicketFormError) => set(() => ({ error })),
  setTicketName: (ticketName: string) => set(() => ({ ticketName })),
  setDepartureDate: (departureDate: string) => set(() => ({ departureDate })),
  setPlaneNo: (planeNo: string) => set(() => ({ planeNo })),
  setETicket: (payload: FlightETicketFileFormat | null) =>
    set(() => ({ eTicket: payload })),
  resetFlightTicketState: () =>
    set(() => ({
      ticketName: "",
      departureDate: "",
      planeNo: "",
      eTicket: null,
      error: { ticketName: "", departureDate: "", planeNo: "", eTicket: "" },
    })),
}));

interface WeboptinTokenSid {
  sid: number | null;
  setSid: (sid: number | null) => void;
}

export const useWeboptinTokenData = create<WeboptinTokenSid>()(
  persist(
    (set) => ({
      sid: null,
      setSid: (sid: number | null) => set(() => ({ sid })),
    }),
    { name: "sid", storage: createJSONStorage(() => localStorage) }
  )
);

interface TrackState {
  trackFlight: FollowFlightPayloadProps | null;
  setTrackFlight: (to: FollowFlightPayloadProps | null) => void;
}

export const useSaveTrackingPayload = create<TrackState>()(
  persist(
    (set) => ({
      trackFlight: null,
      setTrackFlight: (to: FollowFlightPayloadProps | null) =>
        set(() => ({ trackFlight: to })),
    }),
    { name: "track-saved", storage: createJSONStorage(() => localStorage) }
  )
);

interface TravelExploreFormState {
  exploreDate: string;
  setExploreDate: (exploreDate: string) => void;
  resetFlightTicketState: () => void;
}

export const useTravelExplore = create<TravelExploreFormState>()((set) => ({
  exploreDate: "",
  setExploreDate: (exploreDate: string) => set(() => ({ exploreDate })),
  resetFlightTicketState: () =>
    set(() => ({
      exploreDate: "",
    })),
}));
