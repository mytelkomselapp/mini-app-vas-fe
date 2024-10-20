import http from "../core";
import {
  CMSFlightLandingPageResponse,
  FlightDetailResponse,
  FlightSearchResponse,
  FlightTrackResponse,
  FlightRouteResponse,
  FlightByNumberResponse,
  FlightFollowTrackingResponse,
  FlightUnfollowTrackingResponse,
  FlightFreemiumPackageResponse,
  FlightFreemiumUserPackageResponse,
  FlightETicketByFlightIdResponse,
  FlightCreateETicketResponse,
  FlightETicketUploadFIleResponse,
  FlightETicketsResponse,
  FlightDeleteETicketResponse,
  FlightClaimFreeTicketResponse,
  FlightWeboptinTokenResponse,
  FlightBuyFreemiumPackageResponse,
  FlightByCityResponse,
  ErrorLogBuyPackageResponse,
} from "./types/response-props";
import endpoints from "./endpoint";
import {
  BuyPackagePayloadProps,
  CreateETicketPayloadProps,
  DeleteETicketPayloadProps,
  ErrorLogPayloadProps,
  FollowFlightPayloadProps,
  GetETicketPayloadProps,
} from "./types/request-payload";

/**
 * Example
 */
export const getCMSFlightLandingPage = (): CMSFlightLandingPageResponse => {
  return http.get(endpoints?.cmsFLightLanding);
};

export const getFlightDetail = (
  fnum: string,
  date: string,
  departure: string,
  arrive: string
): FlightDetailResponse => {
  return http.get(endpoints?.flightDetail, { fnum, date, departure, arrive });
};

export const getFlightByNumber = (
  fnum: string,
  date: string
): FlightByNumberResponse => {
  return http.get(endpoints?.flightByNumber, { fnum, date });
};

export const getFlightSearch = (search: string): FlightSearchResponse => {
  return http.get(endpoints?.flightSearch, { search });
};

export const getFlightTrack = (): FlightTrackResponse => {
  return http.get(endpoints?.trackedFlights);
};

export const getFlightRoute = (
  departure: string,
  arrive: string,
  date: string
): FlightRouteResponse => {
  return http.get(endpoints?.flightRoute, { departure, arrive, date });
};

export const getFlightByCity = (
  departure_city_id: string,
  arrival_city_id: string,
  date: string
): FlightByCityResponse => {
  return http.get(endpoints?.flightByCity, {
    departure_city_id,
    arrival_city_id,
    date,
  });
};

export const postTrackingFlight = (
  payload: FollowFlightPayloadProps
): FlightFollowTrackingResponse => {
  return http.post(endpoints?.followFlight, payload);
};

export const deleteTrackingFlight = (
  flight_id: number
): FlightUnfollowTrackingResponse => {
  return http.delete(endpoints?.unfollowFlight, {
    flight_id,
  });
};

export const getFreemiumPackageList = (): FlightFreemiumPackageResponse => {
  return http.get(endpoints?.freemiumPackage);
};

export const getFreemiumUserPackage = (): FlightFreemiumUserPackageResponse => {
  return http.get(endpoints?.freemiumUserPackage);
};

export const postBuyPackage = (
  payload: BuyPackagePayloadProps
): FlightBuyFreemiumPackageResponse => {
  return http.post(endpoints?.freemiumBuyPackage, payload);
};

export const getETicketList = (): FlightETicketsResponse => {
  return http.get(endpoints?.eTicketList);
};

export const getETicketByFlightId = (
  payload: GetETicketPayloadProps
): FlightETicketByFlightIdResponse => {
  return http.get(endpoints?.eTicketByFlightId, payload);
};

export const postCreateETicket = (
  payload: CreateETicketPayloadProps
): FlightCreateETicketResponse => {
  return http.post(endpoints?.createETicket, payload);
};

export const postUploadETicketFile = (
  payload: FormData
): FlightETicketUploadFIleResponse => {
  return http.post(
    endpoints?.eTicketUploadFile,
    payload,
    {},
    { timeout: 180000 }
  );
};

export const deleteETicket = (
  payload: DeleteETicketPayloadProps
): FlightDeleteETicketResponse => {
  return http.delete(endpoints?.deleteETicket, payload);
};
export const postClaimFreeTicket = (): FlightClaimFreeTicketResponse => {
  return http.post(endpoints?.freemiumFreeTicketClaim);
};

export const getWeboptinToken = (
  package_id: number
): FlightWeboptinTokenResponse => {
  return http.get(endpoints?.generateWeboptinToken, { package_id });
};

export const errorLogBuyPackage = (
  payload: ErrorLogPayloadProps
): ErrorLogBuyPackageResponse => {
  return http.post(endpoints?.errorLogBuyPackage, payload);
};
