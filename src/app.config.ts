export default {
  pages: [
    "pages/ContentDetail/index",
    "pages/MyCollection/index",
    "pages/CollectionContentDetail/index",
    "pages/StoriesImage/index",
    "pages/VideoContent/index",
    "pages/HelpCenter/index",
  ],
  subPackages: [
    { root: "subpackages/subpackage1", pages: ["pages/DummyScreen/index"] },
  ],
  preloadRule: {
    "pages/ContentDetail/index": {
      network: "all",
      packages: ["subpackages/subpackage1"], //will load subpackage1 when ContentDetail is loaded
    },
  },
  networkTimeout: {
    request: 120000, // 120 seconds
    connectSocket: 60000,
    uploadFile: 60000,
    downloadFile: 120000, // 120 seconds
  },

  window: {
    backgroundTextStyle: "light",
    navigationBarTitleText: "VAS",
    navigationBarBackgroundColor: "#d41f2c",
    navigationBarTextStyle: "white",
  },
};
