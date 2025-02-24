import Taro from "@tarojs/taro";
import { useEffect } from "react";

export default function useTaroNavBar(backgroundColor: string = "#d41f2c") {
  useEffect(() => {
    Taro.setNavigationBarColor({
      frontColor: "#ffffff", // Text color
      backgroundColor, // Background color
      animation: {
        duration: 0,
        timingFunc: "easeIn",
      },
    });
  }, []);
}
