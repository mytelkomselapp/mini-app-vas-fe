import { View, Text, Image } from "@tarojs/components";
import Button from "../../../../components/Button";
import BottomSheet from "../../../../components/BottomSheet";
import subsTermination from "../../../../assets/subscription-terminated.svg";
import GiftIcon from "../../../../assets/gift.svg";
import ImageIcon from "../../../../assets/ico_image.svg";

interface SubscriptionBottomSheetProps {
  open: boolean;
  contentTitle?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

const SubscriptionBottomSheet = ({
  open,
  onConfirm = () => console.log("Confirm clicked"),
  onCancel = () => console.log("Cancel clicked"),
  onClose = () => console.log("Close clicked"),
}: SubscriptionBottomSheetProps) => {
  const title = "Jika kamu berhenti berlangganan...";
  const labelButton = "Tetap Berlangganan";

  const BottomSheetContent = () => (
    <>
      <View className="flex flex-col w-full items-center justify-center text-center mb-4">
        <Image
          src={subsTermination}
          className="w-[100px] h-[100px] mb-2"
        />
        <Text className="text-[16px] font-semibold">{title}</Text>
        <Text className={`text-xs mt-2 text-textSecondary text-center`}>
          Kamu akan kehilangan akses ke:
        </Text>
      </View>
      <View>
        <div className="space-y-4">
          {/* Subscription Feature 1 */}
          <div className="flex items-center space-x-3">
            <div className="bg-gray-200 rounded-full w-[32px] h-[32px] flex items-center justify-center">
              <Image src={ImageIcon} className="w-5 h-5" />
            </div>
            <p className="text-sm text-blueNavy">
              Update konten eksklusif dari idolamu
            </p>
          </div>

          {/* Subscription Feature 2 */}
          <div className="flex items-center space-x-3">
            <div className="bg-gray-200 rounded-full w-[32px] h-[32px] flex items-center justify-center">
              <Image src={GiftIcon} className="w-5 h-5" />
            </div>
            <p className="text-sm text-blueNavy">
              Peluang memenangkan hadiah spesial
            </p>
          </div>

        </div>
      </View>
      <Button
        label={labelButton}
        className="mt-6 mb-1 text-[16px] font-semibold"
        onClick={onConfirm}
      />
      <Button
        className="border-none text-[#757F90]"
        label="Berhenti Berlangganan"
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

export default SubscriptionBottomSheet;
