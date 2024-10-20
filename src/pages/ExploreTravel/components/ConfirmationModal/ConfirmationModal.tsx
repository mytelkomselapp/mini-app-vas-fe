import BottomSheet from "../../components/BottomSheet";
import Button from "../../components/Button";
import React from "react";
import { ReactComponent as ArrowRight } from "../../assets/chevron-right-16px.svg";
import travelokaImg from "../../assets/traveloka-squared.png";

interface Props {
  title?: string;
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  isMultiPartner?: boolean;
  data?: object;
}

const description =
  "Kamu akan menuju situs lain untuk melanjutkan pemesanan. Harga di sini hanya perkiraan, pastikan total harga di situs tersebut sebelum membayar.";
const ConfirmationModal: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  title = "Informasi Pemesanan",
  isMultiPartner,
  data,
}) => {
  const renderContent = () => {
    if (!isMultiPartner) {
      return (
        <div className="px-4">
          <span className="text-sm">{description}</span>
          <Button
            className="mt-4 flex flex-row justify-center items-center gap-[2px] relative right-[5px] max-w-[97%] mx-auto"
            label="Lanjut"
            onClick={onSubmit}
          />
          <Button
            className="mt-2 mb-4 flex flex-row justify-center items-center gap-[2px] relative right-[5px] max-w-[97%] mx-auto"
            label="Kembali"
            style="secondary"
            onClick={onClose}
          />
        </div>
      );
    } else {
      return (
        <div>
          <div className="bg-solidRed bg-opacity-5 py-2 px-3">
            <span className="text-xs font-sans">{description}</span>
          </div>
          <div className="px-4">
            <div className="flex flex-row items-center pt-4">
              <div className="bg-[#1BA0E2] rounded-[4px] p-1">
                <img
                  src={travelokaImg}
                  className="w-[20px] h-[20px]"
                  alt="traveloka"
                />
              </div>
              <div className="flex flex-row items-center ml-[14px]">
                <span className="text-xs">{"Traveloka"}</span>
              </div>
              <div className="flex flex-row items-center ml-auto">
                <span className="font-semibold text-xs">{"Rp1.989.000"}</span>
                <span className="text-grey text-[10px]">{"/orang"}</span>
                <ArrowRight className="ml-1" />
              </div>
            </div>
            <div className="h-[1px] w-full bg-dividerGrey opacity-[0.7] my-4" />
          </div>
          <Button
            className="mt-2 mb-4 flex flex-row justify-center items-center gap-[2px] relative right-[5px] max-w-[97%] mx-auto"
            label="Kembali"
            style="secondary"
            onClick={onClose}
          />
        </div>
      );
    }
  };
  return (
    <BottomSheet open={open} onClose={onClose}>
      <span className="font-semibold text-base flex justify-center my-4">
        {title}
      </span>
      {renderContent()}
    </BottomSheet>
  );
};

export default ConfirmationModal;
