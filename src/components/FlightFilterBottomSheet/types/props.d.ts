export interface TransitDataProps {
  id: number;
  title: string;
  startPrice: number;
  selectable: boolean;
}

export interface DepartureTimeDataProps {
  id: number;
  title: string;
  value: string;
  selectable: boolean;
}

export interface ArrivalTimeDataProps {
  id: number;
  title: string;
  value: string;
  selectable: boolean;
}

export interface AirlineDataProps {
  id: number;
  airline: string;
  startPrice: number;
  selectable: boolean;
  color: string;
}
