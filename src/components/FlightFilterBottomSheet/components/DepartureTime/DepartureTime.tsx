import * as React from "react";
import { DepartureTimeDataProps } from "../../types/props";
import { DUMMY_DATA_DEPARTURE_TIME_FILTER } from "../../constant";
import Checkbox from "../../components/Checkbox";
import { useTravelFilterFlightData } from "../../store/travel";

export interface DepartureTimeProps {
  show: boolean;
}

const DepartureTime: React.FC<DepartureTimeProps> = ({ show }) => {
  const { departureTime, setDepartureTime } = useTravelFilterFlightData();

  const dataDepartureTime: DepartureTimeDataProps[] =
    DUMMY_DATA_DEPARTURE_TIME_FILTER;

  const handleClick = (value: string) => {
    setDepartureTime(value);
  };

  if (!show) return null;

  return (
    <div className="flex flex-col gap-[12px] px-[16px] pb-[16px] border-b-[1px] border-b-dividerGrey">
      <h1 className="text-[14px] font-[600] text-primary">Waktu Pergi</h1>

      {dataDepartureTime?.map((data, idx) => {
        const isChecked = departureTime === data?.value;
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

export default DepartureTime;
