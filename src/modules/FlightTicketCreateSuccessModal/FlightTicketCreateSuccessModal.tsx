import * as React from "react";
import { ReactComponent as SuccessHandsIllustrator } from "../../assets/success-hands.svg";
import Button from "../../components/Button";
import BottomSheet from "../../components/BottomSheet";
import { buttonClick } from "../../network/analytics/tracker";

interface Props {
  open: boolean;
  onClose: () => void;
  onClickCTA: () => void;
}

const FlightTicketCreateSuccessModal: React.FC<Props> = ({
  open,
  onClose,
  onClickCTA,
}) => {
  const handleClick = () => {
    buttonClick(
      "See My Ticket",
      "See My Ticket",
      "Create Ticket",
      window.location.pathname
    );
    onClickCTA?.();
    onClose?.();
  };

  return (
    <BottomSheet open={open} onClose={onClose} disableDrag>
      <div className="flex flex-col items-center gap-y-2 p-[16px] mt-[16px] w-full">
        <SuccessHandsIllustrator />
        <div className="flex flex-col items-center gap-y-1 mt-1 mb-4 w-[90%]">
          <h1 className="text-base font-semibold">Tambah tiket berhasil!</h1>
          <p className="text-xs text-textSecondary text-center">
            Tiket kamu sudah ditambahkan ke dalam halaman My Ticket
          </p>
        </div>
        <Button label="Lihat My Ticket" onClick={handleClick} />
      </div>
    </BottomSheet>
  );
};

export default FlightTicketCreateSuccessModal;
