import { ReactComponent as FlightIcon } from "../../assets/garuda.svg";
import BottomSheet from "../../components/BottomSheet";
import Button from "../../components/Button";
import moment from "moment";
import React, { useState } from "react";
interface Props {
  title?: string;
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  data?: object;
}

const dummyBaggage = [
  { id: "0", weight: "+0kg", price: "Rp0" },
  { id: "1", weight: "+5kg", price: "Rp507.000" },
  { id: "2", weight: "+10kg", price: "Rp1.014.000" },
  { id: "3", weight: "+20kg", price: "Rp2.014.000" },
];

const description = "Sudah termasuk 20kg untuk setiap penumpang.";
const BaggageModal: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  title = "Beli Bagasi",
  data,
}) => {
  const [baggageItem, setBaggageItem] = useState<String>("");

  const date = moment().format("dddd,  D MMM YYYY");
  const handleSave = () => {
    onClose();
  };
  return (
    <BottomSheet open={open} onClose={onClose}>
      <span className="font-semibold text-base flex justify-center my-4">
        {title}
      </span>
      <div className="p-4 pb-0">
        <span>{date}</span>

        <div className="flex justify-between mt-2">
          <div className="flex flex-row items-center gap-2">
            <FlightIcon />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">{"08:20 - 10:30"}</span>
              <span className="text-grey text-xs">{"CGK T1A - SIN 1"}</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-sm">{"Direct"}</span>
            <span className="text-grey text-xs">{"2h 10m"}</span>
          </div>
        </div>

        <div className="bg-solidRed bg-opacity-5 p-3 my-4">
          <span className="text-xs">
            {"Sudah termasuk 20kg untuk setiap penumpang."}
          </span>
        </div>

        <span className="font-semibold text-sm">{"Abdul Hamdan"}</span>
      </div>
      <div className="flex flex-row space-x-2 overflow-auto no-scrollbar pl-4 pb-4">
        {dummyBaggage?.map((val, i) => {
          return (
            <div
              key={i}
              className={`flex flex-col rounded-2xl border-[1px] min-w-[96px] justify-center text-center p-2 gap-2 mt-2 ${
                baggageItem === val?.id
                  ? "border-textError"
                  : "border-dividerGrey"
              }`}
              onClick={() => setBaggageItem(val?.id)}
            >
              <span className="text-sm">{val?.weight}</span>
              <span className="text-xs font-semibold">{val?.price}</span>
            </div>
          );
        })}
      </div>
      <Button
        className="mb-4 ml-4 flex flex-row justify-center items-center gap-[2px] max-w-[97%] mx-auto"
        label="Simpan"
        onClick={handleSave}
      />
    </BottomSheet>
  );
};

export default BaggageModal;
