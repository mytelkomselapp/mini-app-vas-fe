import Taro from "@tarojs/taro";
import { Card } from "../../../../network/types/response-props";
import { ScrollView, Text, View } from "@tarojs/components";

// import dummyEvermos from "../../../../assets/dummy-evermos.svg";

const SpecialGame = ({ data = [] }: { data: Card[] }) => {
  const Movie = ({ item }) => {
    const onNavigate = (targetUrl?: string) => {
      if (targetUrl) {
        Taro.invokeNativePlugin({
          api_name: "openWebView",
          data: {
            url: targetUrl,
          },
          success: (res: any) => console.log("invokeNativePlugin success", res),
          fail: (err: any) => console.error("invokeNativePlugin fail", err),
        });
      }
    };
    return (
      <View>
        <div
          className="rounded-lg flex items-start space-x-2 min-w-[106px] w-[106px] h-[159px]"
          style={{
            background: `url(${item?.image})`,
            backgroundSize: "cover", // or 'contain' depending on your needs
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          onClick={() => onNavigate(String(item?.targetUrl))}
        />
        <View className="flex flex-col">
          <Text className="text-[12.8px] font-semibold">{item?.title}</Text>
          <Text className="text-[10px] mt-[2px] text-grey">
            {item?.subtitle}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView className="overflow-x-scroll pl-4 pt-1 w-[100vw]" scrollX>
      <View className="flex flex-row space-x-2">
        {data?.map((item, index) => {
          return <Movie item={item} key={index} />;
        })}
      </View>
    </ScrollView>
  );
};

export default SpecialGame;
