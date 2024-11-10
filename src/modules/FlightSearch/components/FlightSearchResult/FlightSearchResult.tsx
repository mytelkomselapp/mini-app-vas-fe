import * as React from "react";
import MagnifyingGlassIcon from "../../../../assets/magnifying-glass.svg";
import { FlightSearchData } from "../../../../network/types/response-props";
import { cn } from "../../../../lib/utils";
import RenderVerticalList from "../../../../components/RenderVerticalList/RenderVerticalList";
import { DestinationOriginProps } from "../../../../store/flight";

interface Props {
  data: FlightSearchData[];
  onSelect: (name: DestinationOriginProps) => void;
}

/* HIGHLIGHTED TEXT TODO */
const FlightSearchResult: React.FC<Props> = ({ onSelect, data }) => {
  const handleSelect = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const { city, cityid } = event?.currentTarget?.dataset;

    onSelect?.({
      city: city ?? "",
      ...(cityid ? { cityId: Number(cityid) } : {}),
    });
  };

  const isEmpty = data?.length <= 0;

  if (isEmpty)
    return (
      <div className="w-full h-[90%] flex items-center justify-center">
        <h1 className="text-xs text-textSecondary">
          Kata yang kamu cari tidak tersedia
        </h1>
      </div>
    );

  return (
    <RenderVerticalList data={data} keyIndex="id" pageSize={18}>
      {(item, index) => (
        <div
          className="border-b border-[#DAE0E9] cursor-pointer"
          data-city={item?.city_name}
          data-cityid={item?.id}
          onClick={handleSelect}
        >
          <div
            className={cn("flex gap-x-2 items-center", {
              "pb-[8px]": index === 0,
              "py-[8px]": index > 0,
            })}
          >
            <img
              src={MagnifyingGlassIcon}
              style={{ height: "1rem", width: "1rem" }}
            />
            <p className="text-[13px]">{item?.city_name}</p>
          </div>
        </div>
      )}
    </RenderVerticalList>
  );
};

export default FlightSearchResult;
