import { Image, Text, View } from "@tarojs/components";
import premiumBadge from "../../assets/premium-badge.svg";
import Chips from "../../components/Chips";



const dummyData = new Array(11).fill(0);



const CollectionContentDetail = () => {
  return (
    <View className="flex flex-col min-h-[screen]">
      <View className="flex flex-col items-center p-4">
        <View className="mb-3 w-20 h-20 relative">
          <View className="overflow-hidden w-full h-full rounded-full">
            <Image
              src="https://placehold.co/80x80/ff69b4/ff69b4"
              className="w-full h-full object-cover"
            />
          </View>
          <View className="absolute bottom-0 right-0 w-[28px] h-[28px]">
            <Image src={premiumBadge} className="w-full h-full" />
          </View>
        </View>
        <Text className="mb-1 text-lg font-semibold text-primaryBlack">
          Langganan JKT48 Premium Konten
        </Text>
        <View className="flex flex-row items-center">
          <Text className="text-xs text-textSecondary">Durasi 90 hari</Text>
          <View className="w-1 h-1 mx-2 rounded-full bg-textSecondary" />
          <Text className="text-xs text-textSecondary">Update 2 hari sekali</Text>
        </View>
      </View>

      <View className="flex flex-row justify-center gap-[8px] py-[6px]">
        <Chips
          text="Semua Konten"
          bgColor="#001A41"
          textColor="#FFFFFF"
        />
        <Chips
          text="Foto"
          bgColor="#FFFFFF"
        />
        <Chips
          text="Video"
          bgColor="#FFFFFF"
        />
      </View>

      <View className="grid grid-cols-3 gap-[3px] p-[12px]">
        {dummyData.map((_, key) => (
          <View key={key} className="w-full h-[146px]">
            <div className="h-full w-full pr-3 flex relative">
              <Image
                src="https://placehold.co/115x146"
                className="w-full h-full"
                mode="aspectFill"
                style={
                  key % 2 !== 0
                    ? { filter: "blur(2.5px)", WebkitFilter: "blur(2.5px)" }
                    : {}
                }
              />
              {/* {key % 2 !== 0 && <Image
                src={playIcon}
                className="absolute top-[45%] left-[40%] transform -translate-x-[40%] -translate-y-[45%] w-[15px] h-[11.25px]"
              />} */}
              
            </div>

          </View>
        ))}
      </View>
    </View>
  );
};

export default CollectionContentDetail; 