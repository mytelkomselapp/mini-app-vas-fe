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
      ],
    },
    { root: "subpackages/subpackage9", pages: ["pages/Webview/index"] },
  ],
  preloadRule: {
    "pages/LandingPageRamadan/index": {
      packages: ["subpackages/subpackage1"], // Preload these subpackages
      network: "all", // Load even on mobile data
      complete: true, // Preload all pages in the subpackage
    },
    "pages/CatatanIbadah/index": {
      packages: ["subpackages/subpackage7"], // Preload these subpackages
      network: "all", // Load even on mobile data
      complete: true, // Preload all pages in the subpackage
    },
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarTitleText: "Ramadan Fitri",
    navigationBarBackgroundColor: "#d41f2c",
    navigationBarTextStyle: "white",
  },
  lazyCodeLoading: "required",
  requiredBackgroundModes: ["file"],
  permission: {
    "scope.userLocation": {
      desc: "Enable User Location in order to get the best feature",
    },
  }, // Background modes required
};
