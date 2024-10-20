import * as React from "react";
import { Chips, SeatMap } from "./components";
import Show from "../../components/Show";

export interface FlightSeatInformationProps {}

const FlightSeatInformation: React.FC<FlightSeatInformationProps> = () => {
  const [activeTab, setActiveTab] = React.useState<number>(0);

  const handleChangeTab = (value: number) => {
    setActiveTab(value);
  };

  return (
    <div className="rounded-[16px] p-[16px] gap-[16px] bg-[#ffffff]">
      <h1 className="text-[14px] font-semibold leading-0">Informasi Kursi</h1>

      <Chips
        activeTab={activeTab}
        chips={[
          {
            value: 0,
            label: "Ekonomi",
          },
          {
            value: 1,
            label: "Business",
          },
        ]}
        onClick={handleChangeTab}
      />

      <Show when={activeTab === 0}>
        <div className="flex flex-col gap-[16px]">
          <div className="flex justify-between items-center">
            <p className="text-[12px] text-[#757F90]">Ruang Kaki</p>
            <p className="text-[14px] font-semibold text-[#181C21]">86.4 cm</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[12px] text-[#757F90]">Lebar Kursi</p>
            <p className="text-[14px] font-semibold text-[#181C21]">48 cm</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[12px] text-[#757F90]">Sudut Berbaring</p>
            <p className="text-[14px] font-semibold text-[#181C21]">
              110<sup>o</sup>
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[12px] text-[#757F90]">Denah Kursi</p>
            <p className="text-[14px] font-semibold text-[#181C21]">3 - 3</p>
          </div>

          <SeatMap column_left={3} column_right={3} row={3} />
        </div>
      </Show>
      <Show when={activeTab === 1}>
        <div className="flex flex-col gap-[16px]">
          <div className="flex justify-between items-center">
            <p className="text-[12px] text-[#757F90]">Ruang Kaki</p>
            <p className="text-[14px] font-semibold text-[#181C21]">109 cm</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[12px] text-[#757F90]">Lebar Kursi</p>
            <p className="text-[14px] font-semibold text-[#181C21]">54 cm</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[12px] text-[#757F90]">Sudut Berbaring</p>
            <p className="text-[14px] font-semibold text-[#181C21]">
              180<sup>o</sup>
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[12px] text-[#757F90]">Denah Kursi</p>
            <p className="text-[14px] font-semibold text-[#181C21]">2 - 2</p>
          </div>

          <SeatMap column_left={2} column_right={2} row={3} />
        </div>
      </Show>
    </div>
  );
};

export default FlightSeatInformation;
