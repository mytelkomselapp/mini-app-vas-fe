import * as React from "react";
import BottomSheet from "../../../../../components/BottomSheet";
import Button from "../../../../../components/Button";
import { useDetailTaskRamadhan } from "../../../../../store/ramadhan";
import { MissionPopupCMSData } from "../../../../../network/types/response-props";
import BackgroundImage from "../../../../../components/BackgroundImage";

export interface DetailTaskIbadahModalProps {
  submitLoading: boolean;
  visible: boolean;
  data: MissionPopupCMSData[];
  onSubmit: (missionId: string) => void;
  onClose: () => void;
}

const DetailTaskIbadahModal: React.FC<DetailTaskIbadahModalProps> = ({
  data,
  visible,
  onSubmit,
  onClose,
  submitLoading,
}) => {
  const { data: dataTaskRamadhan } = useDetailTaskRamadhan();

  const title = String(dataTaskRamadhan?.mission_name_id ?? "")?.toLowerCase();
  const activeDataTask = data.find(
    (item) => item.mission_id === dataTaskRamadhan?.mission_id
  );

  const handleClose = () => {
    onClose?.();
  };

  const handleSubmit = () => {
    onSubmit?.(activeDataTask?.mission_id ?? "");
  };

  return (
    <BottomSheet
      withoutPadding
      showHeader={false}
      open={visible}
      onClose={handleClose}
      withFloatingCloseButton
    >
      <BackgroundImage
        imageUrl={activeDataTask?.backgroundImg}
        className="flex flex-col gap-y-1 p-[32px] bg-teal-100 h-[300px] object-contain rounded-t-[16px]"
      ></BackgroundImage>
      <div className="flex flex-col gap-y-3 justify-center items-center py-[12px] px-[16px]">
        <p className="text-[18px] text-center font-bold text-[#181c21] whitespace-pre">
          {`Apakah kamu sudah mengerjakan\n${title} ini?`}
        </p>

        <div className="flex flex-col gap-y-2 w-full px-[16px]">
          <Button
            disabled={submitLoading}
            onClick={handleSubmit}
            label="Ya, Sudah"
            style="primary"
          />
          <Button
            disabled={submitLoading}
            onClick={handleClose}
            label="Belum"
            style="secondary"
          />
        </div>
      </div>
    </BottomSheet>
  );
};

export default DetailTaskIbadahModal;
