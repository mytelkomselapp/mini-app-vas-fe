import * as React from "react";
import AsSVG from "../../../../../../../../components/Svg/Svg";
import BackgroundImage from "../../../../../../../../components/BackgroundImage";
import CheckedMarkGreen from "../../../../../../../../assets/checked-mark-green.svg";
import CheckedMarkGrey from "../../../../../../../../assets/checked-mark-green.svg";
import CancelMarkGrey from "../../../../../../../../assets/cancel-mark-grey.svg";
import LightningIcon from "../../../../../../../../assets/ico-white-lightning.svg";

import {
  DataDetailTaskRamadhanProps,
  useDataCatatanIbadah,
} from "../../../../../../../../store/ramadhan";

import BackgroundSholat from "../../../../../../../../assets/bg/catatan-ibadah/bg-sholat.png";
import BackgroundSahurBukaPuasa from "../../../../../../../../assets/bg/catatan-ibadah/bg-sahur.png";
import BackgroundSedekah from "../../../../../../../../assets/bg/catatan-ibadah/bg-sedekah-subuh.png";
import BackgroundBaca from "../../../../../../../../assets/bg/catatan-ibadah/bg-baca.png";
import BackgroundDzikir from "../../../../../../../../assets/bg/catatan-ibadah/bg-dzikir.png";
import { getCurrentTaskStatus } from "../../../../../../../../lib/utils";

export interface CardTaskIbadahProps {
  data: DataDetailTaskRamadhanProps;
  type: "pagi" | "siang" | "malam";
  onClick: (data: DataDetailTaskRamadhanProps) => void;
  condition: "checked" | "complete-disabled" | "active" | "incomplete-disabled";
}

const CardTaskIbadah: React.FC<CardTaskIbadahProps> = ({
  data,
  condition = "active",
  type = "pagi",
  onClick,
}) => {
  const { currentDay } = useDataCatatanIbadah();
  const activeTaskStatus = getCurrentTaskStatus(currentDay);

  const generateOverlayColor = () => {
    if (type === "pagi") return "rgba(1, 126, 210, 0.65)";
    if (type === "siang") return "rgba(173, 96, 0, 0.65)";

    return "rgba(7, 36, 92, 0.65)";
  };

  if (condition === "checked") {
    return (
      <div className="flex flex-col gap-y-2 justify-center items-center h-[108px] w-[108px] rounded-[16px] bg-[#e5f4ee]">
        <AsSVG src={CheckedMarkGreen} width="24px" height="24px" />
        <p className="text-[10px] font-bold text-[#008e53]">
          {data?.mission_name_id}
        </p>
      </div>
    );
  }

  if (condition === "incomplete-disabled") {
    return (
      <div className="flex flex-col gap-y-2 justify-center items-center h-[108px] w-[108px] rounded-[16px] bg-[#dae0e9]">
        <AsSVG src={CancelMarkGrey} width="24px" height="24px" />
        <p className="text-[10px] font-bold text-[#9ca9c9]">
          {data?.mission_name_id}
        </p>
      </div>
    );
  }

  if (condition === "complete-disabled") {
    return (
      <div className="flex flex-col gap-y-2 justify-center items-center h-[108px] w-[108px] rounded-[16px] bg-[#dae0e9]">
        <AsSVG src={CheckedMarkGrey} width="24px" height="24px" />
        <p className="text-[10px] font-bold text-[#9ca9c9]">
          {data?.mission_name_id}
        </p>
      </div>
    );
  }

  const generateImageUrl = () => {
    const mission = data?.mission_name_id;

    if (/^Sedekah Subuh$/.test(mission)) return BackgroundSedekah;
    if (/^Baca Al-Quran$/.test(mission)) return BackgroundBaca;
    if (/^Dzikir (Pagi|Petang)$/.test(mission)) return BackgroundDzikir;
    if (/^Sholat (Subuh|Dhuha|Zuhur|Asar|Maghrib|Isya|Tarawih)$/.test(mission))
      return BackgroundSholat;

    return BackgroundSahurBukaPuasa;
  };

  const handleClick = (data: DataDetailTaskRamadhanProps) => {
    if (["past", "present"]?.includes(activeTaskStatus)) return;

    onClick?.(data);
  };

  return (
    <BackgroundImage
      onClick={() => handleClick(data)}
      imageUrl={generateImageUrl()}
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
            <img
              src={LightningIcon}
              alt="lightning"
              width="12px"
              height="12px"
            />
          </div>
        </div>

        <div className="flex justify-center items-center h-[60%]">
          <p className="text-[10px] text-white font-bold">
            {data?.mission_name_id}
          </p>
        </div>
      </div>
    </BackgroundImage>
  );
};

export default CardTaskIbadah;
