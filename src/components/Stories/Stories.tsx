import React from "react";
import { Image, View } from "@tarojs/components";
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
    <View className="relative bg-primaryBlack w-[100vw] h-[100vh] overflow-x-hidden">
      {/* Clickable Area Previous */}
      <View
        onClick={handleBack}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
        className="pointer-events-auto absolute left-[20px] top-0 bottom-0 flex items-center justify-center h-[56px] w-[56px] z-20 m-auto rounded-full"
      >
        <Image src={ChevronLeft} className="w-[24px] h-[24px]" />
      </View>
      {/* Clickable Area Next */}
      <View
        onClick={handleNext}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
        className="pointer-events-auto absolute right-[20px] top-0 bottom-0 flex items-center justify-center h-[56px] w-[56px] z-20 m-auto rounded-full"
      >
        <Image src={ChevronRight} className="w-[24px] h-[24px]" />
      </View>

      <View className="flex items-center absolute bottom-0 top-[-30px] left-0 right-0 bg-primaryBlack z-10">
        {stories?.[activeStory]?.component}
      </View>

      {/* Indicator Wrapper */}
      <View className="flex items-center justify-center absolute z-30 w-[100%] h-[60px] bottom-0 left-0 right-0 pointer-events-none">
        <View
          className="w-[100%] px-[16px] grid gap-2 max-w-md"
          style={{
            gridTemplateColumns: `repeat(${totalStory}, minmax(0, 1fr))`,
          }}
        >
          {stories.map((_, idx) => (
            <View
              id={`story-${idx}`}
              key={`story-${idx}`}
              className={`h-[4px] w-full rounded-full ${
                idx <= activeStory ? "bg-white" : "bg-gray-500"
              }`}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default Stories;
