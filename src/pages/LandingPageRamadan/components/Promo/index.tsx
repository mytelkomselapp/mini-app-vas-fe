import { useState, useEffect } from "react";
import { ScrollView, View, Text, Image } from "@tarojs/components";
import dummyPromoBackdrop from "../../../../assets/dummy-promo-backdrop.png";

const Promo = () => {
  const promos = [
    {
      title: "Promo Ramdahan Meriah",
      badge: "Spesial Ramadan",
      time: "23:59:59",

      imgSrc: dummyPromoBackdrop, // Replace with actual image URL
    },
    {
      title: "Serba Lima Ribu",
      badge: "Hiburan",
      time: "19:50:10",

      imgSrc: dummyPromoBackdrop, // Replace with actual image URL
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

  return (
    <ScrollView className="overflow-x-scroll pl-4 pt-1 w-[100vw]" scrollX>
      <View className="flex flex-row space-x-4">
        {promos.map((promo, index) => (
          <View
            key={index}
            className={`w-80 min-w-[200px] rounded-lg  flex-shrink-0 ${
              index === promos?.length - 1 ? "pr-8" : ""
            }`}
          >
            <View>
              <Image
                src={promo.imgSrc}
                className="w-full h-32 object-cover rounded-md"
                mode="aspectFill"
              />
            </View>
            <Badge badge={promo.badge} time={promo.time} />
            <View className="mt-0 pt-1 text-[12.5px] font-semibold font-sans">
              {promo.title}
              {/* <Text className="text-[12px] font-semibold leading-[16px]">
                {promo.title}
              </Text> */}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Promo;
