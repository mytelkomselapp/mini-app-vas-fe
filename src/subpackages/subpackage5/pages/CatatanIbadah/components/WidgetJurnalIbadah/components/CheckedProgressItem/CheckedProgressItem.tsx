import React from "react";
import { Text } from "@tarojs/components";
import StampIcon from "../../../../../../../../assets/stamp.svg";
import StampIconGray from "../../../../../../../../assets/icon-stamp-gamehub-gray.svg";
import IcoWhiteCheck from "../../../../../../../../assets/ico-white-check.svg";

export interface CheckedProgressItemProps {
  isActive: boolean;
  isLastItem: boolean;
  milestone: number;
  progress: number;
}

const CheckedProgressItem: React.FC<CheckedProgressItemProps> = ({
  isActive,
  isLastItem,
  milestone,
  progress,
}) => {
  return (
    <div
      style={{ border: "2px solid white" }}
      className={`relative  ${
        isLastItem
          ? "w-[44px] h-[30px] top-[-6px]"
          : "w-[44px] h-[28px] top-[-5px]"
      } ${
        progress >= milestone ? "bg-[#fda22b]" : "bg-[#dae0e9]"
      } flex justify-center relative items-center rounded-full shadow-lg z-[1px] transition-transform duration-500`}
    >
      <div className="flex justify-center z-1 items-center relative w-full h-full">
        <div className="relative left-[2px] flex gap-x-1">
          {isActive ? (
            <img
              className={`delay-1000 transition-opacity duration-1000 ${
                isActive ? "opacity-100" : "opacity-100"
              }`}
              src={IcoWhiteCheck}
              alt="icoWhiteCheck"
              width="16px"
              height="16px"
            />
          ) : (
            <Text
              style={{
                textShadow: `0 0 1px ${isActive ? "#ed0226" : "#000"}`,
              }}
              className={`delay-1000 z-10 text-[11px] text-white transition-opacity duration-1000 ${
                isActive ? "opacity-" : "opacity-100"
              }`}
            >
              {milestone}
            </Text>
          )}
          <img
            src={isActive ? StampIcon : StampIconGray}
            alt="StampIcon"
            width="16px"
            height="16px"
          />
        </div>
      </div>
    </div>
  );
};

export default CheckedProgressItem;
