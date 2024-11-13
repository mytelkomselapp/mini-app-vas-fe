import { useState, useEffect } from "react";
import Taro from "@tarojs/taro";

type WindowResizeResult = {
  width: number;
  height: number;
};

/**
 * Hook to get window width & height on resize layout for Taro
 * @returns {Object} `width` & `height`
 */
const useWindowResize = (): WindowResizeResult => {
  // Get initial dimensions from Taro system info
  const systemInfo = Taro.getSystemInfoSync();
  
  const [width, setWidth] = useState<number>(systemInfo.windowWidth);
  const [height, setHeight] = useState<number>(systemInfo.windowHeight);

  useEffect(() => {
    const updateSize = () => {
      const info = Taro.getSystemInfoSync();
      setWidth(info.windowWidth);
      setHeight(info.windowHeight);
    };

    // Use Taro's event system
    Taro.onWindowResize(updateSize);

    // Cleanup listener
    return () => {
      Taro.offWindowResize(updateSize);
    };
  }, []);

  return { width, height };
};

export default useWindowResize;
