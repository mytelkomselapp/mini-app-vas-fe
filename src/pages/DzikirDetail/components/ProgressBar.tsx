import { View, Text } from "@tarojs/components";
import { FC } from "react";

interface ProgressBarProps {
  progress: number;
  max?: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ progress, max = 100 }) => {
  // Ensure the progress doesn't exceed the max value
  const safeProgress = Math.min(Math.max(progress, 0), max);
  const progressPercentage = (safeProgress / max) * 100;

  return (
    <View className="w-full relative">
      <View className="flex items-center">
        {/* Icon Placeholder */}

        {/* Progress Bar */}
        <View className="w-full bg-inactiveGrey h-[6px] rounded-full overflow-hidden">
          <View
            className="bg-mustard h-[6px] rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          ></View>
        </View>

        {/* Progress Text */}
        <Text className="text-white text-[10px] ml-2">
          {safeProgress}/{max}
        </Text>
      </View>
    </View>
  );
};

export default ProgressBar;
