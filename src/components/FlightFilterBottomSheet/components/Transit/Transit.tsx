import * as React from "react";
import { TransitDataProps } from "../../types/props";
import { DUMMY_DATA_TRANSIT_FILTER } from "../../constant";
import Checkbox from "../../components/Checkbox";
import { numberToRupiah } from "../../lib/utils";
import { useTravelFilterFlightData } from "../../store/travel";

export interface TransitFilterProps {
  show: boolean;
}

const Transit: React.FC<TransitFilterProps> = ({ show = true }) => {
  const { transit, setTransit } = useTravelFilterFlightData();

  const dataTransit: TransitDataProps[] = DUMMY_DATA_TRANSIT_FILTER;

  const handleClick = (value: string) => {
    setTransit(value);
  };

  if (!show) return;

  return (
    <div className="flex flex-col gap-[12px] px-[16px] pb-[16px] border-b-[1px] border-b-dividerGrey">
      <h1 className="text-[14px] font-[600] text-primary">Transit</h1>

      {dataTransit?.map((data, idx) => {
        const isChecked = transit === data?.title;
        const textColor = data?.selectable
          ? "text-[14px] text-primary"
          : "text-[14px] text-textSecondary";

        return (
          <div
            onClick={
              data?.selectable ? () => handleClick(data?.title) : undefined
            }
            key={idx}
            className="flex justify-between items-center"
          >
            <div className="flex flex-col gap-y-[4px]">
              <p className={textColor}>{data?.title}</p>
              <p className="text-[14px] text-textSecondary">
                Mulai dari {numberToRupiah(data?.startPrice)}
              </p>
            </div>

            <Checkbox
              disabled={!data?.selectable}
              checked={isChecked}
              onClick={() => handleClick(data?.title)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Transit;
