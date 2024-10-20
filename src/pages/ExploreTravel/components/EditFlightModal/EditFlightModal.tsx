import BottomSheet from "../../components/BottomSheet";
import FlightSpecific from "../../pages/FlightSpecific";
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  data?: object;
}

const EditFlightModal: React.FC<Props> = ({ open, onClose, data }) => {
  return (
    <BottomSheet open={open} onClose={onClose}>
      <div className="flex flex-col items-center gap-y-2 mt-2 w-full">
        <h1 className="text-base font-semibold">{"Cari Penerbangan"}</h1>
      </div>
      <FlightSpecific />
    </BottomSheet>
  );
};

export default EditFlightModal;
