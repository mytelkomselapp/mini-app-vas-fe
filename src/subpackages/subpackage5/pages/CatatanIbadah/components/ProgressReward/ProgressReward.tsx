import "./ProgressReward.css";
import { Zap } from "lucide-react"; // Replace with your actual icon

export interface ProgressRewardProps {
  progress: number;
}

const ProgressReward: React.FC<ProgressRewardProps> = ({ progress = 0 }) => {
  const milestones = [70, 100, 140];
  const theProgress = progress > 100 ? 100 : progress;

  return (
    <div className="relative overflow-hidden w-full h-[20px] mt-4 rounded-[16px] bg-[#eff1f4] flex justify-between">
      <div className={`absolute progress-bar h-[20px] w-[${theProgress}%]`} />
      <div className="w-[20px] h-[20px] flex justify-center items-center rounded-full transition-all duration-1000 ease-in-out">
        <Zap size={16} />
      </div>
      <div
        style={{ border: "2px solid white" }}
        className="relative top-[-2px] w-[20px] h-[20px] bg-[#dae0e9] flex justify-center items-center rounded-full"
      >
        <p className="text-[10px] text-white">{milestones?.[0]}</p>
      </div>
      <div
        style={{ border: "2px solid white" }}
        className="relative top-[-2px] w-[20px] h-[20px] bg-[#dae0e9] flex justify-center items-center rounded-full"
      >
        <p className="text-[10px] text-white">{milestones?.[1]}</p>
      </div>
      <div
        style={{ border: "2px solid white" }}
        className="relative top-[-2px] w-[20px] h-[20px] bg-[#dae0e9] flex justify-center items-center rounded-full scale-125"
      >
        <p className="text-[10px] text-white">{milestones?.[2]}</p>
      </div>
    </div>
  );
};

export default ProgressReward;
