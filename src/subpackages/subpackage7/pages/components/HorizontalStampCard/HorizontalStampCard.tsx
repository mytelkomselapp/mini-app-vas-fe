import { View, Image, Text } from '@tarojs/components';
import StampIcon from "../../../../../assets/icon-stamp-gamehub.svg";

interface HorizontalStampCardProps {
  imageUrl: string;
  title: string;
  originalStamps: number;
  discountedStamps: number;
  showHeader?: boolean;
  showFooter?: boolean;
  status?: 'standby' | 'pending' | 'failed' | 'preview';
}

export const HorizontalStampCard: React.FC<HorizontalStampCardProps> = ({
  imageUrl,
  title,
  originalStamps,
  discountedStamps,
  status = 'preview',
}) => {
  return (
    <View className="flex flex-col items-center text-center mb-4">

      <div
        className="bg-white rounded-xl overflow-hidden w-full max-h-[165px] mx-4"
        style={{ border: '1px solid #EFF1F4' }}
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
              {status === 'preview' && (
                <>
                  <div className="flex gap-1 ml-[-2px]">
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
                </>
              )}
              {status === 'pending' && (
                <span className="text-xs leading-[16px] text-mustard font-semibold bg-[#FFF5E6] px-2 py-1 rounded-full">
                  Menunggu Konfirmasi
                </span>
              )}
              {status === 'failed' && (
                <span className="text-xs leading-[16px] text-textError font-semibold bg-[#FDDDD4] px-2 py-1 rounded-full">
                  Gagal
                </span>
              )}
              {status === 'standby' && (
                <span className="text-xs leading-[16px]">
                  Berlaku sampai 25 Desember
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </View>
  );
};

export default HorizontalStampCard;
