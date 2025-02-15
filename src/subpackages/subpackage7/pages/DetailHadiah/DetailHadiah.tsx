import { View, Image } from "@tarojs/components";
import DashedDivider from "./components/DashedDivider";

const DetailHadiah = () => {
  return (
    <View className="bg-white min-h-screen">
      {/* Voucher Card */}
      <View 
        className="mx-4 mt-4 bg-white rounded-lg relative overflow-hidden"
        style={{
          borderWidth: '1px',
          borderStyle: 'solid',
          borderRadius: '8px',
          borderColor: 'transparent',
          background: 'linear-gradient(to bottom, transparent 0%, transparent 172px, transparent 172px, transparent 196px, #EFF1F4 196px) border-box',
          maskComposite: 'exclude',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)'
        }}
      >


        {/* Top Section */}
        <View className="h-[184px] bg-[#F5FBFF]">
          <Image 
            src="https://cdndev.mytsel.id/cmsbucket/thubnail_1_6056087681_3e6c906f8b.png"
            className="w-full h-full"
            mode="aspectFill"
          />
        </View>

        {/* Divider Section */}
        <View className="relative h-[1px]">
          <DashedDivider />
        </View>

        {/* Bottom Section */}
        <View className="h-[116px] bg-white">
          {/* Content will go here */}
        </View>
      </View>
    </View>
  );
}

export default DetailHadiah;  