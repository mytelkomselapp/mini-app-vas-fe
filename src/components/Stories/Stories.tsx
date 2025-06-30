import React from "react";
import { Image, Text, View } from "@tarojs/components";
import { StoriesProps } from "./type";

import ChevronLeft from "../../assets/ico_chevron_left.svg";
import ChevronRight from "../../assets/ico-chevron-right.svg";

const Stories: React.FC<StoriesProps> = ({
  stories = [],
  defaultStory = 0,
  onChangeStory,
}) => {
  const [activeStory, setActiveStory] = React.useState<number>(0);

  const totalStory = stories?.length;

  const handleNext = () => {
    if (activeStory + 1 >= totalStory) return;
    const currentStory = activeStory + 1;

    setActiveStory(currentStory);
    onChangeStory?.(stories?.[activeStory]);
  };

  const handleBack = () => {
    if (activeStory <= 0) return;
    const currentStory = activeStory - 1;

    setActiveStory(currentStory);
    onChangeStory?.(stories?.[activeStory]);
  };

  React.useEffect(() => {
    if (defaultStory > 0) {
      setActiveStory(defaultStory);
    }
  }, [defaultStory]);

  return (
    <View className="relative bg-black w-[100vw] h-[100vh] overflow-x-hidden">
      {/* Story Content */}
      <View
        className="flex items-center absolute bottom-0 top-[-30px] left-0 right-0 bg-black"
        style={{ zIndex: 1 }}
      >
        {stories?.[activeStory]?.component}
      </View>

      {/* Indicator Wrapper */}
      <View
        className="flex items-center justify-center absolute w-[100%] h-[60px] bottom-0 left-0 right-0 pointer-events-none"
        style={{ zIndex: 99999 }}
      >
        <View className="flex w-full justify-between items-center bg-black px-[16px] relative z-10 pointer-events-auto">
          <View
            onClick={handleBack}
            className="flex gap-x-1 items-center pointer-events-auto"
          >
            <Image
              src={ChevronLeft}
              style={{
                width: "14px",
                height: "14px",
              }}
            />
            <Text
              className={`text-[12px] flex gap-x-1 ${
                activeStory <= 0 ? "text-[#9ca9b9]" : "text-white"
              }`}
            >
              Sebelumnya
            </Text>
          </View>
          <Text className="text-[12px] text-[#9ca9b9]">
            <b className="text-white">{activeStory + 1}</b>/{totalStory}
          </Text>
          <View
            onClick={handleNext}
            className="flex gap-x-1 items-center pointer-events-auto"
          >
            <Text
              className={`text-[12px] flex gap-x-1 ${
                activeStory + 1 >= totalStory ? "text-[#9ca9b9]" : "text-white"
              }`}
            >
              Selanjutnya
            </Text>
            <Image
              src={ChevronRight}
              style={{
                width: "14px",
                height: "14px",
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Stories;
