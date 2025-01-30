import { Text, View } from "@tarojs/components";
import bgLanding from "../../assets/bg/bg-ramadhan.svg";
import { handleNavigate } from "../../lib/utils";
import FeatureCard from "./components/FeatureCard";
import PrayerCard from "./components/PrayerCard";
import Promo from "./components/Promo";
import SpecialCommerce from "./components/SpecialCommerce";
import SpecialFilm from "./components/SpecialFilm";
import SpecialPackage from "./components/SpecialPackage";
import SpecialGame from "./components/SpecialGame";
import NewsCardList from "./components/News";
const features = [
  {
    name: "Cari Masjid",
    icon: "🏰",
    path: "/subpackages/subpackage2/pages/CariMasjid/index",
  },
  {
    name: "Kiblat",
    icon: "🧭",
    path: "/subpackages/subpackage1/pages/ArahKiblat/index",
  },
  { name: "Zakat", icon: "💰" },
  { name: "Sedekah", icon: "❤️" },
  { name: "Kirim Parsel", icon: "🎁" },
  {
    name: "Catatan\nIbadah",
    icon: "📝",
    path: "/subpackages/subpackage5/pages/CatatanIbadah/index",
  },
  {
    name: "Dzikir",
    icon: "📖",
    path: "/subpackages/subpackage4/pages/Dzikir/index",
  },
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
        <Text className="font-batikSans font-bold text-[14px] pl-4">
          {"Spesial Ramadan Untuk Kamu"}
        </Text>
        <SpecialCommerce />
        <SpecialPackage />
        <View className="flex flex-row items-center pl-4 mt-14 mb-2 justify-between">
          <Text className="font-batikSans font-bold text-[14px]">
            {"Film & Series Ramadan"}
          </Text>
          <Text className="whitespace-pre-wrap text-xs text-grey ">
            {"Lihat Semua"}
          </Text>
        </View>

        <SpecialFilm />

        <View className="flex flex-row items-center pl-4 mt-8 mb-2 justify-between">
          <Text className="font-batikSans font-bold text-[14px]">
            {"Ngabuburit Makin Seru"}
          </Text>
          <Text className="whitespace-pre-wrap text-xs text-grey ">
            {"Lihat Semua"}
          </Text>
        </View>
        <SpecialGame />

        <View className="flex flex-row items-center pl-4 mt-8 mb-2 justify-between">
          <Text className="font-batikSans font-bold text-[14px]">
            {"Kepoin Info Seputar Ramadan"}
          </Text>
          <Text className="whitespace-pre-wrap text-xs text-grey ">
            {"Lihat Semua"}
          </Text>
        </View>
        <NewsCardList />
      </View>
    </View>
  );
};

export default LandingPageRamadan;
