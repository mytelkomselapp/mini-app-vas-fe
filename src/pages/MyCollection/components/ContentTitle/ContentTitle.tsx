import { View } from "@tarojs/components";

export interface ContentTitleProps {
  title: string;
  subtitle: string;
}

const ContentTitle: React.FC<ContentTitleProps> = ({
  title = "",
  subtitle = "",
}) => {
  return (
    <View className="flex flex-col px-[16px]">
      <p className="text-[14px] font-[600] text-[#181c21]">{title}</p>
      <p className="text-[12px] font-normal text-[#757f90]">{subtitle}</p>
    </View>
  );
};

export default ContentTitle;
