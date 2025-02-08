import { View, Image, Text } from '@tarojs/components';
import StampIcon from "../../../../../assets/icon-stamp-gamehub.svg";

interface HorizontalStampCardProps {
  imageUrl: string;
  title: string;
  originalStamps: number;
  discountedStamps: number;
  showHeader?: boolean;
  showFooter?: boolean;
}

export const HorizontalStampCard: React.FC<HorizontalStampCardProps> = ({
  imageUrl,
  title,
  originalStamps,
  discountedStamps,
}) => {
  return (
    <View className="flex flex-col items-center text-center mb-4">

      <div 
        className="bg-white rounded-xl overflow-hidden w-full max-h-[165px] mx-4"
        style={{ border: '1px solid #EFF1F4' }}
      >
        <div className="flex">
          <Image
            src={imageUrl}
            style={{
              width: "165px",
              height: "165px"
            }}
          />
          <div className="flex flex-col justify-between text-left p-4">
            <Text className="font-bold text-[12px] leading-[16px]">{title}</Text>
            <div>
              <div className="flex gap-1">
                <Image
                  src={StampIcon}
                  style={{
                    width: "16px",
                    height: "16px"
                  }}
                />
                <span className="text-xs text-gray-400 line-through">
                  {originalStamps} Stamp
                </span>
              </div>
              <span className="text-sm leading-[16px] text-red-500 font-semibold">
                {discountedStamps} Stamp
              </span>
            </div>
          </div>
        </div>
      </div>
    </View>
  );
};

export default HorizontalStampCard;
