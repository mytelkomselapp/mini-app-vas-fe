export default {
  pages: [
    "pages/LandingPageRamadan/index", //Main Page as the first order
    // other pages...
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
    { root: "subpackages/subpackage7", pages: ["pages/TukarHadiah/index"] },
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
