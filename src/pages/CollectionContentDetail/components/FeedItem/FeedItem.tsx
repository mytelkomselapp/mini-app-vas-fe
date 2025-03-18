import { View, Image, Text } from "@tarojs/components";
import playIcon from "../../../../assets/play.svg";

interface FeedItemProps {
  data: {
    status: "eligible" | "ineligible";
    imageThumbnail: string;
    type: "video" | "image";
  };
  onClick: () => void;
}

export const FeedItem: React.FC<FeedItemProps> = ({ data, onClick }) => {
  return (
    <View className="w-full h-[146px]" onClick={onClick}>
      <div className="h-full w-full pr-3 flex relative">
        {data?.status !== "eligible" && (
          <Text className="text-[8px] text-white bg-[#050A22B2] px-[4px] py-[2px] rounded-[4px] absolute top-1 left-1 z-10">
            Pulsa tidak mencukupi
          </Text>
        )}
        <Image
          src={data?.imageThumbnail}
          className="w-full h-full overflow-hidden"
          mode="aspectFill"
          style={
            data?.status === "ineligible"
              ? { filter: "blur(2.5px)", WebkitFilter: "blur(2.5px)" }
              : {}
          }
        />
        {data?.status === "eligible" && data?.type === "video" && (
          <View className="absolute inset-0 flex items-center justify-center">
            <Image
              src={playIcon}
              className="w-[24px] h-[24px] z-10"
              style={{ marginLeft: "-6px" }}
            />
          </View>
        )}
      </div>
    </View>
  );
};
