import { View, Image, Text } from '@tarojs/components';
import StampIcon from "../../../../../assets/icon-stamp-gamehub.svg";

interface HorizontalStampCardProps {
  imageUrl: string;
  title: string;
  originalStamp: number;
  discountedStamp: number;
  showHeader?: boolean;
  showFooter?: boolean;
  expiredDate?: string;
  onClick?: () => void;
  isHistory?: boolean;
}

export const HorizontalStampCard: React.FC<HorizontalStampCardProps> = ({
  imageUrl,
  title,
  originalStamp,
  discountedStamp,
  expiredDate,
  onClick,
  isHistory = false
}) => {
  return (
    <View className="flex flex-col items-center text-center w-full" onClick={onClick}>
      <div
        className="bg-white rounded-xl overflow-hidden w-full max-h-[165px]"
        style={{ 
          border: '1px solid #EFF1F4',
          boxSizing: 'border-box'
        }}
      >
        <div className="flex">
          <div className="w-[165px] h-[165px]">
            <Image
              src={imageUrl}
              style={{
                width: "165px",
                height: "165px"
              }}
              mode="aspectFill"
            />
          </div>
          <div className="flex flex-col justify-between text-left p-3">
            <Text className="font-semibold text-[16px] leading-[24px]">{title}</Text>


            {isHistory ? (
              <div>
                <span className={`text-xs leading-[16px] text-textSecondary`}>
                  Berlaku sampai {expiredDate}
                </span>
              </div>
            ) : (
              <div>
                <div className="flex gap-1 ml-[-2px]">
                  <Image
                    src={StampIcon}
                    style={{
                      width: "16px",
                      height: "16px",
                    }}
                  />
                  <span className="text-xs text-gray-400 line-through mr-2">
                    {originalStamp} Stamp
                  </span>
                </div>

                <span className="text-sm text-red-500 font-semibold">
                  {discountedStamp} Stamp
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </View>
  );
};

export default HorizontalStampCard;
