import * as React from "react";
import Taro, { useLaunch } from "@tarojs/taro";
import { withProvider } from "./hoc";
import "./index.css";
import "./app.scss";

const App = ({ children }: { children: React.ReactNode }) => {
  useLaunch((options?: any) => {
    const launchOptions = Taro.getLaunchOptionsSync();
    const extendData = options?.extendData ?? {};
    console.log({ extendData });
    if (typeof extendData !== "object") {
      Taro.setStorageSync("customParams", extendData);
    }
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
