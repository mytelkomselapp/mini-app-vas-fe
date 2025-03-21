import { Image, Text, View } from "@tarojs/components";
import BottomSheet from "../../../../components/BottomSheet";
import premiumBadgeRounded from "../../../../assets/premium-badge-rounded.svg";
import iconRight from "../../../../assets/ico-chevron-right-16.svg";
import iconCS from "../../../../assets/ico-customer-service.svg";
import iconBroken from "../../../../assets/ico-broken-image.svg";
import Button from "../../../../components/Button";

interface UtilityItemProps {
  icon: string;
  label: string;
  onClick?: () => void;
}

interface UtilityBottomSheetProps {
  open: boolean;
  onClose: () => void;
  utilityItems: UtilityItemProps[];
}

const UtilityItem = ({ icon, label, onClick }: UtilityItemProps) => {
  return (
    <View className="flex flex-col items-center gap-[8px] w-[52px] text-center" onClick={onClick}>
      <View className="w-[52px] h-[52px] bg-white rounded-[10px] flex items-center justify-center">
        <Image
          src={icon}
          style={{
            width: "24px",
            height: "24px",
          }}
        />
      </View>
      <Text className="text-xs text-primaryBlack">{label}</Text>
    </View>

  );
};

const UtilityBottomSheet: React.FC<UtilityBottomSheetProps> = ({
  open,
  onClose,
  utilityItems
}) => {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      showHeader={false}
      withoutPadding={true}
      containerClassname="!h-fit"
    >
      <View className="flex flex-row items-center gap-[8px] py-[10px] px-[16px]">
        <Image
          src={premiumBadgeRounded}
          style={{
            width: "32px",
            height: "32px",
          }}
        />
        <Text className="font-semibold text-primaryBlack">Detail Konten</Text>
        <Image
          src={iconRight}
          style={{
            width: "16px",
            height: "16px",
          }}
        />
      </View>

      <View className="flex flex-col items-center gap-[12px] p-4 bg-inactiveGrey">
        <View className="flex flex-row gap-[12px] w-full">
          {utilityItems.map((item, index) => (
            <UtilityItem
              key={index}
              icon={item.icon}
              label={item.label}
              onClick={item.onClick}
            />
          ))}
        </View>
        <View className="w-full items-center">
          <Button
            className="border-none text-textSecondary bg-inactiveGrey"
            label="Cancel"
            onClick={onClose}
            style="secondary"
          />
        </View>
      </View>
    </BottomSheet>
  );
};

export default UtilityBottomSheet;
