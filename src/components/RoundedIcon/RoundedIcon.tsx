import { Image, View } from "@tarojs/components";

export interface RoundedIconProps {
  width?: number;
  height?: number;
  bgColor?: string;
  iconWidth?: number;
  iconHeight?: number;
  iconSource: string;
}

const RoundedIcon: React.FC<RoundedIconProps> = ({
  width = 16,
  height = 16,
  iconWidth = 8,
  iconHeight = 6,
  iconSource = "",
  bgColor = "#eff1f4",
}) => {
  return (
    <View
      className="flex justify-center items-center rounded-full"
      style={{ width, height, backgroundColor: bgColor }}
    >
      <Image
        style={{ width: iconWidth, height: iconHeight }}
        src={iconSource}
        mode="aspectFit"
      />
    </View>
  );
};

export default RoundedIcon;
