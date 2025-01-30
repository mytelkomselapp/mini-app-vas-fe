import { View } from "@tarojs/components";
import * as React from "react";
import "./DaftarIbadah.css";
import ProgressReward from "../ProgressReward";
import BlinkStart from "../../../../../../assets/blink-start.png";
import TaskIbadah from "./components/TaskIbadah";

export interface DaftarIbadahProps {}

const DaftarIbadah: React.FC<DaftarIbadahProps> = () => {
  return (
    <React.Fragment>
      <View className="p-[20px]">
        <p className="text-[16px] font-bold text-black">
          Daftar Ibadah - 1 Ramadhan 1446 H
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
          <div className="flex flex-col justify-center w-[65%] h-full pl-[16px]">
            <p className="text-[14px] whitespace-pre font-bold gradient-text text-transparent">
              {`Selesaikan ibadahmu dan\ndapatkan stamp hariannya!`}
            </p>
            <ProgressReward progress={10} />
          </div>

          <div className="w-[35%] h-full">
            <img src={BlinkStart} className="w-full h-full object-cover" />
          </div>
        </div>
      </View>
      <TaskIbadah />
    </React.Fragment>
  );
};

export default DaftarIbadah;
