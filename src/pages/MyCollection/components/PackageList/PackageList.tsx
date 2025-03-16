import { Image, View } from "@tarojs/components";
import { Card, RoundedIcon, Pill, Show } from "../../../../components";
import SubscribeIcon from "../../../../assets/subscribe-icon.png";
import ImageIcon from "../../../../assets/ico_image.png";

export interface PackageProps {
  imageThumbnail: string;
  title: string;
  subscription_status: string;
  subscription_count: number;
  subscription_update_status: string;
  active_status: string;
}

export interface PackageListProps {
  data: PackageProps[];
  onClick?: (data: PackageProps) => void;
}

const PackageList: React.FC<PackageListProps> = ({ data = [], onClick }) => {
  const handleClick = (data: PackageProps) => {
    onClick?.(data);
  };

  return (
    <View className="flex flex-col gap-y-2 px-[16px]">
      {data?.map((val, idx) => (
        <Card
          key={idx}
          bgColor={val?.active_status === "inactive" ? "#dae0e9" : "white"}
          className="flex items-center gap-x-2"
          border={val?.active_status === "inactive" ? "1px solid #9ca9b9" : ""}
        >
          <Image
            src="https://picsum.photos/200/300"
            className="h-[78px] w-[78px] rounded-[8px]"
            mode="aspectFill"
          />
          <View className="flex flex-col justify-between overflow-hidden w-[80%] gap-y-2">
            <View className="flex justify-between items-center">
              <View className="w-[92%] overflow-hidden">
                <p className="text-[12px] font-[600] text-[#181C21] text-ellipsis whitespace-nowrap overflow-hidden">
                  {val?.title}
                </p>
              </View>
              {Boolean(val?.subscription_count > 0) && (
                <View className="text-center flex justify-center items-center h-[14px] w-[14px] rounded-full bg-[#ff0025] text-[10px] text-[white] font-[600]">
                  {val?.subscription_count}
                </View>
              )}
            </View>

            <View className="flex gap-x-2 w-full">
              <View className="flex items-center gap-x-1">
                <RoundedIcon
                  iconSource={SubscribeIcon}
                  iconHeight={10}
                  iconWidth={10}
                />
                <p className="text-[10px] text-[#181c21]">
                  {val?.subscription_status}
                </p>
              </View>
              <View className="flex items-center gap-x-1">
                <RoundedIcon
                  iconSource={ImageIcon}
                  iconHeight={10}
                  iconWidth={10}
                />
                <p className="text-[10px] text-[#181c21]">
                  {val?.subscription_update_status}
                </p>
              </View>
            </View>

            {/* Status Active */}
            <Show when={val?.active_status === "active"}>
              <View className="flex items-center w-full justify-between">
                <Pill title="Aktif" />
                <View
                  onClick={() => handleClick(val)}
                  className="bg-[#ff0025] rounded-[48px] cursor-pointer py-[6px] px-[16px] text-[10px] text-white"
                >
                  Lihat
                </View>
              </View>
            </Show>
            {/* Status Inactive */}
            <Show when={val?.active_status === "inactive"}>
              <View className="flex items-center w-full justify-between">
                <Pill title="Inactive" bgColor="#001A41" />
                <View
                  style={{
                    backgroundColor: "rgba(237, 2, 38, 0.1)",
                  }}
                  onClick={() => handleClick(val)}
                  className="rounded-[48px] cursor-pointer py-[6px] px-[16px] text-[10px] text-[#ed0226]"
                >
                  Aktifkan Lagi
                </View>
              </View>
            </Show>
          </View>
        </Card>
      ))}
    </View>
  );
};

export default PackageList;
