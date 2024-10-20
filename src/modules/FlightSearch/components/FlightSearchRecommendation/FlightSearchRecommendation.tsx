import Chips from "../../../../components/Chips";
import { CMSFlightLandingPopularCitiesSection } from "../../../../network/types/response-props";
import { DestinationOriginProps } from "../../../../store/flight";
import * as React from "react";

interface Props {
  data: CMSFlightLandingPopularCitiesSection[];
  onSelect: (value: DestinationOriginProps) => void;
}

const FlightSearchRecommendation: React.FC<Props> = ({
  onSelect,
  data = [],
}) => {
  const handleSelect = (value: DestinationOriginProps) => onSelect?.(value);

  return (
    <div className="w-full flex flex-col gap-y-2">
      <div className="flex justify-between items-center">
        <h1 className="text-sm font-semibold">Kota Populer</h1>
      </div>
      <div className="flex gap-2 mt-[8px] flex-wrap">
        {data?.map((item, idx) => (
          <Chips
            key={`${idx}-${item?.id}`}
            text={item?.cityName}
            onClick={(text: string) =>
              handleSelect({
                city: text,
                cityId: Number(item?.airportCode),
              })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default FlightSearchRecommendation;
