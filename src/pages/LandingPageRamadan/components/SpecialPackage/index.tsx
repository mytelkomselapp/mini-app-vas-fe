import { ScrollView, Swiper, SwiperItem, Text, View } from "@tarojs/components";

import Button from "../../../../components/Button";
import ribbonTail from "../../../../assets/ribbon-tail.svg";
import kv from "../../../../assets/specialPackageKv.png";
import { cn } from "../../../../lib/utils";
import { useState } from "react";
import { Product } from "../../../../network/types/response-props";
import Taro from "@tarojs/taro";
// const packages = [
//   {
//     title: "Super Seru",
//     size: "125 GB",
//     duration: "28 Hari",
//     ribbonLabel: "Terakhir Dibeli",
//   },
//   {
//     title: "Internet OMG!",
//     size: "55 GB",
//     duration: "7 Hari",
//     ribbonLabel: "Promo",
//   },
//   {
//     title: "e-internet giga!",
//     size: "55 GB",
//     duration: "7 Hari",
//     ribbonLabel: "Best Deal",
//   },
//   {
//     title: "Roam OMG!",
//     size: "55 GB",
//     duration: "7 Hari",
//     ribbonLabel: "Best Deal",
//   },
//   // Add more packages as needed
// ];
const SpecialPackage = ({ data = [] }: { data: Product[] }) => {
  const groupedData: Product[][] = [];
  for (let i = 0; i < data.length; i += 3) {
    groupedData.push(data?.slice(i, i + 3));
  }
  const [current, setCurrent] = useState(0);
  const handleClickAllOffer = () => {
    console.log("View All offer button clicked");
  };
  const handleSwiperChange = (e) => {
    setCurrent(e.detail.current);
  };

  const PackageCard = ({
    title,
    size,
    duration,
    ribbonLabel,
    isFirstItem,
    linkTitle,
  }) => {
    const onNavigate = (targetUrl?: string) => {
      if (targetUrl) {
        Taro.navigateTo({
          url:
            "/subpackages/subpackage9/pages/Webview/index?url=" +
            encodeURIComponent(targetUrl),
        });
      }
    };
    return (
      <div
        className={cn(
          "border border-solid border-gray-300 rounded-2xl pl-1 bg-white shadow-sm flex items-center space-x-1 w-[100px] min-w-[100px] h-[190px] relative",
          isFirstItem ? "ml-2" : ""
        )}
        style={{
          background: `url(${kv})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* Promo Label */}
        <div className="absolute -top-2 -left-[3px]">
          <div className="bg-blueNavy text-white px-3 py-1 rounded-md text-[10px]">
            {ribbonLabel}
          </div>
          <img
            src={ribbonTail}
            className="absolute top-[20px] left-0 w-2 h-[9.34px]"
          />
        </div>

        {/* Content */}
        <div className="mt-0">
          {/* Title */}
          <p className="text-xs">{title}</p>
          <div className="flex items-center flex-row mt-1">
            <p className="text-base font-semibold">{size}</p>
          </div>
          <span className="text-[10px] text-grey">{duration}</span>

          {/* Price Section */}
          <div className="mt-4">
            <p className="text-[#757F8E] text-xs line-through">Rp170.000</p>
            <p className="text-primaryRed text-sm font-semibold">Rp160.000</p>
          </div>

          {/* Buy Button */}

          <Button
            label="Beli"
            style="secondary"
            onClick={() => onNavigate(linkTitle)}
            className="mt-4 !min-h-[28px] h-[28px] !w-[80px] !px-0 !text-xs !font-semibold"
          />
        </div>
      </div>
    );
  };

  return (
    <View
      className="bg-no-repeat h-[206px] relative w-screen"
      style={{
        backgroundSize: "cover",
        backgroundColor:
          "linear-gradient(180deg, rgba(244, 244, 244, 0) 0%, rgba(244, 244, 244, 0.7) 100%)",
        backgroundPositionX: "-8px",
      }}
    >
      <View className="mt-[14px] mx-4 flex items-center justify-between">
        <Text className="font-bold font-batikSans whitespace-pre-wrap text-[14px]">
          {"Rekomendasi Untukmu"}
        </Text>
        <Text className="whitespace-pre-wrap text-xs text-grey ">
          {"Lihat Semua"}
        </Text>
      </View>

      <Swiper
        className="w-full h-[206px] mt-4"
        circular
        autoplay
        interval={3000}
        displayMultipleItems={3}
        onChange={handleSwiperChange}
      >
        {data?.map((slide, key) => (
          <SwiperItem key={key}>
            <div className={`w-full h-full flex items-center justify-center`}>
              <PackageCard
                title={slide?.title?.split("|")?.[0]}
                duration={slide?.title?.split("|")?.[2]}
                ribbonLabel={slide?.productTag}
                size={slide?.title?.split("|")?.[1]}
                key={key}
                isFirstItem={key === 0}
                linkTitle={slide?.targetUrl || slide?.linkTitle}
              />
            </div>
          </SwiperItem>
        ))}
      </Swiper>

      {groupedData?.length > 1 ? (
        <div className="flex justify-center w-min absolute left-[45%] -bottom-[22%] transform -translate-x-1/2 p-[2px]">
          {groupedData.map((_, index) => (
            <div
              key={index}
              className={`rounded-[10px] mx-1 transition-all duration-300 mr-[2px] ${
                current === index
                  ? "bg-blueNavy w-4 h-1"
                  : "bg-[#001A4166] w-1 h-1"
              }`}
            ></div>
          ))}
        </div>
      ) : (
        <></>
      )}

      {/* <ScrollView className="overflow-x-scroll w-screen z-[2] ml-2" scrollX>
        <View className="flex flex-row space-x-3 ml-0">
          {packages.map((pkg, index) => {
            return <PackageCard {...pkg} key={index} />;
          })}
        </View>
      </ScrollView> */}
    </View>
  );
};

export default SpecialPackage;
