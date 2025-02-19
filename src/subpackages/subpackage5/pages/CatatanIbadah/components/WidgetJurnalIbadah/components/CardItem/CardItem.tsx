import React from "react";
import { Text, View } from "@tarojs/components";
import { DataDetailTaskRamadhanProps } from "../../../../../../../../store/ramadhan";

import "./CardItem.css";

import BackgroundSholat from "../../../../../../../../assets/bg/catatan-ibadah/bg-sholat.png";
import BackgroundSahurBukaPuasa from "../../../../../../../../assets/bg/catatan-ibadah/bg-sahur.png";
import BackgroundSedekah from "../../../../../../../../assets/bg/catatan-ibadah/bg-sedekah-subuh.png";
import BackgroundBaca from "../../../../../../../../assets/bg/catatan-ibadah/bg-baca.png";
import BackgroundDzikir from "../../../../../../../../assets/bg/catatan-ibadah/bg-dzikir.png";
import BackgroundImage from "../../../../../../../../components/BackgroundImage";
import LightningIcon from "../../../../../../../../assets/ico-white-lightning.svg";
import Checkbox from "../../../../../../../../assets/checkbox.svg";

export interface CardItemProps {
  data: DataDetailTaskRamadhanProps;
  type: "pagi" | "siang" | "malam";
  onClick: (data: DataDetailTaskRamadhanProps) => void;
  animate: "hide" | "slide-up" | "no-animation";
}

const CardItem: React.FC<CardItemProps> = ({
  data,
  type,
  onClick,
  animate = "no-animation",
}) => {
  const generateChipBgColor = () => {
    if (type === "pagi") return "#3599db";
    if (type === "siang") return "#F6B058";

    return "#39517d";
  };

  const generateOverlayColor = () => {
    if (type === "pagi") return "rgba(1, 126, 210, 0.40)";
    if (type === "siang") return "rgba(246, 176, 88, 0.40)";

    return "transparent";
  };

  const generateBackgroundColor = () => {
    if (type === "pagi") return "#017ed2";
    if (type === "siang") return "#f49c2e";

    return "#0b2661";
  };
  const generateImageUrl = () => {
    const mission = data?.mission_name_id;

    if (/^Sedekah Subuh$/.test(mission)) return BackgroundSedekah;
    if (/^Baca Al-Quran$/.test(mission)) return BackgroundBaca;
    if (/^Dzikir (Pagi|Petang)$/.test(mission)) return BackgroundDzikir;
    if (
      /^Sholat (Subuh|Dhuha|Zuhur|Asar|Maghrib|Isya|Tarawih|Tahajud|Tahajjud)$/.test(
        mission
      )
    )
      return BackgroundSholat;

    return BackgroundSahurBukaPuasa;
  };

  return (
    <View
      onClick={() => onClick(data)}
      className={`flex w-full h-[56px] mb-[8px] rounded-[16px] flex-row justify-between ${
        animate === "hide"
          ? "animate-[hideCard_0.5s_ease-out] opacity-0"
          : animate === "slide-up"
          ? "animate-[slideUp_0.5s_ease-out_0.5s] slide-up"
          : "opacity-100"
      }`}
    >
      <BackgroundImage
        // onClick={() => handleClick(data)}
        imageUrl={generateImageUrl()}
        bgSize="cover"
        className="w-[15%] h-full rounded-l-[16px]"
      >
        <div
          style={{
            background: `linear-gradient(to right, ${generateOverlayColor()} 50%, ${generateBackgroundColor()} 100%)`,
          }}
          className="w-full h-full rounded-l-[16px] brightness-110 backdrop-blur-sm"
        />
      </BackgroundImage>
      {/* <View className="w-[20%] bg-red-200 h-full rounded-l-[16px]"></View> */}
      <View
        style={{ backgroundColor: generateBackgroundColor() }}
        className="flex justify-between items-center w-[85%] h-full rounded-r-[16px]"
      >
        <Text className="w-[60%] text-[14px] pl-[12px] text-white">
          {data?.mission_name_id}
        </Text>
        <div className="flex justify-between items-center w-[40%] px-[20px] h-full">
          <div
            style={{ backgroundColor: generateChipBgColor() }}
            className="flex justify-center items-center gap-x-1 rounded-[16px] h-[20px] w-[47px]"
          >
            <Text className="text-[10px] text-white">+10</Text>
            <img
              src={LightningIcon}
              alt="lightning"
              width="12px"
              height="12px"
            />
          </div>

          <img src={Checkbox} alt="checkbox" width="24px" height="24px" />
        </div>
      </View>
    </View>
  );
};

export default CardItem;
