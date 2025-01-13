import * as React from "react";
import Taro from "@tarojs/taro";
import { withProvider } from "./hoc";
import "./index.css";
import "./app.scss";

interface AppProps {
  children: React.ReactNode;
}

class App extends React.Component<AppProps> {
  componentDidMount() {
    this.onLaunch();
  }

  onLaunch() {
    // Retrieve extendData from the launch options
    const launchOptions = Taro.getLaunchOptionsSync();
    const extendData = launchOptions?.query?.extendData;

    // Taro.showToast({
    //   title: JSON.stringify(launchOptions?.query),
    //   icon: "none", // You can use 'success', 'loading', 'none', etc.
    //   duration: 10000, // Duration in milliseconds
    // });
    console.log("App launched with extendData:", extendData);
    // if (extendData) {
    //   Taro.setStorageSync("customParams", extendData);
    // }
  }

  render() {
    return this.props.children;
  }
}

export default withProvider(App);
