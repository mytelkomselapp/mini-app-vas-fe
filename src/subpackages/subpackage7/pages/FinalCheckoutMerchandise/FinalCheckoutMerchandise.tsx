import { View, Text, Image } from "@tarojs/components";
import PinIcon from '../../../../assets/red-pin-location.svg';
import Dash from '../../../../assets/dash-blue-red.svg';
import StampIcon from '../../../../assets/icon-stamp-gamehub.svg';
import TrashIcon from '../../../../assets/trash.svg';
import PlusIcon from '../../../../assets/plus.svg';
import Button from "../../../../components/Button";

const FinalCheckoutMerchandise = () => {
  return (
    <View className="bg-inactiveGrey min-h-screen">
      {/* Shipping Details Section */}
      <View className="bg-white mb-2">
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
        <Image src={Dash} style={{ height: 4, width: '100%', display: 'block' }} />
      </View>


      {/* Product Section */}
      <View className="bg-white p-4 mb-2">
        <View className="flex justify-start">
          <Image
            className="w-20 h-20 rounded"
            src="https://placehold.co/400x400"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "16px"
            }}
            mode="aspectFill"
          />
          <View className="flex flex-row justify-between flex-1">
            <View className="ml-3 justify-start">
              <Text className="text-xs mb-2">Topi - Bucket Hat</Text>
              <View className="flex">
                <Image
                  src={StampIcon}
                  style={{
                    width: "16px",
                    height: "16px",
                    marginRight: "4px"
                  }}
                />
                <Text className="text-xs text-solidRed font-semibold">3290 Stamp</Text>
              </View>
            </View>
            <View className="flex items-center">
              <Image src={TrashIcon} style={{ width: 24, height: 24 }} />
              <Text className="mx-3">1</Text>
              <Image src={PlusIcon} style={{ width: 24, height: 24 }} />
            </View>
          </View>

        </View>
      </View>

      {/* Payment Method Section */}
      <View className="bg-white mb-2">
        <View className="p-4">
          <View className="mb-2">
            <Text className="text-sm font-bold">Metode Pembayaran</Text>
          </View>

          <View className="flex flex-row flex-1 items-center">
            <Image src={StampIcon} style={{ width: 24, height: 24 }} />
            <View className="flex flex-col ml-3 justify-start">
              <Text className="text-xs mb-2">Topi - Bucket Hat</Text>
              <Text className="text-xs text-textSecondary">3290 Stamp</Text>
            </View>
          </View>
        </View>

      </View>

      {/* Payment Summary Section */}
      <View className="bg-white p-4">
        <Text className="text-sm font-bold mb-4">Ringkasan Pembayaran</Text>
        
        <View className="flex flex-row justify-between mb-2">
          <Text className="text-xs">Subtotal harga item</Text>
          <Text className="text-xs text-solidRed">3300 Stamp</Text>
        </View>

        <View className="flex flex-row justify-between mb-4">
          <Text className="text-xs">Diskon item</Text>
          <Text className="text-xs text-solidRed">- 10 Stamp</Text>
        </View>

        <View className="h-[1px] bg-inactiveGrey mb-4" />

        <View className="flex flex-row justify-between mb-6">
          <Text className="text-xs">Total Penukaran</Text>
          <View className="flex flex-row items-center">
            <Image src={StampIcon} style={{ width: 24, height: 24 }} />
            <Text className="text-base text-solidRed font-semibold ml-1">3290 Stamp</Text>
          </View>
        </View>

        <Button label="Masukkan Alamat" onClick={() => {}} className="mb-2" />
      </View>
    </View>
  );
};

export default FinalCheckoutMerchandise; 
