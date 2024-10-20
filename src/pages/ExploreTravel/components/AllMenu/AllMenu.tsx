import BottomSheet from "../../components/BottomSheet";
import Button from "../../components/Button";
import FlightLandingMenu from "../../modules/FlightLandingCardMenu/components/FlightLandingMenu";
import { useFetchCMSLandingPage } from "../../network";
import React from "react";

interface Props {
  open: boolean;
  onClose: () => void;
}
const AllMenu: React.FC<Props> = ({ open, onClose }) => {
  const { data: dataRaw, isFetching: fetchingCMSLandingPage } =
    useFetchCMSLandingPage();
  const dataFlight = dataRaw?.data?.data;
  const dataFlightAppSection = dataFlight?.appsSection ?? [];
  return (
    <BottomSheet open={open} onClose={onClose}>
      <span className="font-semibold text-base flex justify-center my-4">
        {"Menu"}
      </span>
      <div className="px-4">
        <span className="text-[16px]">Terakhir dilihat</span>
        <div className="grid grid-cols-4 p-4 justify-around gap-3 mb-4">
          <FlightLandingMenu
            data={[...dataFlightAppSection]}
            isLoading={fetchingCMSLandingPage}
            onClick={() => {}}
            classNameText="mt-2 w-[58px] text-center text-[10px]"
          />
        </div>

        <span className="text-[16px]">Beli</span>
        <div className="grid grid-cols-4 p-4 justify-around gap-3 mb-4">
          <FlightLandingMenu
            data={[...dataFlightAppSection]}
            isLoading={fetchingCMSLandingPage}
            onClick={() => {}}
            classNameText="mt-2 w-[58px] text-center text-[10px]"
          />
        </div>

        <span className="text-[16px]">Pelengkap Perjalananmu</span>
        <div className="grid grid-cols-4 p-4 justify-around gap-3 mb-4">
          <FlightLandingMenu
            data={[...dataFlightAppSection]}
            isLoading={fetchingCMSLandingPage}
            onClick={() => {}}
            classNameText="mt-2 w-[58px] text-center text-[10px]"
          />
        </div>
      </div>
    </BottomSheet>
  );
};

export default AllMenu;
