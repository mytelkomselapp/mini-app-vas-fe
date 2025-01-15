import { ScrollView, View } from "@tarojs/components";
import chevronRight from "../../../../assets/chevron-right.svg";
import dummyEvermos from "../../../../assets/dummy-evermos.svg";
import dummyProduct from "../../../../assets/dummy-product.png";
import Button from "../../../../components/Button";
import ribbonTail from "../../../../assets/ribbon-tail.svg";
import illustration from "../../../../assets/section-reco-illustration.png";
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
  const handleBuy = () => {
    console.log("Buy button clicked");
  };
  const PackageCard = ({ title, size, duration, ribbonLabel }) => {
    return (
      <div className="border border-solid border-gray-300 rounded-2xl p-2 bg-white shadow-sm flex items-center space-x-2 w-[135px] min-w-[135px] mt-6 relative ml-2">
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
        <div className="mt-4">
          {/* Title */}
          <p className="text-xs">{title}</p>
          <div className="flex items-center flex-row mt-1">
            <p className="text-base font-semibold">{size}</p>
            <span className="ml-1 text-[10px]">{duration}</span>
          </div>

          {/* Price Section */}
          <div className="mt-4">
            <p className="text-primaryRed text-sm font-semibold">Rp160.000</p>
            <p className="text-[#757F8E] text-xs line-through">Rp170.000</p>
          </div>

          {/* Buy Button */}

          <Button
            label="Beli"
            onClick={handleBuy}
            className="mt-4 !min-h-[28px] !w-[115px] !px-0 !text-xs !font-semibold"
          />
        </div>
      </div>
    );
  };

  return (
    <View
      className=" bg-no-repeat bg-bottom"
      style={{
        backgroundImage: `url(${illustration})`,
        backgroundSize: "cover",
        backgroundColor:
          "linear-gradient(180deg, rgba(244, 244, 244, 0) 0%, rgba(244, 244, 244, 0.7) 100%)",
      }}
    >
      <ScrollView className="overflow-x-scroll pl-4 pt-1 w-[100vw]" scrollX>
        <View className="flex flex-row space-x-4 ml-[40vw]">
          {packages.map((pkg, index) => (
            <PackageCard key={index} {...pkg} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SpecialPackage;
