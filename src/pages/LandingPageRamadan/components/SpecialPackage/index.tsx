import { ScrollView, Text, View } from "@tarojs/components";
import chevronRight from "../../../../assets/chevron-right.svg";
import dummyEvermos from "../../../../assets/dummy-evermos.svg";
import dummyProduct from "../../../../assets/dummy-product.png";
import Button from "../../../../components/Button";
import ribbonTail from "../../../../assets/ribbon-tail.svg";
import illustration from "../../../../assets/section-reco-illustration-base.png";
import { cn } from "../../../../lib/utils";
const packages = [
  {
    title: "Super Seru",
    size: "125 GB",
    duration: "28 Hari",
    ribbonLabel: "Promo",
  },
  {
    title: "GigaMax",
    size: "55 GB",
    duration: "7 Hari",
    ribbonLabel: "Best Deal",
  },
  {
    title: "GigaMax",
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
          "border border-solid border-gray-300 rounded-2xl p-2 bg-white shadow-sm flex items-center space-x-2 w-[135px] min-w-[135px] mt-6 relative ml-2"
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
        <div className="mt-3">
          {/* Title */}
          <p className="text-xs">{title}</p>
          <div className="flex items-center flex-row mt-1">
            <p className="text-base font-semibold">{size}</p>
            <span className="ml-1 text-[10px] text-grey">{duration}</span>
          </div>

          {/* Price Section */}
          <div className="mt-4">
            <p className="text-primaryRed text-sm font-semibold">Rp160.000</p>
            <p className="text-[#757F8E] text-xs line-through">Rp170.000</p>
          </div>

          {/* Buy Button */}

          <Button
            label="Beli"
            onClick={handleClickAllOffer}
            className="mt-2 !min-h-[28px] !w-[115px] !px-0 !text-xs !font-semibold"
          />
        </div>
      </div>
    );
  };

  return (
    <View
      className="bg-no-repeat h-[206px] relative w-screen"
      style={{
        backgroundImage: `url(${illustration})`,
        backgroundSize: "cover",
        backgroundColor:
          "linear-gradient(180deg, rgba(244, 244, 244, 0) 0%, rgba(244, 244, 244, 0.7) 100%)",
        backgroundPositionX: "-8px",
      }}
    >
      <View className="mt-[14px] ml-4 w-[115px] leading-[20px] absolute">
        <Text className="font-bold font-batikSans text-primaryRed whitespace-pre-wrap text-[16px]">
          {"Tetap Jaga Tali Silaturahmi"}
        </Text>
      </View>
      <ScrollView
        className="overflow-x-scroll pl-4 w-[100vw] z-[2] relative"
        scrollX
      >
        <View className="flex flex-row space-x-4 ml-[40vw]">
          {packages.map((pkg, index) => {
            return (
              <>
                <PackageCard {...pkg} />
                {packages?.length - 1 === index ? (
                  <div className="w-[80px] h-[10px] text-white">{"ABCD"}</div> //force width
                ) : (
                  <></>
                )}
              </>
            );
          })}
        </View>
      </ScrollView>
      <View className="absolute left-5 bottom-5">
        <Button
          label="Lihat Semua"
          style="secondary"
          onClick={handleClickAllOffer}
          icon={<img src={chevronRight} className="w-4 h-4 ml-[2px]" />}
          className="mt-2 !min-h-[28px] !w-[115px] !px-2 !text-xs  text-blueNavy border-dividerGrey"
        />
      </View>
    </View>
  );
};

export default SpecialPackage;
