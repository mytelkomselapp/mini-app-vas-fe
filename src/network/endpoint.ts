import { ENDPOINT_SOURCE } from "../core/httpRequest";

const endpoints: ENDPOINT_SOURCE = {
  cmsFLightLanding: {
    endpoint: `/api/flight-landing-page`,
    source: "cms",
  },
  flightDetail: {
    endpoint: `/api/v1/flight/detail`,
    source: "api",
  },
  flightByNumber: {
    endpoint: `/api/v1/flights/number`,
    source: "api",
  },
  flightRoute: {
    endpoint: `/api/v1/flights/route`,
    source: "api",
  },

  flightByCity: {
    endpoint: `/api/v1/flights/city`,
    source: "api",
  },
  flightSearch: {
    endpoint: "/api/v1/cities",
    source: "api",
  },
  trackedFlights: {
    endpoint: "/api/v1/flights/tracked",
    source: "api",
  },
  followFlight: {
    endpoint: "/api/v1/flight/tracking",
    source: "api",
  },
  unfollowFlight: {
    endpoint: "/api/v1/flight/tracking",
    source: "api",
  },
  freemiumPackage: {
    endpoint: "/api/v1/freemium/package",
    source: "api",
  },
  freemiumUserPackage: {
    endpoint: "/api/v1/freemium/package-user",
    source: "api",
  },
  freemiumBuyPackage: {
    endpoint: "/api/v1/freemium/buy-package",
    source: "api",
  },
  eTicketList: {
    endpoint: "/api/v1/etickets",
    source: "api",
  },
  eTicketByFlightId: {
    endpoint: "/api/v1/eticket/flight",
    source: "api",
  },
  eTicketUploadFile: {
    endpoint: "/api/upload",
    source: "cms",
  },
  createETicket: {
    endpoint: "/api/v1/eticket/create",
    source: "api",
  },
  deleteETicket: {
    endpoint: "/api/v1/eticket/delete",
    source: "api",
  },
  freemiumFreeTicketClaim: {
    endpoint: "/api/v1/freemium/register-user",
    source: "api",
  },
  generateWeboptinToken: {
    endpoint: "/api/v1/weboptin/cp-generator",
    source: "api",
  },
  errorLogBuyPackage: {
    endpoint: "/api/v1/error-log",
    source: "api",
  },
};

export default endpoints;
