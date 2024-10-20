import { useTravelFilterFlightData } from "../../store/travel";
import * as React from "react";
import { AirlineDataProps } from "../../types/props";
import { DUMMY_DATA_AIRLINE } from "../../constant";
import Checkbox from "../../components/Checkbox";
import { numberToRupiah } from "../../lib/utils";

export interface AirlineProps {
  show: boolean;
}

const Airline: React.FC<AirlineProps> = ({ show }) => {
  const { airline, setAirline } = useTravelFilterFlightData();

  const dataAirline: AirlineDataProps[] = DUMMY_DATA_AIRLINE;

  const handleClick = (value: string) => {
    setAirline(value);
  };

  if (!show) return null;

  return (
    <div className="flex flex-col gap-[12px] px-[16px] pb-[16px] border-b-[1px] border-b-dividerGrey">
      <h1 className="text-[14px] font-[600] text-primary">Maskapai</h1>

      {dataAirline?.map((data, idx) => {
        const isChecked = airline === data?.airline;

        return (
          <div
            onClick={
              data?.selectable ? () => handleClick(data?.airline) : undefined
            }
            key={idx}
            className="flex justify-between items-center"
          >
            <div className="flex items-center gap-[12px]">
              <div
                className={`rounded-full w-[24px] h-[24px] ${data?.color}`}
              />
              <div className="flex flex-col gap-y-[4px]">
                <p className="text-[14px] text-primary">{data?.airline}</p>
                <p className="text-[14px] text-textSecondary">
                  Mulai dari {numberToRupiah(data?.startPrice)}
                </p>
              </div>
            </div>
            <Checkbox
              disabled={!data?.selectable}
              checked={isChecked}
              onClick={() => handleClick(data?.airline)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Airline;
