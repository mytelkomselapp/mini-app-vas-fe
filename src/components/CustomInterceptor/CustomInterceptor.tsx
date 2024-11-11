import Taro, { PageInstance } from "@tarojs/taro";
import { View } from "@tarojs/components";
import React from "react";

export interface CustomInterceptorProps {
  onEnter: () => void;
}

const CustomInterceptor: React.FC<CustomInterceptorProps> = ({ onEnter }) => {
  React.useEffect(() => {
    // Create the intersection observer
    const observer = Taro.createIntersectionObserver(
      Taro.getCurrentInstance().page as PageInstance,
      {
        thresholds: [0.5], // Trigger when at least 50% of the element is visible
      }
    );

    // Set up the observer to observe the element by selector or ref
    observer.relativeToViewport().observe(".observed-element", (res) => {
      // @ts-ignore
      if (res.intersectionRatio > 0.5) {
        // Adjust visibility threshold if needed

        onEnter?.();
        observer.disconnect();
      }
    });

    // Cleanup on component unmount
    return () => observer.disconnect();
  }, []);

  return (
    <View>
      <View style={{ height: 10 }} className="observed-element"></View>
    </View>
  );
};

export default CustomInterceptor;
