import { View, Text, Image } from "@tarojs/components";
import Button from "../../../../components/Button";
import BottomSheet from "../../../../components/BottomSheet";
import subsTermination from "../../../../assets/subscription-terminated.svg";
import GiftIcon from "../../../../assets/gift.svg";
import TelephoneIcon from "../../../../assets/ico_telephon.svg";
import TelephoneSmsIcon from "../../../../assets/ico_telephone+sms.svg";
import EnvelopeIcon from "../../../../assets/ico_envelope.svg";
import MagicTelephoneIcon from "../../../../assets/magic_call.svg";
import iconChevronRight from "../../../../assets/ico_chevron_right.svg";
import Taro from "@tarojs/taro";

interface HelpCenterBottomSheetProps {
  open: boolean;
  contentTitle?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

interface ChannelItemProps {
  icon: string;
  text: string;
  onClick?: () => void;
}

const ChannelItem = ({ icon, text, onClick }: ChannelItemProps) => (
  <div className="flex items-center" onClick={onClick}>
    <div className="flex items-center space-between space-x-3 w-full ml-2">
      <div className="bg-gray-200 rounded-full w-[32px] h-[32px] flex items-center justify-center">
        <Image src={icon} className="w-5 h-5" />
      </div>
      <p className="text-sm text-blueNavy">{text}</p>
    </div>
    <div>
        <Image src={iconChevronRight} className="w-5 h-5" />
      </div>
  </div>
);

const HelpCenterBottomSheet = ({
  open,
  onCancel = () => console.log("Cancel clicked"),
  onClose = () => console.log("Close clicked"),
}: HelpCenterBottomSheetProps) => {
  const title = "Pusat Bantuan";

  const onClickChannel = (deeplink: string) => {
    Taro.invokeNativePlugin({
      api_name: "openWebView",
      data: {
        url:  deeplink,
      },
      success: (res: any) => console.log("invokeNativePlugin success", res),
      fail: (err: any) => console.error("invokeNativePlugin fail", err),
    });
  };

  const BottomSheetContent = () => (
    <>
      <View className="flex flex-col w-full items-center justify-center text-center mb-4">
        <Image
          src={MagicTelephoneIcon}
          className="w-[100px] h-[100px] mb-2"
        />
        <Text className="text-[16px] font-semibold">{title}</Text>
        <Text className="text-xs mt-2 mb-4 text-textSecondary text-center max-w-[250px]">
          Pilih cara yang paling nyaman untuk menghubungi CS.
        </Text>
      </View>
      <View className="mb-4">
        <div className="space-y-4">
          {/* Channel 1 */}
          <ChannelItem 
            icon={TelephoneIcon} 
            text="Telepon: +62 21 5678 9100"
            onClick={() => onClickChannel("tel:+622156789100")}
          />

          {/* Channel 2 */}
          <ChannelItem 
            icon={TelephoneSmsIcon} 
            text="WhatsApp: +62 811 2233 4455" 
            onClick={() => onClickChannel("https://wa.me/6281122334455")}
          />

          {/* Channel 3 */}
          <ChannelItem 
            icon={EnvelopeIcon} 
            text="Email: support@jkt48.id" 
            onClick={() => onClickChannel("mailto:support@jkt48.id")}
          />
        </div>
      </View>
      <Button
        className="border-none text-[#757F90] p-4"
        label="Kembali"
        onClick={onCancel}
        style="secondary"
      />
    </>
  );

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      withoutPadding
      withFloatingCloseButton
      containerClassname="p-4 !h-fit"
    >
      <BottomSheetContent />
    </BottomSheet>
  );
};

export default HelpCenterBottomSheet;
