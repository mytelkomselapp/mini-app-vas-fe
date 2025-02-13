import React from "react";
import { View, Text } from "@tarojs/components";

interface BottomNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
  readTimes: number;
  readTotal: number;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  onPrevious,
  onNext,
  currentStep,
  totalSteps,
  readTimes,
  readTotal,
}) => {
  const progress = (Math.abs(readTotal - readTimes) / readTotal) * 100;

  return (
    <View className="fixed bottom-0 left-0 right-0 bg-gray-100 shadow-lg flex justify-between items-center py-5 px-8 border-t border-gray-300">
      <Text
        className={`text-[14px] font-batikSans ${
          currentStep === 1 ? "text-gray-400" : "text-textError"
        }`}
        onClick={() => {
          currentStep > 1 ? onPrevious() : {};
        }}
      >
        Sebelumnya
      </Text>

      <View className="absolute left-[40%] transform -translate-x-[40%] -top-4">
        <View
          className="circular-progress"
          style={
            {
              "--progress": `${progress}%`,
              "--bg-color": "#FF0025", // Adjust as needed
            } as React.CSSProperties & Record<string, string>
          }
        >
          <View className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">
            {readTimes}
          </View>
        </View>
      </View>

      <Text
        className={`text-[14px] font-batikSans ${
          currentStep === totalSteps ? "text-gray-400" : "text-textError"
        }`}
        onClick={() => {
          currentStep < totalSteps ? onNext() : {};
        }}
      >
        Selanjutnya
      </Text>
    </View>
  );
};

export default BottomNavigation;
