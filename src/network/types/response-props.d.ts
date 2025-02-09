import {
  FlightAPIMeta,
  HttpSuccessResponse,
  HttpSuccessUploadResponse,
} from "./api-response-container";
export interface CMSFlightLandingAppSection {
  title: string;
  targetUrl: string;
  iconUrl: string;
}

export interface CMSFlightLandingPromoSection {
  title: string;
  subtitle: string;
  linkTitle: string;
  targetUrl: string;
  backgroundImgUrl: string;
}

export interface CMSFlightLandingPopularCitiesSection {
  id?: number;
  cityName?: string;
  airportCode?: string;
  city?: FlightSearchCity;
  cityId?: number;
}
export interface CMSFlightLandingData {
  id: number;
  title: string;
  subtitle: string;
  formTabTitle1: string;
  formTabTitle2: string;
  formButtonTitle: string;
  locale: string;
  backgroundImgUrl: string;
  appsSection: CMSFlightLandingAppSection[];
  promoSection: CMSFlightLandingPromoSection;
  popularCitiesSection: CMSFlightLandingPopularCitiesSection[];
}

export interface FlightDetailData {
  id: string;
  user_id: string;
  flight_no: string;
  flight_company: string;
  flight_logo: string;
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
  departure_terminal: string;
  departure_time: string;
  arrival: string;
  arrival_airport: string;
  arrival_code: string;
  arrival_terminal: string;
  arrival_time: string;
  created_at: string;
  updated_at: string;
}

export interface FlightDetailTrackData {
  created_at: string;
  flight_id: number;
  insider_uuid: string;
  updated_at: string;
  flight: FlightDetailData;
}

export interface FlightDetailRawData {
  meta: FlightAPIMeta;
  data: {
    flight: FlightDetailData;
  };
}

export interface FlightRouteRawData {
  flights: FlightDetailData[];
}

export interface FlightByNumberRawData {
  flights: FlightDetailData[];
}

export interface FlightTrackData {
  tracked_flights: FlightDetailTrackData[];
}

export interface FlightByCity {
  flights: FlightDetailData[];
}

export interface FlightSearchCity {
  id: number;
  city_name: string;
  country: string;
}

export interface RamadhanSearchLocationProps {
  id: number;
  city: string;
  latitude: string;
  longitude: string;
  country: string;
  province: string;
  timezone: string;
}

export interface FlightSearchData {
  airport_code: string;
  airport_name: string;
  city: FlightSearchCity;
  city_id: number;
  country: string;
  id: number;
}

export interface FlightFollowTracking {
  created_at: string;
  flight: FlightDetailData;
  flight_id: number;
  status: "tracked" | "untracked";
  id: number;
  insider_uuid: string;
  updated_at: string;
}

export interface FlightFreemiumPackageData {
  id: number;
  name: string;
  quota: number;
  price: number;
  validity_day: number;
  package_type: "quota" | "unlimited";
  keyword: string;
}
export interface FlightFreemiumPackageProps {
  created_at: string;
  packages: FlightFreemiumPackageData[];
}

export interface FlightFreemiumUserPackageData {
  id: number;
  username: string;
  insider_uuid: string;
  status: string;
  quota: number;
  package_type: "quota" | "unlimited";
  expired_date: string;
  package_name: string;
  new_user: "new" | "old";
}

export interface FlightETicketData {
  id: number;
  user_id: string;
  ticket_name: string;
  ticket_date: string;
  flight_id: number;
  flight_no: string;
  file_url: string;
  file_mime: string;
  file_ext: string;
}
export interface FlightETicketByFlightIdData {
  id: number;
  user_id: string;
  ticket_name: string;
  ticket_date: string;
  flight_id: number;
  flight_no: string;
  file_url: string;
  file_mime: string;
  file_ext: string;
}

export interface FileUploadProps {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}
export interface FlightETicketUploadFileFormatProps {
  thumbnail: FileUploadProps;
  small: FileUploadProps;
  medium: FileUploadProps;
  large: FileUploadProps;
}

export interface FlightETicketUploadFileData {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: FlightETicketUploadFileFormatProps;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: string;
  createdAt: string;
  updatedAt: string;
}

export interface FlightETicketFileFormat {
  file_url: string;
  file_mime: string;
  file_ext: string;
  source: "document" | "image";
}

export interface FlightClaimFreeTicket {
  id: number;
  insider_uuid: string;
  status: string;
  quota: number;
  package_type: string;
  new_user: string;
  expired_date: string;
  created_at: string;
  updated_at: string;
}

export interface FlightCreateETicketData extends FlightETicketByFlightIdData {}

export interface FlightDeleteETicketData {
  id: number;
}

export interface FlightWeboptinToken {
  token: string;
  url: string;
  user_id: string;
}
export interface FlightBuyFreemiumPackageProps {
  created_at: string;
  package: FlightFreemiumPackageData;
  transaction_id: string;
  payment_method: string;
}

export interface ErrorLogBuyPackageProps {
  id: number;
  error_type: string;
  error_data: object;
  user_id: string;
}

export interface City {
  id: number;
  city: string;
  latitude: string;
  longitude: string;
  country: string;
  province: string;
  timezone: string;
}

export interface PrayerSchedule {
  id: number;
  city_id: number;
  date: string;
  imsyak: string;
  subuh: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
  timezone: string;
  created_at: string;
  updated_at: string;
}

export interface NearestPrayTime {
  name_time: string;
  pray_time: string;
  pray_date: string;
  pray_time_remaining: number;
  nearest_pray_info: string;
  timezone: string;
}

export interface RegisterUserData {
  city: City;
  prayer_schedule: PrayerSchedule;
  nearest_pray_time: NearestPrayTime;
  notification_status: "ON" | "OFF";
}

export interface PrayerNotificationConfig {
  notification_status: "ON" | "OFF";
  pre_notification_time: number;
}

export interface NotificationConfig {
  imsyak: PrayerNotificationConfig;
  subuh: PrayerNotificationConfig;
  dzuhur: PrayerNotificationConfig;
  ashar: PrayerNotificationConfig;
  maghrib: PrayerNotificationConfig;
  isya: PrayerNotificationConfig;
}

export type CMSFlightLandingPageResponse =
  HttpSuccessResponse<CMSFlightLandingData>;
export type FlightDetailResponse = HttpSuccessResponse<FlightDetailRawData>;
export type FlightSearchResponse = HttpSuccessResponse<FlightSearchData[]>;
export type FlightTrackResponse = HttpSuccessResponse<FlightTrackData>;
export type FlightRouteResponse = HttpSuccessResponse<FlightRouteRawData>;
export type FlightByNumberResponse = HttpSuccessResponse<FlightByNumberRawData>;
export type FlightFollowTrackingResponse =
  HttpSuccessResponse<FlightFollowTracking>;
export type FlightUnfollowTrackingResponse =
  HttpSuccessResponse<FlightFollowTracking>;
export type FlightFreemiumPackageResponse =
  HttpSuccessResponse<FlightFreemiumPackageProps>;

export type FlightFreemiumUserPackageResponse =
  HttpSuccessResponse<FlightFreemiumUserPackageData>;
export type FlightETicketsResponse = HttpSuccessResponse<FlightETicketData[]>;
export type FlightETicketByFlightIdResponse =
  HttpSuccessResponse<FlightETicketByFlightIdData>;
export type FlightETicketUploadFileResponse = HttpSuccessUploadResponse<
  FlightETicketUploadFileData[]
>;
export type FlightCreateETicketResponse =
  HttpSuccessResponse<FlightCreateETicketData>;

export type FlightDeleteETicketResponse =
  HttpSuccessResponse<FlightDeleteETicketData>;

export type FlightClaimFreeTicketResponse =
  HttpSuccessResponse<FlightClaimFreeTicket>;

export type FlightWeboptinTokenResponse =
  HttpSuccessResponse<FlightWeboptinToken>;

export type FlightBuyFreemiumPackageResponse =
  HttpSuccessResponse<FlightBuyFreemiumPackageProps>;

export type FlightByCityResponse = HttpSuccessResponse<FlightByCity>;

export type ErrorLogBuyPackageResponse =
  HttpSuccessResponse<ErrorLogBuyPackageProps>;

export type RegisterUserResponse = HttpSuccessResponse<RegisterUserData>;

export type NotificationConfigResponse =
  HttpSuccessResponse<NotificationConfig>;

export type SearchCityResponse = HttpSuccessResponse<City[]>;
