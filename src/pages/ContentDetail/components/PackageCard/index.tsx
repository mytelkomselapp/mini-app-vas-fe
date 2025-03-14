import { View, Text, Image } from "@tarojs/components";
import { ReactNode } from "react";
import iconUp from "../../../../assets/ico-chevron-up.svg";
import iconDown from "../../../../assets/ico-chevron-down.svg";
interface PackageCardProps {
  title: string;
  description: string;
  validity: string;
  price: string;
  priceUnit: string;
  originalPrice?: string;
  isExpanded?: boolean;

  promo?: string;

  bulletPoints?: string[];
  buttonText?: string;
  onButtonClick?: () => void;
  onToggleExpand?: () => void;
  children?: ReactNode;
}

const PackageCard = ({
  title,
  description,
  validity,
  price,
  priceUnit,
  originalPrice,
  isExpanded = false,

  promo,

  bulletPoints = [],
  buttonText = "Pilih Paket",
  onButtonClick,
  onToggleExpand,
  children,
}: PackageCardProps) => {
  return (
    <View className={`p-4 ${"pt-0 bg-[#eff1f41a]"} rounded-2xl leading-none`}>
      {/* Promo badge */}
      {promo && (
        <View
          className="w-max rounded-b-lg px-2 py-1 text-[10px]"
          style={{
            background:
              "linear-gradient(0deg, #EFEFFF 0%, #EFEFFF 100%), #B90024",
          }}
        >
          <Text className={`mb-2 text-xs ${"text-[#14278C]"}`}>{promo}</Text>
        </View>
      )}

      {/* Title and expand/collapse arrow */}
      <View className="flex justify-between items-start my-2">
        <Text className="text-sm font-semibold text-white">{title}</Text>

        <Image
          className="w-[20px] h-[20px]"
          src={isExpanded ? iconUp : iconDown}
          onClick={onToggleExpand}
        />
      </View>

      {/* Description */}
      <Text className="text-[12px] text-[#9CA9B9] leading-[18px]">
        {description}
      </Text>
      {!isExpanded && (
        <View className="mb-3" onClick={onToggleExpand}>
          <Text className="underline text-white text-xs">Lihat Detail</Text>
        </View>
      )}
      {/* Validity period badge */}
      <View className="bg-[#FFFFFF80] rounded-xl px-2 py-1 w-max flex items-center my-2">
        <Text className="text-[10px] text-white">{validity}</Text>
      </View>

      {/* Expanded details */}
      {isExpanded && bulletPoints.length > 0 && (
        <View className="mb-4 text-xs text-[#9CA9B9] flex flex-col gap-1">
          <Text className="my-1 font-batikSans">Deskripsi Paket</Text>
          <View className="pl-3">
            {bulletPoints.map((point, index) => (
              <View key={index} className="relative mb-2">
                <Text className="absolute left-[-12px] top-0">•</Text>
                <Text>{point}</Text>
              </View>
            ))}
          </View>
          <View
            className="mt-3 w-full h-[2px]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #9CA9B9 50%, transparent 50%)",
              backgroundSize: "8px 2px",
            }}
          />
        </View>
      )}

      {/* Extra content if provided */}
      {children}

      {/* Price and CTA */}
      <View className="flex justify-between items-center">
        <View>
          <View className="flex items-end">
            <Text className={`${"text-[14px] text-white"} font-semibold mr-1`}>
              {price}
            </Text>
            <Text className="text-[10px] text-[#9CA9B9]">{priceUnit}</Text>
          </View>
          {originalPrice && (
            <Text className="text-[#757F8E] line-through text-xs mt-[2px]">
              {originalPrice}
            </Text>
          )}
        </View>

        <View
          className={`px-4 py-2 text-[12px] text-white bg-[#ED0226] ${"rounded-2xl"}`}
          onClick={onButtonClick}
        >
          <Text>{buttonText}</Text>
        </View>
      </View>
    </View>
  );
};

export default PackageCard;
