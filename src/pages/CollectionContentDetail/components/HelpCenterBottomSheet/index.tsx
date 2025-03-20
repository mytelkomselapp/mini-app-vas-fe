import { View, Text, Image } from "@tarojs/components";
import Button from "../../../../components/Button";
import BottomSheet from "../../../../components/BottomSheet";
import subsTermination from "../../../../assets/subscription-terminated.svg";
import GiftIcon from "../../../../assets/gift.svg";
import TelephoneIcon from "../../../../assets/ico_telephon.svg";
import TelephoneSmsIcon from "../../../../assets/ico_telephone+sms.svg";
import EnvelopeIcon from "../../../../assets/ico_envelope.svg";
import MagicTelephoneIcon from "../../../../assets/magic_call.svg";

interface HelpCenterBottomSheetProps {
  open: boolean;
  contentTitle?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

const HelpCenterBottomSheet = ({
  open,
  onCancel = () => console.log("Cancel clicked"),
  onClose = () => console.log("Close clicked"),
}: HelpCenterBottomSheetProps) => {
  const title = "Pusat Bantuan";

  const BottomSheetContent = () => (
    <>
      <View className="flex flex-col w-full items-center justify-center text-center mb-4">
        <Image
          src={MagicTelephoneIcon}
          className="w-[100px] h-[100px] mb-2"
        />
        <Text className="text-[16px] font-semibold">{title}</Text>
        <Text className="text-xs mt-2 text-textSecondary text-center max-w-[250px]">
          Pilih cara yang paling nyaman untuk menghubungi CS.
        </Text>
      </View>
      <View>
        <div className="space-y-4">
          {/* Channel 1 */}
          <div className="flex items-center space-x-3">
            <div className="bg-gray-200 rounded-full w-[32px] h-[32px] flex items-center justify-center">
              <Image src={TelephoneIcon} className="w-5 h-5" />
            </div>
            <p className="text-sm text-blueNavy">
              Telepon: +62 21 5678 9100
            </p>
          </div>

          {/* Channel 2 */}
          <div className="flex items-center space-x-3">
            <div className="bg-gray-200 rounded-full w-[32px] h-[32px] flex items-center justify-center">
              <Image src={TelephoneSmsIcon} className="w-5 h-5" />
            </div>
            <p className="text-sm text-blueNavy">
              WhatsApp: +62 811 2233 4455
            </p>
          </div>

          {/* Channel 3 */}
          <div className="flex items-center space-x-3">
            <div className="bg-gray-200 rounded-full w-[32px] h-[32px] flex items-center justify-center">
              <Image src={EnvelopeIcon} className="w-5 h-5" />
            </div>
            <p className="text-sm text-blueNavy">
              Email: support@jkt48.id
            </p>
          </div>

        </div>
      </View>
      <Button
        className="border-none text-[#757F90]"
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
      containerClassname="p-4 pb-8 !h-fit"
    >
      <BottomSheetContent />
    </BottomSheet>
  );
};

export default HelpCenterBottomSheet;
