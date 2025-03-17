import React, { useEffect, useRef, useState } from "react";
import Taro from "@tarojs/taro";
import { ScrollView, Text, View } from "@tarojs/components";
import { FilterChipItemProps, FilterChipsProps } from "./type";

const FilterChips: React.FC<FilterChipsProps> = ({
  defaultActiveIndex = 0,
  filterList = [],
  onClick,
  className = "",
  containerClassName = "",
}) => {
  const scrollableContainerRef = useRef();
  const [chipActiveIndex, setChipActiveIndex] =
    useState<number>(defaultActiveIndex);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  const handleClick = (data: FilterChipItemProps) => {
    setChipActiveIndex(data.index);
    onClick?.(data);
    scrollToTab(`chip-${data.index}`);
  };

  const scrollToTab = (id: string) => {
    Taro.createSelectorQuery()
      .select(`#${id}`)
      .boundingClientRect((res) => {
        if (res) {
          Taro.createSelectorQuery()
            .select("#scrollable-container")
            .scrollOffset((scroll) => {
              if (scroll) {
                // @ts-ignore
                const newScrollLeft = scroll.scrollLeft + res.left - 50; // Adjust for padding
                console.log("Scrolling to:", newScrollLeft);
                setScrollLeft(newScrollLeft);
              }
            })
            .exec();
        }
      })
      .exec();
  };

  useEffect(() => {
    setChipActiveIndex(defaultActiveIndex);
  }, [defaultActiveIndex]);

  return (
    <ScrollView
      id="scrollable-container"
      ref={scrollableContainerRef}
      scrollX
      scrollAnimationDuration="100"
      scrollWithAnimation
      scrollLeft={scrollLeft}
      className={`overflow-x-auto no-scrollbar ${className}`}
    >
      <View className={`flex gap-x-2 whitespace-nowrap flex-nowrap py-1 ${containerClassName}`}>
        {filterList?.map((data, idx) => {
          const isActive = chipActiveIndex === idx;
          const chipBgColor = isActive ? "bg-[#001a41]" : "bg-white";
          const chipTextColor = isActive ? "text-white" : "text-primaryBlack";

          return (
            <React.Fragment key={idx}>
              <View
                id={`chip-${idx}`}
                onClick={() => handleClick({ ...data, index: idx })}
                style={{ border: isActive ? "" : "1px solid #dae0e9" }}
                className={`flex items-center justify-center rounded-full px-4 py-2 cursor-pointer transition-all no-highlight ${chipBgColor}`}
              >
                <Text className={`text-sm ${chipTextColor}`}>{data.title}</Text>
              </View>
            </React.Fragment>
          );
        })}
        <div className="self-start w-[16px] opacity-0">---</div>
      </View>
    </ScrollView>
  );
};

export default FilterChips;
