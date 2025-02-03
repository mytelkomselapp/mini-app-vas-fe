import * as React from "react";
import BottomSheet from "../../../../../components/BottomSheet";
import Button from "../../../../../components/Button";
import { useDetailTaskRamadhan } from "../../../../../store/ramadhan";

export interface DetailTaskIbadahModalProps {
  visible: boolean;
  onSubmit: () => void;
  onClose: () => void;
}

const DetailTaskIbadahModal: React.FC<DetailTaskIbadahModalProps> = ({
  visible,
  onSubmit,
  onClose,
}) => {
  const { data } = useDetailTaskRamadhan();

  const title = String(data?.title)?.toLowerCase();

  const handleClose = () => {
    onClose?.();
  };

  const handleSubmit = () => {
    onSubmit?.();
    onClose?.();
  };

  return (
    <BottomSheet
      withoutPadding
      showHeader={false}
      open={visible}
      onClose={handleClose}
      withFloatingCloseButton
    >
      <div className="flex flex-col gap-y-1 p-[32px] bg-teal-100 h-[200px] rounded-t-[16px]">
        <p className="text-12px font-semibold text-teal-600 whitespace-pre">{`"Sungguh, sholat itu adalah\nkewajiban yang ditentukan\nwaktunya atas orang-\norang yang beriman."`}</p>
        <p className="text-[12px] text-gray-400">QS. An Nisa: 103</p>
      </div>
      <div className="flex flex-col gap-y-3 justify-center items-center py-[12px] px-[16px]">
        <p className="text-[18px] text-center font-bold text-[#181c21] whitespace-pre">
          {`Apakah kamu sudah mengerjakan\n${title} ini?`}
        </p>

        <div className="flex flex-col gap-y-2 w-full px-[16px]">
          <Button onClick={handleSubmit} label="Ya, Sudah" style="primary" />
          <Button onClick={handleClose} label="Belum" style="secondary" />
        </div>
      </div>
    </BottomSheet>
  );
};

export default DetailTaskIbadahModal;
