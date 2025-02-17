import { View, Text, Image } from "@tarojs/components";
import PinIcon from '../../../../assets/red-pin-location.svg';
import Dash from '../../../../assets/dash-blue-red.svg';

const FinalCheckoutMerchandise = () => {
  return (
    <View className="bg-inactiveGrey min-h-screen">
      {/* Shipping Details Section */}
      <View className="mb-2">
        <View className="bg-white">
          <View className="p-4 pb-2">
            <View className="mb-2">
              <Text className="text-sm font-bold">Detail Pengiriman</Text>
            </View>
            <View className="flex flex-row items-center mb-1">
              <Image src={PinIcon} style={{ width: 16, height: 16 }} className="mr-1" />
              <Text className="text-xs font-semibold">Rumah - Jane Doe</Text>
            </View>
            <View className="flex flex-col">
              <Text className="text-xs leading-[16px] text-textSecondary mb-1">
                Jl. Gotong Royong No.85, RT.9/RW.8, Tugu, Kec. Cim...
              </Text>
              <Text className="text-xs leading-[16px] text-textSecondary">
                081234567890 | janedoe@gmail.com
              </Text>
            </View>
          </View>
          <Image src={Dash} style={{height: 4, width: '100%', display: 'block'}} />
        </View>
      </View>
      

     
    </View>
  );
};

export default FinalCheckoutMerchandise; 
