import "./index.css";
import "./app.scss";
import * as React from "react";
import Taro, { useLaunch } from "@tarojs/taro";
import { withProvider } from "./hoc";
import { getLatestUpdateVersion } from "./lib/device-system-utils";

const App = ({ children }: { children: React.ReactNode }) => {
  useLaunch((options?: any) => {
    const launchOptions = Taro.getLaunchOptionsSync();
    const extendData = options?.extendData ?? {};
    getLatestUpdateVersion();

    if (typeof extendData !== "object") {
      Taro.setStorageSync("customParams", extendData);
    }
    Taro.onError((error) => {
      console.error("Global error handler:", error);
      Taro.showToast({
        title: "Oops terjadi kesalahan, kembali ke menu utama.",
        icon: "error",
        duration: 3000,
      });
      // Taro.reLaunch({
      //   url: "/pages/LandingPageRamadan/index",
      // });
    });
    Taro.onPageNotFound((res) => {
      console.error("Page not found:", res);
      Taro.showToast({
        title: "Oops terjadi kesalahan, kembali ke menu utama.",
        icon: "error",
        duration: 3000,
      });
    });
    if (launchOptions?.query) {
      console.log("Query parameters:", launchOptions.query);
    }
  });

  return children;
};

export default withProvider(App);
