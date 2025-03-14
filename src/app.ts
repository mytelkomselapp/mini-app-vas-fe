import * as React from "react";
import Taro, { useLaunch } from "@tarojs/taro";
import { withProvider } from "./hoc";
import "./index.css";
import "./app.scss";
import { getLatestUpdateVersion } from "./lib/utils";

const env = process.env.NODE_ENV;

const App = ({ children }: { children: React.ReactNode }) => {
  useLaunch((options?: any) => {
    const launchOptions = Taro.getLaunchOptionsSync();
    const extendData = options?.extendData ?? {};
    console.log({ extendData });
    getLatestUpdateVersion();
    // Taro.setEnableDebug({
    //   enableDebug: true,
    //   // enableDebug: env === "development",
    // });

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
      // Redirect to home page or any other page
      // Taro.reLaunch({
      //   url: "/pages/LandingPageRamadan/index",
      // });
    });
    // Taro.showToast({
    //   title: JSON.stringify(extendData, null, 4),
    //   icon: "none", // You can use 'success', 'loading', 'none', etc.
    //   duration: 10000, // Duration in milliseconds
    // });
    // Perform initialization logic here
    if (launchOptions?.query) {
      console.log("Query parameters:", launchOptions.query);
    }
  });

  return children;
};

export default withProvider(App);
