import * as React from "react";
import { Zap } from "lucide-react";
import BackgroundImage from "../../../../../../../../components/BackgroundImage";
import CheckedMarkGreen from "../../../../../../../../assets/checked-mark-green.svg";
import CheckedMarkGrey from "../../../../../../../../assets/checked-mark-green.svg";
import CancelMarkGrey from "../../../../../../../../assets/cancel-mark-grey.svg";
import AsSVG from "../../../../../../../../components/Svg/Svg";
import { DataDetailTaskRamadhanProps } from "../../../../../../../../store/ramadhan";

export interface CardTaskIbadahProps {
  id: number;
  type: "morning" | "afternoon" | "night";
  onClick: (data: DataDetailTaskRamadhanProps) => void;
  imageUrl: any;
  title: string;
  condition: "checked" | "complete-disabled" | "active" | "incomplete-disabled";
}

const CardTaskIbadah: React.FC<CardTaskIbadahProps> = ({
  id,
  condition = "active",
  title = "",
  type = "morning",
  imageUrl,
  onClick,
}) => {
  const generateOverlayColor = () => {
    if (type === "morning") return "rgba(1, 126, 210, 0.65)";
    if (type === "afternoon") return "rgba(173, 96, 0, 0.65)";

    return "rgba(7, 36, 92, 0.65)";
  };

  if (condition === "checked") {
    return (
      <div className="flex flex-col gap-y-2 justify-center items-center h-[108px] w-[108px] rounded-[16px] bg-[#e5f4ee]">
        <AsSVG src={CheckedMarkGreen} width="24px" height="24px" />
        <p className="text-[10px] font-bold text-[#008e53]">{title}</p>
      </div>
    );
  }

  if (condition === "incomplete-disabled") {
    return (
      <div className="flex flex-col gap-y-2 justify-center items-center h-[108px] w-[108px] rounded-[16px] bg-[#dae0e9]">
        <AsSVG src={CancelMarkGrey} width="24px" height="24px" />
        <p className="text-[10px] font-bold text-[#9ca9c9]">{title}</p>
      </div>
    );
  }

  if (condition === "complete-disabled") {
    return (
      <div className="flex flex-col gap-y-2 justify-center items-center h-[108px] w-[108px] rounded-[16px] bg-[#dae0e9]">
        <AsSVG src={CheckedMarkGrey} width="24px" height="24px" />
        <p className="text-[10px] font-bold text-[#9ca9c9]">{title}</p>
      </div>
    );
  }

  return (
    <BackgroundImage
      onClick={() =>
        onClick({
          id,
          title,
        })
      }
      imageUrl={imageUrl}
      bgSize="cover"
      className="h-[108px] w-[108px] rounded-[16px]"
    >
      <div
        style={{ backgroundColor: generateOverlayColor() }}
        className="w-full h-full rounded-[16px] brightness-110 blur-[40px]"
      >
        <div className="flex justify-end w-full">
          <div className="flex justify-center gap-x-1 items-center w-[50px] h-[25px] bg-[#ff0025] rounded-tr-[16px] rounded-bl-[12px]">
            <p className="text-white text-[10px] font-bold">+10</p>
            <Zap size={10} color="white" />
          </div>
        </div>

        <div className="flex justify-center items-center h-[60%]">
          <p className="text-[10px] text-white font-bold">{title}</p>
        </div>
      </div>
    </BackgroundImage>
  );
};

export default CardTaskIbadah;
