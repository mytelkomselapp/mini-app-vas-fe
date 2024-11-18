import * as React from "react";
import SuccessHandsIllustrator from "../../assets/success-hands.svg";
import Button from "../../components/Button";
import BottomSheet from "../../components/BottomSheet";
import { buttonClick } from "../../network/analytics/tracker";
import { View } from "@tarojs/components";

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
    <BottomSheet open={open} onClose={onClose}>
      <View>
        <div className="flex flex-col items-center gap-y-2">
          <img
            src={SuccessHandsIllustrator}
            style={{ width: 100, height: 100 }}
          />
          <div className="flex flex-col items-center gap-y-1 mt-1 mb-4 w-[90%]">
            <h1 style={{ fontSize: 16 }} className="text-[12px] font-semibold">
              Tambah tiket berhasil!
            </h1>
            <p className="text-[12px] text-textSecondary text-center">
              Tiket kamu sudah ditambahkan ke dalam halaman My Ticket
            </p>
          </div>
          <Button label="Lihat My Ticket" onClick={handleClick} />
        </div>
      </View>
    </BottomSheet>
  );
};

export default FlightTicketCreateSuccessModal;
