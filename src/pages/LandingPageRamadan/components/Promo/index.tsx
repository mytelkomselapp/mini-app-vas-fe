import { useState, useEffect } from "react";
import { View, Text, Image, Swiper, SwiperItem } from "@tarojs/components";
import {
  HeaderSection,
  Promo as PromoTypes,
} from "../../../../network/types/response-props";
import Taro from "@tarojs/taro";

const Promo = ({
  data = [],
  header,
}: {
  data: PromoTypes[];
  header: HeaderSection;
}) => {
  const [current, setCurrent] = useState(0);
  const promos = [
    {
      title: "Promo Ramadan Meriah",
      badge: "Spesial Ramadan",
      time: "23:59:59",

      imgSrc: "https://placehold.co/600x400", // Replace with actual image URL
    },
    {
      title: "Serba Lima Ribu",
      badge: "Hiburan",
      time: "19:50:10",

      imgSrc: "https://placehold.co/600x400", // Replace with actual image URL
    },
    {
      title: "Serba Lima Ribu",
      badge: "Hiburan",
      time: "19:50:10",

      imgSrc: "https://placehold.co/600x400", // Replace with actual image URL
    },
    // Add more promo objects as needed
  ];

  const Badge = ({ badge, time }) => {
    const [countdown, setCountdown] = useState(time);

    useEffect(() => {
      const targetTime = new Date();
      const [hours, minutes, seconds] = time.split(":").map(Number);
      targetTime.setHours(targetTime.getHours() + hours);
      targetTime.setMinutes(targetTime.getMinutes() + minutes);
      targetTime.setSeconds(targetTime.getSeconds() + seconds);

      const updateCountdown = () => {
        const now = new Date();
        const difference = targetTime.getTime() - now.getTime();

        if (difference > 0) {
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setCountdown(
            `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
              2,
              "0"
            )}:${String(seconds).padStart(2, "0")}`
          );
        } else {
          setCountdown("00:00:00");
        }
      };

      const interval = setInterval(updateCountdown, 1000);

      return () => clearInterval(interval);
    }, [time]);

    const redBadgePosition =
      badge?.length < 10 ? "right-[85px]" : "right-[55px]"; // Adjusted width calculation
    return (
      <View className="relative mt-1 flex items-center">
        {/* Blue Badge */}
        <View
          className=" text-white pl-4 pr-6 py-1 text-[10px] font-bold font-batikSans rounded-full inline-flex min-w-[100px] w-max"
          style={{
            background:
              "linear-gradient(76.33deg, #003A90 8.48%, #006BE4 72.94%)",
          }}
        >
          {badge}
        </View>
        {/* Red Badge */}
        {time && (
          <View
            className={`absolute top-0 ${redBadgePosition} translate-x-1/2 -translate-y-1/2 bg-textError text-white px-4 py-1 text-[10px] rounded-full flex items-center shadow-lg min-w-[130px]`}
          >
            Flash Sale: <Text className="ml-1 text-yellow-400">⚡</Text>
            <Text className="ml-2 font-semibold">{countdown}</Text>
          </View>
        )}
      </View>
    );
  };

  const handleSwiperChange = (e) => {
    setCurrent(e.detail.current);
  };

  const onNavigate = (targetUrl?: string) => {
    if (targetUrl) {
      Taro.invokeNativePlugin({
        api_name: "openWebView",
        data: {
          url: targetUrl,
        },
        success: (res: any) => console.log("invokeNativePlugin success", res),
        fail: (err: any) => console.error("invokeNativePlugin fail", err),
      });
      // Taro.navigateTo({
      //   url:
      //     "/subpackages/subpackage9/pages/Webview/index?url=" +
      //     encodeURIComponent(targetUrl),
      // });
    }
  };

  return (
    <View className="relative">
      <View className="my-2 mx-4 flex items-center justify-between">
        <Text className="font-bold font-batikSans whitespace-pre-wrap text-[16px]">
          {header?.title}
        </Text>
        {/* <Text
          className="whitespace-pre-wrap text-xs text-grey"
          onClick={() => onNavigate(String(header?.targetUrl))}
        >
          {"Lihat Semua"}
        </Text> */}
      </View>

      <Swiper
        className="w-full"
        circular
        autoplay
        interval={3000}
        onChange={handleSwiperChange}
      >
        {data?.map((slide, key) => (
          <SwiperItem
            key={key}
            onClick={() => onNavigate(String(slide?.targetUrl))}
          >
            <div className={`w-full h-full flex items-center justify-center`}>
              <Image
                src={slide?.image}
                className="w-[91vw] h-32 object-cover rounded-md"
                mode="aspectFill"
              />
            </div>
          </SwiperItem>
        ))}
      </Swiper>
      {/* Dot Indicator */}

      <div className="flex justify-center mt-4 bg-[#00000040] rounded-2xl w-min absolute bottom-4 left-[45%] transform -translate-x-1/2 p-[2px]">
        {data.map((_, index) => (
          <div
            key={index}
            className={`rounded-[10px] mx-1 transition-all duration-300 mr-[2px] ${
              current === index ? "bg-white w-4 h-1" : "bg-[#FFFFFF99] w-1 h-1"
            }`}
          ></div>
        ))}
      </div>
    </View>
  );
};

export default Promo;
