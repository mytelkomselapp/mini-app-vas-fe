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
import { useFetchLandingPageCMS, usePostRegisterUser } from "../../network";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import {
  usePrayerNotification,
  useRamadhanSearchLocation,
} from "../../store/ramadhan";
import { RamadhanSearchLocationProps } from "@/network/types/response-props";
import Show from "../../components/Show";
import LoadingScreen from "../../components/LoadingScreen";

type Feature = {
  name: string;
  icon?: string;
  path?: string;
};

// const features: Feature[] = [
//   {
//     name: "Cari Masjid",
//     icon: "🏰",
//     path: "/subpackages/subpackage2/pages/CariMasjid/index",
//   },
//   {
//     name: "Kiblat",
//     icon: "🧭",
//     path: "/subpackages/subpackage1/pages/ArahKiblat/index",
//   },
//   { name: "Zakat", icon: "💰" },
//   { name: "Sedekah", icon: "❤️" },
//   { name: "Kirim Parsel", icon: "🎁" },
//   {
//     name: "Catatan\nIbadah",
//     icon: "📝",
//     path: "/subpackages/subpackage5/pages/CatatanIbadah/index",
//   },
//   {
//     name: "Dzikir",
//     icon: "📖",
//     path: "/subpackages/subpackage4/pages/Dzikir/index",
//   },
//   { name: "Kuis", icon: "❓" },
// ];
const LandingPageRamadan = () => {
  const [latitude, setLatitude] = useState("0");
  const [longitude, setLongitude] = useState("0");
  const [features, setFeatures] = useState<Feature[]>([]);
  const { data: dataRawLandingPageCMS, isLoading: isLoadingLandingPageCMS } =
    useFetchLandingPageCMS();

  console.log({ dataRawLandingPageCMS });
  const {
    mutateAsync: doRegisterUser,
    isLoading: isLoadingRegisterUser,
    data: dataRawRegisterUser,
  } = usePostRegisterUser();
  const { isActive } = usePrayerNotification();

  const dataLandingPageCMS =
    dataRawLandingPageCMS?.data?.data?.ramadhanSections;

  const productSession1 = dataLandingPageCMS
    ? dataLandingPageCMS.find(
        (section) =>
          section.__component === "sections.product-section" &&
          section?.id === 1
      )?.products || []
    : [];

  const productSession1Header = dataLandingPageCMS
    ? dataLandingPageCMS.find(
        (section) =>
          section.__component === "sections.product-section" &&
          section?.id === 1
      )?.headerSection || {
        id: 0,
        title: "",
        linkTitle: "",
        targetUrl: "",
        slug: "",
      }
    : { id: 0, title: "", linkTitle: "", targetUrl: "", slug: "" };

  const productSession2 = dataLandingPageCMS
    ? dataLandingPageCMS.find(
        (section) =>
          section.__component === "sections.product-section" &&
          section?.id === 2
      )?.products || []
    : [];
  const productSession2Header = dataLandingPageCMS
    ? dataLandingPageCMS.find(
        (section) =>
          section.__component === "sections.product-section" &&
          section?.id === 2
      )?.headerSection || {
        id: 0,
        title: "",
        linkTitle: "",
        targetUrl: "",
        slug: "",
      }
    : { id: 0, title: "", linkTitle: "", targetUrl: "", slug: "" };

  const cardSession1 = dataLandingPageCMS
    ? dataLandingPageCMS.find(
        (section) =>
          section.__component === "sections.card-section" && section?.id === 1
      )?.cards || []
    : [];
  const cardSession1Header = dataLandingPageCMS
    ? dataLandingPageCMS.find(
        (section) =>
          section.__component === "sections.card-section" && section?.id === 1
      )?.headerSection || {
        id: 0,
        title: "",
        linkTitle: "",
        targetUrl: "",
        slug: "",
      }
    : { id: 0, title: "", linkTitle: "", targetUrl: "", slug: "" };

  const cardSession2 = dataLandingPageCMS
    ? dataLandingPageCMS.find(
        (section) =>
          section.__component === "sections.card-section" && section?.id === 2
      )?.cards || []
    : [];
  const cardSession2Header = dataLandingPageCMS
    ? dataLandingPageCMS.find(
        (section) =>
          section.__component === "sections.card-section" && section?.id === 2
      )?.headerSection || {
        id: 0,
        title: "",
        linkTitle: "",
        targetUrl: "",
        slug: "",
      }
    : { id: 0, title: "", linkTitle: "", targetUrl: "", slug: "" };

  const newsSession = dataLandingPageCMS
    ? dataLandingPageCMS.find(
        (section) => section.__component === "sections.news-section"
      )?.listNews || []
    : [];
  const newsSessionHeader = dataLandingPageCMS
    ? dataLandingPageCMS.find(
        (section) => section.__component === "sections.news-section"
      )?.headerSection || {
        id: 0,
        title: "",
        linkTitle: "",
        targetUrl: "",
        slug: "",
      }
    : { id: 0, title: "", linkTitle: "", targetUrl: "", slug: "" };

  const promoSections = dataLandingPageCMS
    ? dataLandingPageCMS.find(
        (section) => section.__component === "sections.promo-section"
      )?.promo || []
    : [];
  const promoSectionsHeader = dataLandingPageCMS
    ? dataLandingPageCMS.find(
        (section) => section.__component === "sections.promo-section"
      )?.headerSection || {
        id: 0,
        title: "",
        linkTitle: "",
        targetUrl: "",
        slug: "",
      }
    : { id: 0, title: "", linkTitle: "", targetUrl: "", slug: "" };
  const dataRegisterUser = dataRawRegisterUser?.data?.data;
  const city = dataRegisterUser?.city?.city ?? "-";
  const nearestPrayerTime =
    (dataRegisterUser?.nearest_pray_time as PrayerCardProps) ?? {};
  const notificationStatus = dataRegisterUser?.notification_status === "ON";

  const { setData: setDataRamadhanSearchLocation } =
    useRamadhanSearchLocation();

  useEffect(() => {
    if (dataLandingPageCMS) {
      const appsSection = dataLandingPageCMS.find(
        (section) => section.__component === "sections.apps-section"
      );

      if (appsSection && appsSection.apps) {
        const featuresData: Feature[] = appsSection.apps
          .slice(0, 8)
          .map((app) => {
            let path = "";
            const title = app.title?.toLowerCase();
            if (title?.includes("masjid")) {
              path = "/subpackages/subpackage2/pages/CariMasjid/index";
            } else if (title?.includes("kiblat")) {
              path = "/subpackages/subpackage1/pages/ArahKiblat/index";
            } else if (title?.includes("ibadah")) {
              path = "/subpackages/subpackage5/pages/CatatanIbadah/index";
            } else if (title?.includes("zikir")) {
              path = "/subpackages/subpackage4/pages/Dzikir/index";
            } else {
              // Add more conditions as needed for other paths
              path = "";
            }
            return {
              name: app.title,
              icon: app.icon,
              path,
            };
          });
        setFeatures(featuresData);
      }
    }
  }, [dataLandingPageCMS]);

  useEffect(() => {
    fetchLocation();
  }, [isActive]);

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
    });
  };
  const onNavigate = (feature: Feature) => () => {
    const path = feature.path ?? "";
    const query = "";
    let paramsVal = null;

    if (feature?.name.toLowerCase() === "kiblat") {
      paramsVal = dataRegisterUser?.city as any;
    }

    return handleNavigate(path, query, paramsVal);
  };

  useEffect(() => {
    if (dataRegisterUser) {
      setDataRamadhanSearchLocation(dataRegisterUser?.city);
    }
  }, [dataRegisterUser]);

  return (
    <View className="bg-white h-full">
      <Show when={isLoadingRegisterUser || isLoadingLandingPageCMS}>
        <LoadingScreen text="Loading" customClassName="mx-[20px]" />
      </Show>
      <View
        style={{ backgroundImage: `url(${bgLanding})` }}
        className="bg-cover bg-no-repeat bg-center "
      >
        <View className="p-4">
          <PrayerCard
            data={dataRegisterUser?.city as RamadhanSearchLocationProps}
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
              handleClick={onNavigate(feature)}
            />
          ))}
        </div>
      </div>

      <Promo data={promoSections} header={promoSectionsHeader} />
      <View className="p-4 pl-0">
        <Text className="font-batikSans font-bold text-[14px] pl-4">
          {productSession1Header?.title}
        </Text>
        <SpecialCommerce
          data={productSession1}
          header={productSession1Header}
        />
        <SpecialPackage data={productSession2} header={productSession2Header} />
        <View className="flex flex-row items-center pl-4 mt-14 mb-2 justify-between">
          <Text className="font-batikSans font-bold text-[14px]">
            {cardSession1Header?.title}
          </Text>
          <Text
            className="whitespace-pre-wrap text-xs text-grey"
            onClick={() => {
              const targetUrl = cardSession1Header?.targetUrl;
              if (targetUrl) {
                Taro.navigateTo({
                  url:
                    "/subpackages/subpackage9/pages/Webview/index?url=" +
                    encodeURIComponent(targetUrl),
                });
              }
            }}
          >
            {"Lihat Semua"}
          </Text>
        </View>

        <SpecialFilm data={cardSession1} header={cardSession1Header} />

        <View className="flex flex-row items-center pl-4 mt-8 mb-2 justify-between">
          <Text className="font-batikSans font-bold text-[14px]">
            {cardSession2Header?.title}
          </Text>
          <Text
            className="whitespace-pre-wrap text-xs text-grey"
            onClick={() => {
              const targetUrl = cardSession2Header?.targetUrl;
              if (targetUrl) {
                Taro.navigateTo({
                  url:
                    "/subpackages/subpackage9/pages/Webview/index?url=" +
                    encodeURIComponent(targetUrl),
                });
              }
            }}
          >
            {"Lihat Semua"}
          </Text>
        </View>
        <SpecialGame data={cardSession2} />

        <View className="flex flex-row items-center pl-4 mt-8 mb-2 justify-between">
          <Text className="font-batikSans font-bold text-[14px]">
            {newsSessionHeader?.title}
          </Text>
          <Text
            className="whitespace-pre-wrap text-xs text-grey"
            onClick={() => {
              const targetUrl = newsSessionHeader?.targetUrl;
              if (targetUrl) {
                Taro.navigateTo({
                  url:
                    "/subpackages/subpackage9/pages/Webview/index?url=" +
                    encodeURIComponent(targetUrl),
                });
              }
            }}
          >
            {"Lihat Semua"}
          </Text>
        </View>
        <NewsCardList data={newsSession} />
      </View>
    </View>
  );
};

export default LandingPageRamadan;
