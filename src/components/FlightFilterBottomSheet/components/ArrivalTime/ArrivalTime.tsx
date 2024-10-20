import * as React from "react";
import { ArrivalTimeDataProps } from "../../types/props";
import { DUMMY_DATA_ARRIVAL_TIME_FILTER } from "../../constant";
import Checkbox from "../../components/Checkbox";
import { useTravelFilterFlightData } from "../../store/travel";

export interface ArrivalTimeProps {
  show: boolean;
}

const ArrivalTime: React.FC<ArrivalTimeProps> = ({ show }) => {
  const { arrivalTime, setArrivalTime } = useTravelFilterFlightData();

  const dataArrivalTime: ArrivalTimeDataProps[] =
    DUMMY_DATA_ARRIVAL_TIME_FILTER;

  const handleClick = (value: string) => {
    setArrivalTime(value);
  };

  if (!show) return null;

  return (
    <div className="flex flex-col gap-[12px] px-[16px] pb-[16px] border-b-[1px] border-b-dividerGrey">
      <h1 className="text-[14px] font-[600] text-primary">Waktu Tiba</h1>

      {dataArrivalTime?.map((data, idx) => {
        const isChecked = arrivalTime === data?.value;
        const textColor = data?.selectable
          ? "text-[14px] text-primary"
          : "text-[14px] text-textSecondary";

        return (
          <div
            onClick={
              data?.selectable ? () => handleClick(data?.value) : undefined
            }
            key={idx}
            className="flex justify-between items-center"
          >
            <div className="flex justify-between items-center">
              <p className={textColor}>{data?.title}</p>
            </div>
            <Checkbox
              disabled={!data?.selectable}
              checked={isChecked}
              onClick={() => handleClick(data?.value)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ArrivalTime;
