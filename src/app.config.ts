export default {
  pages: [
    "pages/LandingPageRamadan/index", //Main Page as the first order
    "pages/ArahKiblat/index",
    "pages/RamadhanSearchLocation/index",
    "pages/PrayerSchedule/index",
    "pages/index/index",
    "pages/ListPenerbangan/index",
    "pages/DetailPenerbangan/index",
    "pages/MyTicketList/index",
    "pages/TransactionStatus/index",
    "pages/Webview/index",
    "pages/SubscriptionPackage/index",
    "pages/PackageDetail/index",
    "pages/CreateDetailTicket/index",
    "pages/TicketHistory/index",
    "pages/FollowingPenerbangan/index",
    "pages/PreviewImageDocs/index",
    "pages/Dzikir/index",
    "pages/DzikirDetail/index",
    // other pages...
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "Ramadan Fitri",
    navigationBarTextStyle: "black",
  },
  requiredBackgroundModes: ["file"],
  permission: {
    "scope.userLocation": {
      desc: "Enable User Location in order to get the best feature",
    },
  }, // Background modes required
};
