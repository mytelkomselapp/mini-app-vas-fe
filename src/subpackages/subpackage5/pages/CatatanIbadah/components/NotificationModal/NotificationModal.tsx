import * as React from "react";
import { View } from "@tarojs/components";
import BottomSheet from "../../../../../../components/BottomSheet";
import Button from "../../../../../../components/Button";
import NotificationClock from "../../../../../../assets/notification-clock.png";

interface Props {
  isLoading?: boolean;
  open: boolean;
  onClose: () => void;
  onClickCTA: (answer: "ON" | "OFF") => void;
}

const NotificationModal: React.FC<Props> = ({
  open,
  onClose,
  onClickCTA,
  isLoading = false,
}) => {
  const handleClick = (answer: "ON" | "OFF") => {
    onClickCTA?.(answer);
    onClose?.();
  };

  return (
    <BottomSheet open={open} onClose={onClose}>
      <View>
        <div className="flex flex-col items-center gap-y-2">
          <img src={NotificationClock} style={{ width: 100, height: 100 }} />
          <div className="flex flex-col items-center gap-y-1 mt-1 mb-4 w-[100%]">
            <h1 style={{ fontSize: 16 }} className="text-[12px] font-semibold">
              Selamat datang di jurnal ibadah!
            </h1>
            <p className="text-[12px] text-textSecondary text-center">
              Aktifkan notifikasi agar kamu bisa lebih mudah memantau jurnal
              ibadahmu.
            </p>
          </div>
          <div className="flex flex-col gap-y-2 w-full px-[16px] pb-[42px]">
            <Button
              disabled={isLoading}
              onClick={() => handleClick("ON")}
              label="Ya, Aktifkan"
              style="primary"
            />
            <Button
              disabled={isLoading}
              onClick={() => handleClick("OFF")}
              label="Nanti Saja"
              style="secondary"
            />
          </div>
        </div>
      </View>
    </BottomSheet>
  );
};

export default NotificationModal;
