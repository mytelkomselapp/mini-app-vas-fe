// @ts-nocheck
import http from "../core/index";
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
  FlightETicketsResponse,
  FlightDeleteETicketResponse,
  FlightClaimFreeTicketResponse,
  FlightWeboptinTokenResponse,
  FlightBuyFreemiumPackageResponse,
  FlightByCityResponse,
  ErrorLogBuyPackageResponse,
  FlightETicketUploadFileResponse,
  RegisterUserResponse,
  NotificationConfigResponse,
  NearestMosquesResponse,
  SearchCityResponse,
  StampMissionListResponse,
  StampMissionSummaryResponse,
  UserStampResponse,
  LandingPageCMSResponse,
  DzikirCMSResponse,
  RewardSectionResponse,
  RewardItemResponse,
  MerchandiseRewardResponse
} from "./types/response-props";
import endpoints from "./endpoint";
import {
  BuyPackagePayloadProps,
  CreateETicketPayloadProps,
  DeleteETicketPayloadProps,
  ErrorLogPayloadProps,
  FollowFlightPayloadProps,
  GetETicketPayloadProps,
  GlobalNotificationPayloadProps,
  GlobalNotificationProps,
  NearestCityPayloadProps,
  NearestMosquesPayloadProps,
  UserNotificationPayloadConfig,
  UserUpdateCityPayloadProps,
  StampMissionListPayloadProps,
  StampMissionSummaryPayloadProps,
  StampMissionSubmitPayloadProps,
  StampHistoryPayloadProps,
  MerchandisePayloadProps
} from "./types/request-payload";
import { createJWT, verifyJWT } from "../lib/utils";
import { REDEMPTION_SECRET } from "../core/env";

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
  console.log({ endpoint: endpoints });
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
  filePath: string
): FlightETicketUploadFileResponse => {
  return http.uploadFile(endpoints?.eTicketUploadFile, filePath, {});
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

export const getNearestCity = (payload: NearestCityPayloadProps): any => {
  return http.get(endpoints?.nearestCity, payload);
};

export const postRegisterUser = (
  payload: NearestCityPayloadProps
): RegisterUserResponse => {
  return http.post(endpoints?.registerUser, payload);
};

export const getNotificationConfig = (): NotificationConfigResponse => {
  return http.get(endpoints?.notificationConfig);
};

export const patchNotificationConfig = (
  payload: GlobalNotificationPayloadProps
): RegisterUserResponse => {
  return http.post(endpoints?.updateGlobalNotification, payload);
};

export const getNearestMosques = (
  payload: NearestMosquesPayloadProps
): NearestMosquesResponse => {
  return http.get(endpoints?.nearestMosques, payload);
};

export const getCities = (
  payload: SearchCityPayloadProps
): SearchCityResponse => {
  return http.get(endpoints?.getCities, payload);
};

export const userUpdateCity = (payload: UserUpdateCityPayloadProps) => {
  return http.post(endpoints?.userUpdateCity, payload);
};

export const postNotificationConfig = (
  payload: UserNotificationPayloadConfig
): NotificationConfigResponse => {
  return http.post(endpoints?.notificationConfig, payload);
};

export const getStampMissionList = (
  payload: StampMissionListPayloadProps
): StampMissionListResponse => {
  return http.get(endpoints?.stampMissionList, payload);
};

export const getStampMissionSummary = (
  payload: StampMissionSummaryPayloadProps
): StampMissionSummaryResponse => {
  return http.get(endpoints?.stampMissionSummary, payload);
};

export const postSubmitMission = (
  payload: StampMissionSubmitPayloadProps
): StampMissionSubmitResponse => {
  return http.post(endpoints?.submitMission, payload);
};

export const getStampHistory = (
  payload: StampHistoryPayloadProps
): StampHistoryResponse => {
  return http.get(endpoints?.stampHistory, payload);
};

export const getUserStamp = (): UserStampResponse => {
  return http.get(endpoints?.userStamp);
};

export const getLandingPageCMS = (): LandingPageCMSResponse => {
  return http.get(endpoints?.getLandingPageCMS);
};

export const getMissionPopupCMS = (): MissionPopupCMSResponse => {
  return http.get(endpoints?.getMissionPopupCMS);
};

export const getDzikir = (): DzikirCMSResponse => {
  return http.get(endpoints?.getDzikir);
};

export const getRewardSections = (): RewardSectionResponse => {
  return http.get(endpoints?.getRewardSections);
};

export const getListRewards = (): RewardItemResponse => {
  return http.get(endpoints?.getListRewards);
};



export const postRedeemMerchandise = (payload: MerchandisePayloadProps, userId: string): MerchandiseRewardResponse => {
  const exp = Math.floor(Date.now() / 1000) + 60;
  const jwtPayload = {
    user_id: userId,
    exp
  };
  
  const token = createJWT(jwtPayload, REDEMPTION_SECRET || '');

  const headers = {
    "SecureToken": token
  };
  
  return http.post(endpoints?.postRedeemReward, payload, undefined, undefined, headers);
};


