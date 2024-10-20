import Chips from "../../../../components/Chips";
import { CMSFlightLandingPopularCitiesSection } from "../../../../network/types/response-props";
import { DestinationOriginProps } from "../../../../store/flight";
import * as React from "react";

interface Props {
  data: CMSFlightLandingPopularCitiesSection[];
  onSelect: (value: DestinationOriginProps) => void;
  onRemove: () => void;
}

const FlightSearchHistory: React.FC<Props> = ({
  data = [],
  onSelect,
  onRemove,
}) => {
  const handleSelect = (value: DestinationOriginProps) => onSelect?.(value);

  return (
    <div className="w-full flex flex-col gap-y-2">
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold">Pencarian Terakhir</h1>
        <h1
          onClick={onRemove}
          className="text-[13px] font-semibold text-solidRed cursor-pointer"
        >
          Hapus Riwayat
        </h1>
      </div>
      <div className="flex flex-wrap gap-2 mt-[8px]">
        {data?.map((item, idx) => (
          <Chips
            key={idx}
            text={item?.cityName}
            onClick={(text: string) =>
              handleSelect({
                city: text,
                cityId: item?.cityId,
              })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default FlightSearchHistory;
