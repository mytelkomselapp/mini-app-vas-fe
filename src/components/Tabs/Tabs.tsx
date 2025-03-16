import React from "react";
import "./Tabs.css";
import { TabItemProps, TabsProps } from "./types";
import { View } from "@tarojs/components";

const Tabs: React.FC<TabsProps> = ({
  tabList = [],
  defaultIndex = 0,
  children,
  onChangeTab,
}) => {
  const [tabIndex, setTabIndex] = React.useState<number>(defaultIndex);

  const handleTabClick = (tab: TabItemProps) => {
    setTabIndex(tab?.index);
    onChangeTab?.(tab);
  };

  return (
    <React.Fragment>
      <View className={`flex h-[48px] w-full relative`}>
        {tabList?.map((tab) => {
          const tabActive = tabIndex === tab?.index;
          const textColor = tabActive ? "text-[#181c21]" : "text-[#9CA9B9]";

          return (
            <View
              key={tab?.index}
              onClick={() => handleTabClick(tab)}
              className={`flex flex-col items-center no-highlight justify-center relative cursor-pointer w-[50%] bg-[white] capitalize text-[16px] ${textColor} no-`}
            >
              {tab?.title}
              {tabActive && (
                <View
                  className="w-0 h-0 absolute bottom-[-1px]"
                  style={{
                    borderLeft: "18px solid transparent",
                    borderRight: "18px solid transparent",
                    borderBottom: "12px solid #eaeef1",
                  }}
                />
              )}
            </View>
          );
        })}
      </View>
      {children({
        tabIndex,
      })}
    </React.Fragment>
  );
};

export default Tabs;
