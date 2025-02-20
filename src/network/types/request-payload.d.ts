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

export interface NearestCityPayloadProps {
  latitude: string;
  longitude: string;
}

export interface GlobalNotificationPayloadProps {
  notification: "ON" | "OFF";
}

export interface NearestMosquesPayloadProps {
  latitude: string;
  longitude: string;
  radius: number;
}

export interface SearchCityPayloadProps {
  search: string;
}

export interface UserUpdateCityPayloadProps {
  city_id: number;
}

export interface UserNotificationPayloadConfig {
  config_name: string; // ("imsyak_config", "subuh_config", "dzuhur_config", "ashar_config", "maghrib_config", "isya_config")
  notification_status: "ON" | "OFF"; // ("ON", "OFF")
  pre_notification_time: number; // (0, 5, 10, 15)
}

export interface JurnalIbadahNotificationPayloadProps {
  notification_status: "ON" | "OFF";
}

export interface StampMissionListPayloadProps {
  date: string;
}

export interface StampMissionSummaryPayloadProps {
  date: string;
}

export interface StampMissionSubmitPayloadProps {
  category: "pagi" | "siang" | "malam";
  category_id: string;
  mission_id: string;
}

export interface StampHistoryPayloadProps {
  _limit: number;
  _page: number;
  _order_created: "desc" | "asc";
}

export interface StampMissionSubmitPayloadProps {
  category: "pagi" | "siang" | "malam";
  category_id: string;
  mission_id: string;
}

export interface MerchandisePayloadProps {
  reward_id: string;
  full_name: string;
  phone_number: string;
  province: string;
  city: string;
  subdistrict: string;
  zipcode: string;
  address: string;
  qty: number;
}

export interface RedeemVoucherPayloadProps {
  reward_id: string;
}
