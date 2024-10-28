// temporary dummy flight data

import { FlightDetailData } from "@/network/types/response-props";

const FlightData = () => {
  const flightData: FlightDetailData[] = [
    {
      id: "1",
      user_id: "user_001",
      flight_no: "GA 123",
      flight_company: "Garuda Indonesia",
      flight_logo: "https://example.com/logos/garuda.png",
      flight_generic: "Garuda Indonesia",
      flight_state: "schedule",
      flight_duration: "2h 30m",
      checkin_counter: "Counter 5",
      boarding_gate: "Gate 7",
      arrival_gate: "Gate 4",
      baggage_carousel: "Carousel 1",
      departure: "Jakarta",
      departure_airport: "Bandara Soekarno-Hatta",
      departure_code: "CGK",
      departure_terminal: "Terminal 2",
      departure_time: "2024-10-30T08:00:00Z",
      arrival: "Bali",
      arrival_airport: "Bandara Ngurah Rai",
      arrival_code: "DPS",
      arrival_terminal: "Terminal Internasional",
      arrival_time: "2024-10-30T10:30:00Z",
      created_at: "2024-10-20T12:00:00Z",
      updated_at: "2024-10-20T12:00:00Z",
    },
    {
      id: "2",
      user_id: "user_002",
      flight_no: "JT 456",
      flight_company: "Lion Air",
      flight_logo: "https://example.com/logos/lion.png",
      flight_generic: "Lion Air",
      flight_state: "delay",
      flight_duration: "1h 45m",
      checkin_counter: "Counter 3",
      boarding_gate: "Gate 5",
      arrival_gate: "Gate 8",
      baggage_carousel: "Carousel 2",
      departure: "Surabaya",
      departure_airport: "Bandara Juanda",
      departure_code: "SUB",
      departure_terminal: "Terminal 1",
      departure_time: "2024-10-30T15:00:00Z",
      arrival: "Jakarta",
      arrival_airport: "Bandara Soekarno-Hatta",
      arrival_code: "CGK",
      arrival_terminal: "Terminal 3",
      arrival_time: "2024-10-30T16:45:00Z",
      created_at: "2024-10-21T09:00:00Z",
      updated_at: "2024-10-21T09:00:00Z",
    },
    {
      id: "3",
      user_id: "user_003",
      flight_no: "ID 789",
      flight_company: "IndiGo",
      flight_logo: "https://example.com/logos/indigo.png",
      flight_generic: "IndiGo",
      flight_state: "cancel",
      flight_duration: "1h 20m",
      checkin_counter: "Counter 2",
      boarding_gate: "Gate 3",
      arrival_gate: "Gate 6",
      baggage_carousel: "Carousel 3",
      departure: "Medan",
      departure_airport: "Bandara Kualanamu",
      departure_code: "KNO",
      departure_terminal: "Terminal Domestik",
      departure_time: "2024-10-30T11:00:00Z",
      arrival: "Batam",
      arrival_airport: "Bandara Hang Nadim",
      arrival_code: "BTH",
      arrival_terminal: "Terminal 1",
      arrival_time: "2024-10-30T12:20:00Z",
      created_at: "2024-10-22T10:30:00Z",
      updated_at: "2024-10-22T10:30:00Z",
    },
    {
      id: "4",
      user_id: "user_004",
      flight_no: "QZ 101",
      flight_company: "AirAsia",
      flight_logo: "https://example.com/logos/airasia.png",
      flight_generic: "AirAsia",
      flight_state: "arrival",
      flight_duration: "2h 15m",
      checkin_counter: "Counter 6",
      boarding_gate: "Gate 9",
      arrival_gate: "Gate 2",
      baggage_carousel: "Carousel 4",
      departure: "Bali",
      departure_airport: "Bandara Ngurah Rai",
      departure_code: "DPS",
      departure_terminal: "Terminal Domestik",
      departure_time: "2024-10-30T14:30:00Z",
      arrival: "Jakarta",
      arrival_airport: "Bandara Soekarno-Hatta",
      arrival_code: "CGK",
      arrival_terminal: "Terminal 2",
      arrival_time: "2024-10-30T16:45:00Z",
      created_at: "2024-10-23T08:00:00Z",
      updated_at: "2024-10-23T08:00:00Z",
    },
  ];
  

  return {
    flightData,
  };
};

export default FlightData;
