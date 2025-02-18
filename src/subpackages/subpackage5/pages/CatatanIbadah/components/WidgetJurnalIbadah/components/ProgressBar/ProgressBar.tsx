import React from "react";
import BackdropStamp from "../../../../../../../../assets/backdrop-widget-stamp.svg";
import RewardGamehub from "../../../../../../../../assets/reward-gamehub.png";
import IcoLightning from "../../../../../../../../assets/ico_lightning.svg";

import { Text, View } from "@tarojs/components";

import "../../../DaftarIbadah/DaftarIbadah.css";
import CheckedProgressItem from "../CheckedProgressItem/CheckedProgressItem";
import { useFetchStampMissionSummary } from "../../../../../../../../network";
import { useDataCatatanIbadah } from "../../../../../../../../store/ramadhan";

const ProgressBar = () => {
  const milestones = [70, 100, 140];

  const { currentDay } = useDataCatatanIbadah();
  const { data: dataUserStamp } = useFetchStampMissionSummary({
    date: currentDay,
  });

  const dataStamp = dataUserStamp?.data?.data;
  const todayStamp = dataStamp?.collected_stamp || 0;

  const [theProgress, setTheProgress] = React.useState({
    percentageProgress: 0,
    actualProgress: 0,
  });

  const handleProgress = (progress: number) => {
    const progressPercentage = (progress / 140) * 100;
    setTheProgress({
      percentageProgress: Math.floor(progressPercentage - 12),
      actualProgress: progress,
    });
  };

  React.useEffect(() => {
    setTimeout(() => handleProgress(todayStamp), 1000);
  }, [todayStamp]);

  return (
    <View
      style={{
        borderTop: "1px solid #dae0e9",
        borderBottom: "1px solid #dae0e9",
      }}
      className="flex overflow-hidden h-[100px]"
    >
      <View className="flex flex-col w-[74%] h-full gap-[8px] p-[12px]">
        <Text className="text-[12px] font-bold gradient-text text-transparent relative">{`Selesaikan ibadah, dapatkan stamp`}</Text>

        <div className="relative w-[95%] h-[20px] mt-4 rounded-[16px] bg-[#eff1f4] flex justify-between">
          {/* Progress Bar with Animation */}
          <div
            className={`absolute progress-bar h-[20px] rounded-full transition-all duration-1000 ease-in-out`}
            style={{
              width: `${theProgress?.percentageProgress}%`,
              background: "linear-gradient(to right,#ed0226,#fda22b)",
            }}
          />

          <div className="relative w-[20px] h-[20px] flex justify-center items-center rounded-full">
            <img
              src={IcoLightning}
              alt="icoLightning"
              width="12px"
              height="12px"
            />
          </div>

          {/* Milestone Indicators */}
          {milestones?.map((milestone, index) => (
            <CheckedProgressItem
              key={index}
              isActive={theProgress?.actualProgress >= milestone}
              isLastItem={index === milestones.length - 1}
              milestone={milestone}
              progress={theProgress?.actualProgress}
            />
          ))}
        </div>
      </View>
      <View className="flex justify-end items-center w-[26%] relative h-f-full">
        <img
          src={BackdropStamp}
          className="absolute w-full h-full object-contain"
        />
        <img
          src={RewardGamehub}
          className="absolute w-[110px] h-[94px] object-contain bottom-[-1px]"
        />
      </View>
    </View>
  );
};

export default ProgressBar;
