export default {
  pages: ["pages/ContentDetail/index"],
  subPackages: [],
  preloadRule: {},
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
