import Taro from "@tarojs/taro";
import { useEffect } from "react";

/**
 * Custom hook to set the navigation bar color in a Taro application.
 *
 * @param {string} [backgroundColor="#d41f2c"] - The background color of the navigation bar.
 */
export default function useTaroNavBar(
  backgroundColor: string = "#d41f2c",
  frontColor: string = "#ffffff"
) {
  useEffect(() => {
    Taro.setNavigationBarColor({
      frontColor,
      backgroundColor, // Background color
      animation: {
        duration: 0,
        timingFunc: "easeIn",
      },
    });
  }, []);
}
