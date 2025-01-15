import * as React from "react";
import FlightLandingCardMenu from "../../modules/FlightLandingCardMenu";
import FlightForm from "../../modules/FlightForm";
import Navbar, { NavColor } from "../../components/Navbar";
import {
  useFetchCMSLandingPage,
  useFetchFlightTrack,
  usePostClaimFreeTicket,
} from "../../network";
import { screenView } from "../../network/analytics/tracker";
import FlightFollowing from "../../modules/FlightFollowing";
import FlightFollowingAll from "../../modules/FlightFollowingAll";
import bgLanding from "../../assets/bg/bg-ramadhan.svg";
import { BaseEventOrig, ScrollView, View } from "@tarojs/components";
import useUserPackageStatus from "../../hooks/useUserPackageStatus";
import PrayerCard from "./components/PrayerCard";
import FeatureCard from "./components/FeatureCard";
import { handleNavigate } from "../../lib/utils";
import Promo from "./components/Promo";
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
    <View className="bg-white h-screen">
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
    </View>
  );
};

export default LandingPageRamadan;
