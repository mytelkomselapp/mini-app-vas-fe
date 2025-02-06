import { Text, View } from "@tarojs/components";
import bgLanding from "../../assets/bg/bg-ramadhan.svg";
import { handleNavigate } from "../../lib/utils";
import FeatureCard from "./components/FeatureCard";
import PrayerCard, { PrayerCardProps } from "./components/PrayerCard";
import Promo from "./components/Promo";
import SpecialCommerce from "./components/SpecialCommerce";
import SpecialFilm from "./components/SpecialFilm";
import SpecialPackage from "./components/SpecialPackage";
import SpecialGame from "./components/SpecialGame";
import NewsCardList from "./components/News";
import { usePostRegisterUser } from "../../network";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";

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
  const [latitude, setLatitude] = useState("0");
  const [longitude, setLongitude] = useState("0");
  const {
    mutateAsync: doRegisterUser,
    isLoading: isLoadingRegisterUser,
    data: dataRawRegisterUser,
  } = usePostRegisterUser();
  const dataRegisterUser = dataRawRegisterUser?.data?.data;
  const city = dataRegisterUser?.city?.city ?? "-";
  const nearestPrayerTime =
    (dataRegisterUser?.nearest_pray_time as PrayerCardProps) ?? {};
  const notificationStatus = dataRegisterUser?.notification_status === "ON";
  // const {
  //   data: nearestCity,
  //   isLoading,
  //   refetch: refetchNearestCity,
  // } = useFetchNearestCity({ latitude, longitude }, false);

  // useEffect(() => {
  //   if (latitude && longitude) {
  //     fetchLocation();
  //   }
  // }, [latitude, longitude]);

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    await getLocation();
    doRegisterUser({ latitude, longitude });
  };

  const getLocation = () => {
    Taro.getLocation({
      type: "wgs84",
      success: (res) => {
        console.log({ res });
        setLatitude(res?.latitude?.toString());
        setLongitude(res?.longitude?.toString());
      },
      fail: (err) => {
        console.error("Failed to get location:", err);
      },
    });
  };

  return (
    <View className="bg-white h-full">
      <View
        style={{ backgroundImage: `url(${bgLanding})` }}
        className="bg-cover bg-no-repeat bg-center "
      >
        <View className="p-4">
          <PrayerCard
            city={city}
            nearestPrayTime={nearestPrayerTime}
            notificationStatus={notificationStatus}
          />
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
                feature?.path
                  ? () =>
                      handleNavigate(
                        feature?.path,
                        "",
                        feature?.name?.toLowerCase() === "kiblat"
                          ? dataRegisterUser?.city
                          : null
                      )
                  : {}
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
