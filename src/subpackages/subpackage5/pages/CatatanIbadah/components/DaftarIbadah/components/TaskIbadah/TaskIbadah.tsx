import * as React from "react";
import MorningIcon from "../../../../../../../../assets/morning-tab.svg";
import AfternoonIcon from "../../../../../../../../assets/afternoon-tab.svg";
import NightIcon from "../../../../../../../../assets/night-tab.svg";
import { View } from "@tarojs/components";
import BackgroundImage from "../../../../../../../../components/BackgroundImage";
import BackgroundSholat from "../../../../../../../../assets/bg/catatan-ibadah/bg-sholat.png";
import BackgroundSahur from "../../../../../../../../assets/bg/catatan-ibadah/bg-sahur.png";
import BackgroundSedekah from "../../../../../../../../assets/bg/catatan-ibadah/bg-sedekah-subuh.png";
import { Zap } from "lucide-react";

export interface TaskIbadahProps {}

const TaskIbadah: React.FC<TaskIbadahProps> = () => {
  const [activeTab, setActiveTab] = React.useState<
    "morning" | "afternoon" | "night"
  >("morning");

  const handleClick = (activeTab: "morning" | "afternoon" | "night") => {
    setActiveTab(activeTab);
  };

  const generateBorder = (isActive: boolean) => {
    if (isActive) {
      return {
        border: "2px solid #dae0e9",
        borderBottom: "2px solid white",
      };
    }

    return {};
  };

  const generateClassname = (isActive: boolean) => {
    if (isActive)
      return `text-[16px] text-center flex justify-center items-center gap-x-1 h-[40px] font-bold text-black rounded-t-[16px]`;

    return `text-[16px] text-center flex justify-center items-center gap-x-1 h-[40px] font-bold text-[#757F90]`;
  };

  return (
    <View className="mt-1">
      <div className="px-[20px] bg-white relative z-10 grid grid-cols-3">
        <div
          onClick={() => handleClick("morning")}
          style={generateBorder(activeTab === "morning")}
          className={generateClassname(activeTab === "morning")}
        >
          <img src={MorningIcon} />
          Pagi
        </div>
        <div
          onClick={() => handleClick("afternoon")}
          style={generateBorder(activeTab === "afternoon")}
          className={generateClassname(activeTab === "afternoon")}
        >
          <img src={AfternoonIcon} />
          Siang
        </div>
        <div
          onClick={() => handleClick("night")}
          style={generateBorder(activeTab === "night")}
          className={generateClassname(activeTab === "night")}
        >
          <img src={NightIcon} />
          Malam
        </div>
      </div>

      <div
        style={{ borderTop: "2px solid #dae0e9" }}
        className="w-full min-h-[150px] rounded-t-[16px] py-[12px]"
      >
        <p className="text-[12px] mb-2 px-[20px] text-[#757f90]">
          Pilih kegiatan yang sudah kamu lakukan, yuk!
        </p>

        <div className="grid grid-cols-3 px-[20px] gap-x-2 gap-y-2">
          <BackgroundImage
            imageUrl={BackgroundSholat}
            bgSize="cover"
            className="h-[108px] w-[108px] rounded-[16px]"
          >
            <div
              style={{ backgroundColor: "rgba(1, 126, 210, 0.65)" }}
              className="w-full h-full rounded-[16px] brightness-110"
            >
              <div className="flex justify-end w-full">
                <div className="flex justify-center gap-x-1 items-center w-[50px] h-[25px] bg-[#ff0025] rounded-tr-[16px] rounded-bl-[12px]">
                  <p className="text-white text-[10px] font-bold">+10</p>
                  <Zap size={10} color="white" />
                </div>
              </div>

              <div className="flex justify-center items-center h-[65%]">
                <p className="text-[10px] text-white font-bold">
                  Sholat Tahajud
                </p>
              </div>
            </div>
          </BackgroundImage>
          <BackgroundImage
            imageUrl={BackgroundSahur}
            bgSize="cover"
            className="h-[108px] w-[108px] rounded-[16px]"
          >
            <div
              style={{ backgroundColor: "rgba(1, 126, 210, 0.65)" }}
              className="w-full h-full rounded-[16px] brightness-110"
            >
              <div className="flex justify-end w-full">
                <div className="flex justify-center gap-x-1 items-center w-[50px] h-[25px] bg-[#ff0025] rounded-tr-[16px] rounded-bl-[12px]">
                  <p className="text-white text-[10px] font-bold">+10</p>
                  <Zap size={10} color="white" />
                </div>
              </div>

              <div className="flex justify-center items-center h-[65%]">
                <p className="text-[10px] text-white font-bold">Sahur</p>
              </div>
            </div>
          </BackgroundImage>
          <BackgroundImage
            imageUrl={BackgroundSholat}
            bgSize="cover"
            className="h-[108px] w-[108px] rounded-[16px]"
          >
            <div
              style={{ backgroundColor: "rgba(1, 126, 210, 0.65)" }}
              className="w-full h-full rounded-[16px] brightness-110"
            >
              <div className="flex justify-end w-full">
                <div className="flex justify-center gap-x-1 items-center w-[50px] h-[25px] bg-[#ff0025] rounded-tr-[16px] rounded-bl-[12px]">
                  <p className="text-white text-[10px] font-bold">+10</p>
                  <Zap size={10} color="white" />
                </div>
              </div>

              <div className="flex justify-center items-center h-[65%]">
                <p className="text-[10px] text-white font-bold">Sholat Subuh</p>
              </div>
            </div>
          </BackgroundImage>
          <BackgroundImage
            imageUrl={BackgroundSedekah}
            bgSize="cover"
            className="h-[108px] w-[108px] rounded-[16px]"
          >
            <div
              style={{ backgroundColor: "rgba(1, 126, 210, 0.65)" }}
              className="w-full h-full rounded-[16px] brightness-110"
            >
              <div className="flex justify-end w-full">
                <div className="flex justify-center gap-x-1 items-center w-[50px] h-[25px] bg-[#ff0025] rounded-tr-[16px] rounded-bl-[12px]">
                  <p className="text-white text-[10px] font-bold">+10</p>
                  <Zap size={10} color="white" />
                </div>
              </div>

              <div className="flex justify-center items-center h-[65%]">
                <p className="text-[10px] text-white font-bold">
                  Sedekah Subuh
                </p>
              </div>
            </div>
          </BackgroundImage>
        </div>
      </div>
    </View>
  );
};

export default TaskIbadah;
