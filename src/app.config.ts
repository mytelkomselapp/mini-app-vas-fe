export default {
  pages: [
    "pages/LandingPageRamadan/index", //Main Page as the first order
  ],
  subPackages: [
    { root: "subpackages/subpackage1", pages: ["pages/ArahKiblat/index"] },
    { root: "subpackages/subpackage2", pages: ["pages/CariMasjid/index"] },
    {
      root: "subpackages/subpackage3",
      pages: ["pages/RamadhanSearchLocation/index"],
    },
    {
      root: "subpackages/subpackage4",
      pages: ["pages/Dzikir/index", "pages/DzikirDetail/index"],
    },
    { root: "subpackages/subpackage5", pages: ["pages/CatatanIbadah/index"] },
    { root: "subpackages/subpackage6", pages: ["pages/PrayerSchedule/index"] },
    {
      root: "subpackages/subpackage7",
      pages: [
        "pages/TukarHadiah/index",
        "pages/RiwayatTukarHadiah/index",
        "pages/DetailHadiah/index",
        "pages/CheckoutMerchandise/index",
        "pages/FormMerchandise/index",
        "pages/FinalCheckoutMerchandise/index",
      ],
    },
    { root: "subpackages/subpackage8", pages: ["pages/Redemption/index"] },
    { root: "subpackages/subpackage9", pages: ["pages/Webview/index"] },
  ],
  preloadRule: {
    "pages/LandingPageRamadan/index": {
      network: "all",
      packages: [
        "subpackages/subpackage1",
        "subpackages/subpackage2",
        "subpackages/subpackage3",
        "subpackages/subpackage4",
        "subpackages/subpackage5",
        "subpackages/subpackage6",
        "subpackages/subpackage7",
        "subpackages/subpackage8",
        "subpackages/subpackage9",
      ],
    },
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarTitleText: "Ramadan Fitri",
    navigationBarBackgroundColor: "#d41f2c",
    navigationBarTextStyle: "white",
  },
  lazyCodeLoading: "requiredComponents",
  requiredBackgroundModes: ["file"],
  permission: {
    "scope.userLocation": {
      desc: "Enable User Location in order to get the best feature",
    },
  }, // Background modes required
};
