import {
  AirlineDataProps,
  ArrivalTimeDataProps,
  DepartureTimeDataProps,
  TransitDataProps,
} from "../types/props";

export const DUMMY_DATA_TRANSIT_FILTER: TransitDataProps[] = [
  {
    id: 1,
    title: "Langsung",
    startPrice: 623721,
    selectable: true,
  },
  {
    id: 2,
    title: "1 Kali Transit",
    startPrice: 923721,
    selectable: true,
  },
  {
    id: 3,
    title: "2 Kali Transit",
    startPrice: 923721,
    selectable: false,
  },
];

export const DUMMY_DATA_DEPARTURE_TIME_FILTER: DepartureTimeDataProps[] = [
  {
    id: 1,
    title: "00.00 - 06:00 • Dini Hari",
    selectable: false,
    value: "early",
  },
  {
    id: 2,
    title: "06.00 - 12:00 • Pagi",
    selectable: true,
    value: "morning",
  },
  {
    id: 3,
    title: "12.00 - 18:00 • Siang - Sore",
    selectable: true,
    value: "afternoon",
  },
  {
    id: 4,
    title: "18.00 - 00:00 • Malam",
    selectable: true,
    value: "evening",
  },
];

export const DUMMY_DATA_ARRIVAL_TIME_FILTER: ArrivalTimeDataProps[] = [
  {
    id: 1,
    title: "00.00 - 06:00 • Dini Hari",
    selectable: false,
    value: "early",
  },
  {
    id: 2,
    title: "06.00 - 12:00 • Pagi",
    selectable: true,
    value: "morning",
  },
  {
    id: 3,
    title: "12.00 - 18:00 • Siang - Sore",
    selectable: true,
    value: "afternoon",
  },
  {
    id: 4,
    title: "18.00 - 00:00 • Malam",
    selectable: true,
    value: "evening",
  },
];

export const DUMMY_DATA_AIRLINE: AirlineDataProps[] = [
  {
    id: 1,
    airline: "Scoot",
    startPrice: 623721,
    selectable: true,
    color: "bg-yellow-300",
  },
  {
    id: 2,
    airline: "Batik Air",
    startPrice: 923721,
    selectable: true,
    color: "bg-red-500",
  },
  {
    id: 3,
    airline: "Citilink",
    startPrice: 623721,
    selectable: true,
    color: "bg-green-600",
  },
  {
    id: 4,
    airline: "Garuda Indonesia",
    startPrice: 623721,
    selectable: true,
    color: "bg-blue-800",
  },
];
