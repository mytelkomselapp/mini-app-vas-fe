import { ScrollView, Text, View } from "@tarojs/components";
import chevronRight from "../../../../assets/chevron-right.svg";
import dummyEvermos from "../../../../assets/dummy-evermos.svg";
import dummyProduct from "../../../../assets/dummy-product.png";
import Button from "../../../../components/Button";
import ribbonTail from "../../../../assets/ribbon-tail.svg";

import { cn } from "../../../../lib/utils";
const packages = [
  {
    title: "Super Seru",
    size: "125 GB",
    duration: "28 Hari",
    ribbonLabel: "Terakhir Dibeli",
  },
  {
    title: "Internet OMG!",
    size: "55 GB",
    duration: "7 Hari",
    ribbonLabel: "Promo",
  },
  {
    title: "Internet OMG!",
    size: "55 GB",
    duration: "7 Hari",
    ribbonLabel: "Best Deal",
  },
  // Add more packages as needed
];
const SpecialPackage = () => {
  const handleClickAllOffer = () => {
    console.log("View All offer button clicked");
  };
  const PackageCard = ({ title, size, duration, ribbonLabel }) => {
    return (
      <div
        className={cn(
          "border border-solid border-gray-300 rounded-2xl pl-1 bg-white shadow-sm flex items-center space-x-1 w-[106px] min-w-[106px] h-[190px] mt-6 relative ml-2"
        )}
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
            onClick={handleClickAllOffer}
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
      <ScrollView className="overflow-x-scroll w-screen z-[2] ml-2" scrollX>
        <View className="flex flex-row space-x-3 ml-0">
          {packages.map((pkg, index) => {
            return (
              <>
                <PackageCard {...pkg} />
                {packages?.length - 1 === index ? (
                  <div className="w-[50px] h-[10px] text-white">{"A"}</div> //force width
                ) : (
                  <></>
                )}
              </>
            );
          })}
        </View>
      </ScrollView>
      {/* <View className="absolute left-5 bottom-5">
        <Button
          label="Lihat Semua"
          style="secondary"
          onClick={handleClickAllOffer}
          icon={<img src={chevronRight} className="w-4 h-4 ml-[2px]" />}
          className="mt-2 !min-h-[28px] !w-[115px] !px-2 !text-xs  text-blueNavy border-dividerGrey"
        />
      </View> */}
    </View>
  );
};

export default SpecialPackage;
