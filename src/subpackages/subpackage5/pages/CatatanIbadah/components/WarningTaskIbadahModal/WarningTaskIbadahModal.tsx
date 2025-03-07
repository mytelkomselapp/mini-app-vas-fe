import * as React from "react";
import { View } from "@tarojs/components";
import BottomSheet from "../../../../../../components/BottomSheet";
import Button from "../../../../../../components/Button";
import GlassHour from "../../../../../../assets/glass-hour-task.png";
import WarningTask from "../../../../../../assets/warning-task.png";

interface Props {
  isLoading?: boolean;
  open: boolean;
  message?: string;
  onClose: () => void;
  onClickCTA: (answer: "ON" | "OFF") => void;
  type: "past" | "present";
  category?: "pagi" | "siang" | "malam";
}

const WarningTaskIbadahModal: React.FC<Props> = ({
  open,
  message = "",
  onClose,
  onClickCTA,
  isLoading = false,
  type,
  category = "pagi",
}) => {
  const handleClick = (answer: "ON" | "OFF") => {
    onClickCTA?.(answer);
    onClose?.();
  };

  return (
    <BottomSheet open={open} onClose={onClose} withFloatingCloseButton>
      <View>
        <div className="flex flex-col items-center gap-y-2">
          <img
            src={type === "past" ? WarningTask : GlassHour}
            style={{ width: 100, height: 100 }}
          />
          <div className="flex flex-col items-center gap-y-1 mt-1 mb-4 w-[100%]">
            <h1
              style={{ fontSize: 18 }}
              className="text-[12px] font-semibold text-center mb-1"
            >
              {type === "past"
                ? `Maaf, pencatatan kegiatan ibadah di waktu ${category} sudah ditutup `
                : `Maaf, kegiatan ini belum dapat dicatat`}
            </h1>
            <p className="text-[14.5px] text-textSecondary text-center">
              {message}
            </p>
          </div>
          <div className="flex flex-col gap-y-2 w-full px-[16px] pb-[32px]">
            <Button
              disabled={isLoading}
              onClick={() => handleClick("ON")}
              label="Ok, Saya Mengerti"
              style="primary"
            />
          </div>
        </div>
      </View>
    </BottomSheet>
  );
};

export default WarningTaskIbadahModal;
