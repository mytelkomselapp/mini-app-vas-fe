import { View } from "@tarojs/components";
import * as React from "react";
import "./DaftarIbadah.css";
import ProgressReward from "../ProgressReward";
import BlinkStart from "../../../../../../assets/blink-start.png";
import TaskIbadah from "./components/TaskIbadah";
import moment from "moment";
import EllipseStamp from "../../../../../../assets/ellipse-stamp.png";
import RewardIllustration from "../../../../../../assets/reward-illustration.png";
import { useDataCatatanIbadah } from "@/store/ramadhan";

export interface DaftarIbadahProps {}

const DaftarIbadah: React.FC<DaftarIbadahProps> = () => {
  const { currentDay } = useDataCatatanIbadah();

  return (
    <React.Fragment>
      <View className="p-[20px]">
        <p className="text-[16px] font-bold text-black">
          Daftar Ibadah - {moment(currentDay)?.date() || "{current_day}"}{" "}
          Ramadhan 1446 H
        </p>
        <div
          style={{
            border: "1px solid #EFF1F4",
            background: `linear-gradient(0deg, #FFFFFF, #FFFFFF),
      radial-gradient(20.26% 122.86% at 88.19% 20.57%, rgba(255, 174, 171, 0.2)
      0%, rgba(255, 255, 255, 0.2) 100%)`,
          }}
          className="flex mt-[6px] justify-between items-center py-[12px] w-full h-[80px] rounded-[16px]"
        >
          <div className="flex flex-col items-center justify-center w-[70%] h-full pl-[16px]">
            <p className="text-[14px] whitespace-pre font-bold gradient-text text-transparent">
              {`Selesaikan ibadahmu dan\ndapatkan stamp hariannya!`}
            </p>
            <ProgressReward progress={10} />
          </div>

          <div className="flex justify-center items-center relative w-[30%] h-full">
            <img
              src={EllipseStamp}
              className="absolute w-[87px] h-[87px] object-contain"
            />
            <img
              src={EllipseStamp}
              className="absolute w-[63px] h-[63px] object-contain"
            />
            <img
              src={BlinkStart}
              className="absolute w-full h-full object-contain"
            />
            <img
              src={RewardIllustration}
              className="absolute h-[62px] w-[56px] object-contain"
            />
          </div>
        </div>
      </View>
      <TaskIbadah />
    </React.Fragment>
  );
};

export default DaftarIbadah;
