import { useEffect, useState } from "react";
import "./ProgressReward.css";
import icoLightning from "../../../../../../assets/ico_lightning.svg";
import { CheckedItem } from "./components";

export interface ProgressRewardProps {
  progress: number;
  dailyMaxStamp: number;
}

const ProgressReward: React.FC<ProgressRewardProps> = ({
  progress = 0,
  dailyMaxStamp,
}) => {
  const milestones = [70, 100, 140];
  // const theProgress = progress > 100 ? 100 : progress;
  const [theProgress, setTheProgress] = useState({
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

  useEffect(() => {
    setTimeout(() => handleProgress(progress), 1000);
  }, [progress]);

  return (
    <div className="relative w-full h-[20px] mt-4 rounded-[16px] bg-[#eff1f4] flex justify-between">
      {/* Progress Bar with Animation */}
      <div
        className={`absolute progress-bar h-[20px] rounded-full transition-all duration-1000 ease-in-out`}
        style={{
          width: `${theProgress?.percentageProgress}%`,
          background: "linear-gradient(to right,#ed0226,#fda22b)",
        }}
      />

      <div className="relative w-[20px] h-[20px] flex justify-center items-center rounded-full">
        <img src={icoLightning} alt="icoLightning" width="12px" height="12px" />
      </div>

      {/* Milestone Indicators */}
      {milestones?.map((milestone, index) => (
        <CheckedItem
          key={index}
          isActive={theProgress?.actualProgress >= milestone}
          milestone={milestone}
          progress={theProgress?.actualProgress}
        />
      ))}
    </div>
  );
};

export default ProgressReward;
