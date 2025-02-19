import { ScrollView, Text, View } from "@tarojs/components";
import maxStream from "../../../../assets/maxStream.png";
import { Card, HeaderSection } from "../../../../network/types/response-props";
import Taro from "@tarojs/taro";

const SpecialFilm = ({
  data = [],
  header,
}: {
  data: Card[];
  header: HeaderSection;
}) => {
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
          className="rounded-lg shadow-sm flex items-start space-x-2 min-w-[106px] w-[106px] h-[159px] mb-2"
          style={{
            background: `url(${item?.image})`,
            // background: `linear-gradient(180deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.00) 100%),url(https://placehold.co/600x400)`,
            backgroundSize: "cover", // or 'contain' depending on your needs
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          onClick={() => onNavigate(String(item?.targetUrl))}
        >
          {/* Product Details */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex bg-[#00000066] rounded-tl-lg rounded-br-lg items-center max-w-[90px] p-[2px]">
              <img src={maxStream} alt="maxStream" className="w-4 h-4 mr-1" />
              <p className="text-[10px] font-semibold text-white">Maxstream</p>
            </div>
            <div
              className="flex mt-[95%] justify-end h-10 rounded-b-lg items-end"
              style={{
                background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 126.83%)`,
              }}
            >
              {/* <Text className="text-white text-[10px] mr-2 mb-2">
                {"2j 25m"}
              </Text> */}
            </div>
          </div>
        </div>
        <View className="text-[12.8px] w-[106px] font-semibold mt-2">
          <Text className="line-clamp-1">{item?.title}</Text>
        </View>
        <View className="text-[10px] text-grey w-[106px]">
          <Text className="line-clamp-1">{item?.subtitle}</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView className="overflow-x-scroll pl-4 pt-1 w-[100vw]" scrollX>
      <View className="flex flex-row space-x-3">
        {data?.map((item, index) => {
          return <Movie key={index} item={item} />;
        })}
        <View className="w-4 text-transparent">{"A"}</View>
      </View>
    </ScrollView>
  );
};

export default SpecialFilm;
