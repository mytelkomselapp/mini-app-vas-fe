export interface FollowFlightPayloadProps {
  flight_no: string;
  flight_company: string;
  flight_generic: string;
  flight_state: string;
  flight_duration: string;
  checkin_counter: string;
  boarding_gate: string;
  arrival_gate: string;
  baggage_carousel: string;
  departure: string;
  departure_airport: string;
  departure_code: string;
  departure_gate: string;
  departure_terminal: string;
  departure_time: string;
  arrival: string;
  arrival_airport: string;
  arrival_code: string;
  arrival_terminal: string;
  arrival_time: string;
  org_timezone: string;
  dst_timezone: string;
}

export interface BuyPackagePayloadProps {
  package_id: number;
}

export interface GetETicketPayloadProps {
  flight_id?: number;
}

export interface CreateETicketPayloadProps {
  ticket_name: string;
  ticket_date: string;
  flight_id?: number;
  flight_no: string;
  file_url: string;
  file_mime: string;
  file_ext: string;
}

export interface DeleteETicketPayloadProps {
  id: number;
}

export interface WeboptinTokenPayloadProps {
  cp_name: string;
  pwd: string;
  sid: string;
  programid: string;
}

export interface ErrorLogPayloadProps {
  error_type: string;
  error_data: object;
}
