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
  nearestCity: {
    endpoint: "/api/v1/ramadhan/nearest-city",
    source: "api",
  },
  registerUser: {
    endpoint: "/api/v1/user/register",
    source: "api",
  },
  notificationConfig: {
    endpoint: "/api/v1/user/user-notification-config",
    source: "api",
  },
  updateGlobalNotification: {
    endpoint: "/api/v1/user/turn-notification-prayer",
    source: "api",
  },
  nearestMosques: {
    endpoint: "/api/v1/ramadhan/nearest-mosques",
    source: "api",
  },
  getCities: {
    endpoint: "/api/v1/ramadhan/cities",
    source: "api",
  },
  userUpdateCity: {
    endpoint: "/api/v1/user/update-city",
    source: "api",
  },
  stampMissionList: {
    endpoint: "/api/v1/stamp/mission",
    source: "gamification",
  },
  stampMissionSummary: {
    endpoint: "/api/v1/stamp/mission_summary",
    source: "gamification",
  },
  submitMission: {
    endpoint: "/api/v1/stamp/submit",
    source: "gamification",
  },
  stampHistory: {
    endpoint: "/api/v1/stamp/history",
    source: "gamification",
  },
  userStamp: {
    endpoint: "/api/v1/user/stamp",
    source: "gamification",
  },
  getLandingPageCMS: {
    endpoint: "/api/ramadhan-landing-page",
    source: "cms",
  },
  getMissionPopupCMS: {
    endpoint: "/api/rm-mission-popups",
    source: "cms",
  },
  getDzikir: {
    endpoint: "/api/rm-dzikirs",
    source: "cms",
  },
  getRewardSections: {
    endpoint: "/api/v1/stamp/reward/sections",
    source: "gamification",
  },
  getListRewards: {
    endpoint: "/api/v1/stamp/reward",
    source: "gamification",
  },
  postRedeemReward: {
    endpoint: "/api/v1/stamp/redeem",
    source: "gamification",
  },
  postRedeemVoucher: {
    endpoint: "/api/v1/stamp/redeem",
    source: "gamification",
  },
  getRewardHistory: {
    endpoint: "/api/v1/stamp/redeem?_limit=999&_page=1",
    source: "gamification",
  },
  getNotificationJurnalIbadah: {
    endpoint: "/api/v1/user/user-notification-jurnal-ibadah",
    source: "api",
  },
  postNotificationJurnalIbadah: {
    endpoint: "/api/v1/user/user-notification-jurnal-ibadah",
    source: "api",
  },
  getRewardHistoryDetail: {
    endpoint: "/api/v1/stamp/redeem",
    source: "gamification",
  },
};

export default endpoints;
