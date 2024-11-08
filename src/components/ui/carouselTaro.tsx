import React, { useState, ReactNode } from "react";
import { Swiper, SwiperItem, View } from "@tarojs/components";

interface CarouselProps {
  autoplay?: boolean;
  circular?: boolean;
  className?: string; // Optional custom styling
  children: ReactNode; // Accepts any React nodes as children
}

const CarouselTaro: React.FC<CarouselProps> = ({
  autoplay = true,
  circular = true,
  className = "w-full h-48",
  children,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleSwiperChange = (e: { detail: { current: number } }) => {
    setCurrentIndex(e.detail.current);
  };

  // Convert children to an array to map over for dots and items
  const slides = React.Children.toArray(children);

  return (
    <View className={`relative min-h-[60vh] ${className}`}>
      <Swiper
        className="w-full h-full overflow-hidden min-h-[60vh] swiper"
        circular={circular}
        autoplay={autoplay}
        indicatorDots={false} // Using custom indicators
        current={currentIndex}
        onChange={handleSwiperChange}
      >
        {slides.map((slide, index) => (
          <SwiperItem
            className="swiper-item"
            key={index}
            //className="flex items-center justify-center bg-blue-500 text-white text-2xl"
          >
            {slide}
          </SwiperItem>
        ))}
      </Swiper>

      {/* Custom Dot Indicator */}
      <View className="">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default CarouselTaro;
