import { View, Image, Text } from '@tarojs/components';
import StampIcon from "../../../../../assets/icon-stamp-gamehub.svg";

interface HorizontalStampCardProps {
  imageUrl: string;
  title: string;
  originalStamps: number;
  discountedStamps: number;
  showHeader?: boolean;
  showFooter?: boolean;
  expiredDate?: string;
  onClick?: () => void;
}

export const HorizontalStampCard: React.FC<HorizontalStampCardProps> = ({
  imageUrl,
  title,
  originalStamps,
  discountedStamps,
  expiredDate,
  onClick
}) => {
  return (
    <View className="flex flex-col items-center text-center w-full mb-4" onClick={onClick}>
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
            <Text className="font-bold text-[12px] leading-[16px]">{title}</Text>


            <div>
              <span className={`text-xs leading-[16px] px-2 py-1 text-textSecondary`}>
                Berlaku sampai {expiredDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </View>
  );
};

export default HorizontalStampCard;
