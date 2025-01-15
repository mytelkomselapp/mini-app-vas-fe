import { Text, View } from "@tarojs/components";
import arrowRight from "../../assets/arrow-right.svg";
import bgLanding from "../../assets/bg/bg-ramadhan.svg";
import { handleNavigate } from "../../lib/utils";
import FeatureCard from "./components/FeatureCard";
import PrayerCard from "./components/PrayerCard";
import Promo from "./components/Promo";
import SpecialCommerce from "./components/SpecialCommerce";
import SpecialFilm from "./components/SpecialFilm";
import SpecialPackage from "./components/SpecialPackage";
import SpecialGame from "./components/SpecialGame";
const features = [
  { name: "Cari Masjid", icon: "🏰" },
  { name: "Kiblat", icon: "🧭", path: "/pages/ArahKiblat/index" },
  { name: "Zakat", icon: "💰" },
  { name: "Sedekah", icon: "❤️" },
  { name: "Kirim Parsel", icon: "🎁" },
  { name: "Catatan\nIbadah", icon: "📝" },
  { name: "Dzikir", icon: "📖" },
  { name: "Kuis", icon: "❓" },
];
const LandingPageRamadan = () => {
  return (
    <View className="bg-white h-full">
      <View
        style={{ backgroundImage: `url(${bgLanding})` }}
        className="bg-cover bg-no-repeat bg-center "
      >
        <View className="p-4">
          <PrayerCard />
        </View>
      </View>
      <div className="flex items-center justify-center w-full pt-4 mb-4">
        <div className="grid grid-cols-4 gap-2">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              name={feature.name}
              handleClick={
                feature?.path ? () => handleNavigate(feature?.path) : {}
              }
            />
          ))}
        </div>
      </div>

      <Promo />
      <View className="p-4 pl-0">
        <Text className="font-batikSans font-bold text-base pl-4">
          {"Spesial Ramadan Untuk Kamu"}
        </Text>
        <SpecialCommerce />
        <SpecialPackage />
        <View className="flex flex-row items-center pl-4 mt-4 justify-between">
          <Text className="font-batikSans font-bold text-base">
            {"Film & Series Ramadan"}
          </Text>
          <img
            src={arrowRight}
            className="w-4 h-4 ml-2"
            style={{
              filter:
                "invert(41%) sepia(8%) saturate(0%) hue-rotate(180deg) brightness(90%) contrast(90%)",
            }}
          />
        </View>

        <SpecialFilm />

        <View className="flex flex-row items-center pl-4 mt-4 justify-between">
          <Text className="font-batikSans font-bold text-base">
            {"Ngabuburit Makin Seru"}
          </Text>
        </View>
        <SpecialGame />
      </View>
    </View>
  );
};

export default LandingPageRamadan;
