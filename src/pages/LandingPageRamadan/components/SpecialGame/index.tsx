import { ScrollView, Text, View } from "@tarojs/components";

// import dummyEvermos from "../../../../assets/dummy-evermos.svg";

const SpecialGame = () => {
  const Movie = () => {
    return (
      <View>
        <div
          className="rounded-2xl p-4  shadow-sm flex items-start space-x-2] min-w-[120px] w-[120px] h-[180px]"
          style={{
            background: `url(https://placehold.co/600x400)`,
            backgroundSize: "cover", // or 'contain' depending on your needs
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        <View className="flex flex-col">
          <Text className="text-[12.8px] font-semibold mt-4">
            Last Defender
          </Text>
          <Text className="text-[10px] mt-[2px] text-grey">Action</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView className="overflow-x-scroll pl-4 pt-1 w-[100vw]" scrollX>
      <View className="flex flex-row space-x-4">
        <Movie />
        <Movie />
        <Movie />
      </View>
    </ScrollView>
  );
};

export default SpecialGame;
