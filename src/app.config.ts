export default {
  pages: [
    "pages/LandingPageRamadan/index", //Main Page as the first order
    "pages/ArahKiblat/index",
    "pages/CariMasjid/index",
    "pages/RamadhanSearchLocation/index",
    "pages/PrayerSchedule/index",
    "pages/index/index",
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
