import React from "react";
import { View, CoverView, CoverImage } from "@tarojs/components";
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

  const navButtonStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    position: "absolute" as const,
    height: "56px",
    width: "56px",
    borderRadius: "28px",
    zIndex: 9999,
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    top: "45%",
  };

  const indicatorContainerStyle = {
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: "60px",
    zIndex: 9999,
    padding: "0 24px",
  };

  const indicatorRowStyle = {
    width: "100%",
    display: "flex" as const,
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    gap: "16px",
    marginLeft: "4px",
    marginRight: "4px",
  };

  return (
    <View className="relative bg-primaryBlack w-[100vw] h-[100vh] overflow-x-hidden">
      {/* Content Container */}
      <View className="flex items-center absolute inset-x-0 bottom-0 top-[-30px] bg-primaryBlack">
        {stories?.[activeStory]?.component}
      </View>

      {/* Clickable Area Previous - Using CoverView for overlay UI */}
      <CoverView
        onClick={handleBack}
        style={{
          ...navButtonStyle,
          left: "20px",
        }}
      >
        <CoverImage
          src={ChevronLeft}
          style={{
            width: "24px",
            height: "24px",
          }}
        />
      </CoverView>

      {/* Clickable Area Next - Using CoverView for overlay UI */}
      <CoverView
        onClick={handleNext}
        style={{
          ...navButtonStyle,
          right: "20px",
        }}
      >
        <CoverImage
          src={ChevronRight}
          style={{
            width: "24px",
            height: "24px",
          }}
        />
      </CoverView>

      {/* Indicator Wrapper - Using CoverView for overlay UI */}
      <CoverView style={indicatorContainerStyle}>
        <CoverView style={indicatorRowStyle}>
          {stories.map((_, idx) => (
            <CoverView
              key={`story-${idx}`}
              style={{
                height: "4px",
                flex: 1,
                minWidth: "16px",
                borderRadius: "9999px",
                backgroundColor: idx <= activeStory ? "#ffffff" : "#6b7280",
                marginLeft: "4px",
                marginRight: "4px",
              }}
            />
          ))}
        </CoverView>
      </CoverView>
    </View>
  );
};

export default Stories;
