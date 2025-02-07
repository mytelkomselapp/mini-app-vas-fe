import { useMutation, useQuery } from "react-query";
import {
  deleteETicket,
  deleteTrackingFlight,
  errorLogBuyPackage,
  getCMSFlightLandingPage,
  getETicketByFlightId,
  getETicketList,
  getFlightByCity,
  getFlightByNumber,
  getFlightDetail,
  getFlightRoute,
  getFlightSearch,
  getFlightTrack,
  getFreemiumPackageList,
  getFreemiumUserPackage,
  getNearestCity,
  getNotificationConfig,
  getWeboptinToken,
  postBuyPackage,
  postClaimFreeTicket,
  postCreateETicket,
  postRegisterUser,
  postTrackingFlight,
  postUploadETicketFile,
} from "./services";
import {
  GetETicketPayloadProps,
  NearestCityPayloadProps,
} from "./types/request-payload";
import { useState } from "react";

export const useFetchCMSLandingPage = (enabled: boolean = true) => {
  return useQuery(["Fetch CMS Landing Page"], getCMSFlightLandingPage, {
    enabled,
    cacheTime: 24 * 60 * 60 * 1000,
  });
};

export const useFetchFlightDetail = (
  flightNumber: string,
  date: string,
  departure: string,
  arrive: string,
  enabled: boolean = true
) => {
  return useQuery(
    ["Fetch Flight Detail", flightNumber, date, departure, arrive],
    () => {
      return getFlightDetail(flightNumber, date, departure, arrive);
    },
    {
      enabled,
    }
  );
};

export const useFetchFlightByNumber = (
  flightNumber: string,
  date: string,
  enabled: boolean = true
) => {
  return useQuery(
    ["Fetch Flight by Number", flightNumber, date],
    () => {
      return getFlightByNumber(flightNumber, date);
    },
    {
      enabled,
    }
  );
};

export const useFetchFlightSearch = (
  search: string,
  enabled: boolean = true
) => {
  return useQuery(
    ["Fetch Flight Search", search],
    () => getFlightSearch(search),
    {
      enabled,
    }
  );
};

export const useFetchFlightTrack = (enabled: boolean = true) => {
  return useQuery(["Fetch Flights Track"], getFlightTrack, {
    enabled,
  });
};

export const useFetchFlightRoute = (
  origin: string,
  destination: string,
  date: string,
  enabled: boolean = true
) => {
  return useQuery(
    ["Fetch Flight Route"],
    () => getFlightRoute(origin, destination, date),
    {
      enabled,
    }
  );
};

export const useFetchFlightByCity = (
  departure_city_id: string,
  arrival_city_id: string,
  date: string,
  enabled: boolean = true
) => {
  return useQuery(
    ["Fetch Flight by City"],
    () => getFlightByCity(departure_city_id, arrival_city_id, date),
    {
      enabled,
    }
  );
};

export const useFollowFlight = () => {
  return useMutation(["Post Follow Track Flight"], postTrackingFlight);
};

export const useUnfollowFlight = () => {
  return useMutation(["Post Unfollow Track Flight"], deleteTrackingFlight);
};

export const useFetchFreemiumPackage = (enabled: boolean = true) => {
  return useQuery(["Fetch Flight Freemium Package"], getFreemiumPackageList, {
    enabled,
  });
};

export const useFetchFreemiumUserPackage = (enabled: boolean = true) => {
  return useQuery(
    ["Fetch Flight Freemium User Package"],
    getFreemiumUserPackage,
    {
      enabled,
    }
  );
};

export const useBuyPackage = () => {
  const [isRetry, setIsRetry] = useState<boolean>(true);
  return useMutation(["Buy Freemium Packages Success"], postBuyPackage, {
    retry: isRetry ? 3 : 0,
    retryDelay: 4_000,
    onSuccess: (data) => {
      if (data?.data?.status === "success") {
        setIsRetry(false);
      }
    },
  });
};

export const useFetchETicketByFlightId = (
  payload: GetETicketPayloadProps,
  enabled: boolean = true
) => {
  return useQuery(
    ["Fetch E Ticket By Flight ID", payload?.flight_id],
    () => getETicketByFlightId(payload),
    { enabled }
  );
};

export const useFetchETickets = (enabled: boolean = true) => {
  return useQuery(["Fetch ETicket List"], getETicketList, {
    enabled,
  });
};

export const usePostCreateETicket = () => {
  return useMutation(["Post Create E Ticket"], postCreateETicket);
};

export const usePostUploadETicketFile = () => {
  return useMutation(["Post Upload E Ticket File"], postUploadETicketFile);
};

export const useDeleteETicket = () => {
  return useMutation(["Delete E-Ticket"], deleteETicket);
};

export const usePostClaimFreeTicket = () => {
  return useMutation(["Post Claim Ticket"], postClaimFreeTicket);
};

export const usePostErrorBuyPackage = () => {
  return useMutation(["Post Error Buy Package"], errorLogBuyPackage);
};

export const useFetchWeboptinToken = (
  package_id: number,
  enabled: boolean = false
) => {
  return useQuery(
    ["Fetch Weboptin Token", package_id],
    () => getWeboptinToken(package_id),
    {
      enabled,
    }
  );
};

export const useFetchNearestCity = (
  payload: NearestCityPayloadProps,
  enabled: boolean = true
) => {
  return useQuery(
    ["Fetch E Ticket By Flight ID"],
    () => getNearestCity(payload),
    { enabled }
  );
};

export const usePostRegisterUser = () => {
  return useMutation(["Post Register User"], postRegisterUser);
};

export const useNotificationConfig = (enabled: boolean = true) => {
  return useQuery(
    ["Fetch Notification Config"],
    () => getNotificationConfig(),
    { enabled }
  );
};
