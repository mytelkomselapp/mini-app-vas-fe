import { View } from "@tarojs/components";
import React from "react";

export interface PillProps {
  bgColor?: string;
  textColor?: string;
  title: string | React.ReactNode;
  padding?: string;
  borderRadius?: string;
  alignSelf?: string;
}

const Pill: React.FC<PillProps> = ({
  bgColor = "#008e53",
  textColor = "white",
  title = "",
  padding = "2px 4px",
  borderRadius = "4px",
  alignSelf = "",
}) => {
  return (
    <View
      className="rounded-[4px] text-[8px]"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        padding,
        borderRadius,
        alignSelf,
      }}
    >
      {title}
    </View>
  );
};

export default Pill;
