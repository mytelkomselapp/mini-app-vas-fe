import * as React from "react";
import BottomSheet from "../../components/BottomSheet";
import Button from "../../components/Button";
import PriceRange from "./components/PriceRange";
import Transit from "./components/Transit/Transit";
import DepartureTime from "./components/DepartureTime";
import ArrivalTime from "./components/ArrivalTime/ArrivalTime";
import Airline from "./components/Airline";

interface Props {
  open: boolean;
  onClose: () => void;
}

const Filter: React.FC<Props> = ({ open, onClose }) => {
  const handleSubmitFilter = () => {
    //redirect action
    onClose();
  };

  return (
    <BottomSheet detent="full-height" open={open} onClose={onClose} disableDrag>
      <p className="text-center text-[16px] font-[600] text-primary">Filter</p>
      <div className="flex flex-col gap-[16px] my-[20px] overflow-y-auto">
        <PriceRange show />
        <Transit show />
        <DepartureTime show />
        <ArrivalTime show />
        <Airline show />
      </div>
      <div className="px-[16px] pb-[16px]">
        <Button label="Simpan" onClick={handleSubmitFilter} />
      </div>
    </BottomSheet>
  );
};

export default Filter;
