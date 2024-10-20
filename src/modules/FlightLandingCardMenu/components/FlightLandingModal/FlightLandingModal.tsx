import * as React from "react";
import { Sheet as BottomSheet } from "react-modal-sheet";
import { ReactComponent as ArrowRight } from "../../assets/arrow-right.svg";
import style from "./FlightLandingModal.module.css";
import { buttonClick } from "../../network/analytics/tracker";

interface Props {
  open: boolean;
  onClose: () => void;
}

const FlightLandingModal: React.FC<Props> = ({ open, onClose }) => {
  const handleButtonClick = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const { type } = event?.currentTarget?.dataset;

    if (type === "domestic") {
      buttonClick(
        "Domestic",
        "Choose Destination",
        "",
        window.location.pathname
      );

      return window.open(
        "https://www.traveloka.com/mytelkomsel-flight",
        "_blank"
      );
    }

    buttonClick(
      "International",
      "Choose Destination",
      "",
      window.location.pathname
    );

    return window.open("https://id.trip.com/?locale=en-id", "_blank");
  };

  return (
    <BottomSheet
      isOpen={open}
      onClose={onClose}
      detent="content-height"
      className={open ? style["container"] : ""}
    >
      <BottomSheet.Backdrop onTap={onClose} className={style["backdrop"]} />
      <BottomSheet.Container className="rounded-t-2xl">
        <BottomSheet.Header>
          <div className="flex flex-col items-center gap-y-2 justify-between py-[4px]">
            <div className="bg-slate-200 rounded-md h-[6px] w-[50px]" />
            <p className="text-base font-semibold">Pilih Tujuan</p>
          </div>
        </BottomSheet.Header>
        <BottomSheet.Content>
          <div className="flex flex-col gap-y-2 p-[16px] w-full">
            <div
              data-type="domestic"
              className="rounded-md p-[16px] flex flex-row justify-between items-center bg-inactiveGrey"
              onClick={handleButtonClick}
            >
              <div>
                <p className="text-xs font-semibold">Domestik</p>
                <p className="text-xs text-grey">
                  Cari tiket untuk jelajahi indonesia
                </p>
              </div>
              <ArrowRight />
            </div>
            <div
              className="rounded-md p-[16px] flex flex-row justify-between items-center bg-inactiveGrey"
              data-type="international"
              onClick={handleButtonClick}
            >
              <div>
                <p className="text-xs font-semibold">Internasional</p>
                <p className="text-xs text-grey">
                  Cari tiket untuk manca negara
                </p>
              </div>
              <ArrowRight />
            </div>
          </div>
        </BottomSheet.Content>
      </BottomSheet.Container>
    </BottomSheet>
  );
};

export default FlightLandingModal;
