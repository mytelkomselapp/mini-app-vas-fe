import * as React from "react";
import ChevronRight from "../../../../assets/chevron-right-white.svg";
import GoldReward from "../../../../assets/gold_rewards.svg";

export interface ButtonRedeemProps {
  onClick: () => void;
  title: string;
}

const ButtonRedeem: React.FC<ButtonRedeemProps> = ({ title = "", onClick }) => {
  return (
    <div onClick={onClick} className="flex h-[32px] w-auto">
      <img src={GoldReward} className="z-[1]" />
      <div className="relative left-[-15px] flex justify-end items-center bg-[#2C2C2C] bg-opacity-50 pr-[8px] rounded-[16px] w-[116px] py-[4px]">
        <div className="flex justify-between items-center text-[12px] text-white">
          {title}
          <img src={ChevronRight} />
        </div>
      </div>
    </div>
  );
};

export default ButtonRedeem;
