import { Image, Swiper, SwiperItem, View } from "@tarojs/components";
import premiumBadge from "../../../../assets/premium-badge-white.svg";
import { useState } from "react";

interface SwiperChangeEvent {
  detail: {
    current: number;
  };
}

const dummyData = new Array(4).fill(0);
const groupedData = new Array(Math.ceil(dummyData?.length - 2)).fill(0);

const PremiumContentSlider = () => {
  const [current, setCurrent] = useState(0);

  const handleSwiperChange = (e: SwiperChangeEvent) => {
    setCurrent(e.detail.current);
  };

  return (
    <View className="py-3">
      <Swiper
        className="w-full"
        interval={3000}
        displayMultipleItems={dummyData?.length >= 3 ? 3 : dummyData?.length}
        onChange={handleSwiperChange}
      >
        {dummyData?.map((_, key) => (
          <SwiperItem key={key} className="">
            <div className="h-full pr-3 flex relative">
              <Image
                src="https://placehold.co/236x354"
                className="object-cover max-w-[106px] max-h-[160px] w-full h-full rounded-[8px]"
                style={
                  key !== 0
                    ? { filter: "blur(2.5px)", WebkitFilter: "blur(2.5px)" }
                    : {}
                } //dummy premium content
              />
              <Image
                src={premiumBadge}
                className="absolute top-[45%] left-[40%] transform -translate-x-[40%] -translate-y-[45%] w-[15px] h-[11.25px]"
              />
            </div>
          </SwiperItem>
        ))}
      </Swiper>
      {dummyData?.length > 3 ? (
        <div className="flex justify-center mt-3 rounded-2xl">
          {groupedData.map((_, index) => (
            <div
              key={index}
              className={`rounded-[10px] mx-1 transition-all duration-300 mr-[2px] ${
                current === index
                  ? "bg-white w-4 h-1"
                  : "bg-[#FFFFFF99] w-1 h-1"
              }`}
            ></div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </View>
  );
};

export default PremiumContentSlider;
