import React from "react";
import icoWhiteCheck from "../../../../../../../../assets/ico-white-check.svg";

export interface CheckedItemProps {
  isActive: boolean;
  milestone: number;
  progress: number;
}

const CheckedItem: React.FC<CheckedItemProps> = ({
  isActive,
  milestone,
  progress,
}) => {
  return (
    <div
      style={{ border: "2px solid white" }}
      className={`relative top-[-1px] w-[20px] h-[20px] ${
        progress >= milestone ? "bg-[#fda22b]" : "bg-[#dae0e9]"
      } flex justify-center items-center rounded-full transition-transform duration-500 ${
        progress >= milestone ? "scale-125" : ""
      }`}
    >
      <div className="flex justify-center items-center relative w-full h-full">
        <p
          className={`absolute delay-1000 z-10 text-[10px] text-white transition-opacity duration-1000 ${
            isActive ? "opacity-0" : "opacity-100"
          }`}
        >
          {milestone}
        </p>
        <img
          className={`absolute z-1 delay-1000 transition-opacity duration-1000 ${
            isActive ? "opacity-100" : "opacity-0"
          }`}
          src={icoWhiteCheck}
          alt="icoWhiteCheck"
          width="16px"
          height="16px"
        />
      </div>
    </div>
  );
};

export default CheckedItem;
