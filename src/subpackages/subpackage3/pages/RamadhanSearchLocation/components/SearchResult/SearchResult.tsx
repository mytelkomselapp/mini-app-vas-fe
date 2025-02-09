import * as React from "react";
import { RamadhanSearchLocationProps } from "../../../../../../network/types/response-props";
import RenderVerticalList from "../../../../../../components/RenderVerticalList/RenderVerticalList";
import RedPinLocation from "../../../../../../assets/red-pin-location.svg";
import AsSVG from "../../../../../../components/Svg/Svg";

export interface Props {
  data: RamadhanSearchLocationProps[];
  itemHistory?: RamadhanSearchLocationProps;
  onSelect: (data: RamadhanSearchLocationProps) => void;
  type: "list" | "history";
}

const SearchResult: React.FC<Props> = ({
  data = [],
  onSelect,
  itemHistory,
  type = "list",
}) => {
  const isEmpty = data?.length <= 0;

  const handleSelect = (data: RamadhanSearchLocationProps) => {
    if (!data) return;

    onSelect?.(data);
  };

  const cityAddress = (data: RamadhanSearchLocationProps) => {
    if (data?.city && data?.province && data?.country) {
      return `${data?.city}, ${data?.province}, ${data?.country}`;
    }

    return "-";
  };

  if (type === "history") {
    return (
      <div
        onClick={() => handleSelect(itemHistory as RamadhanSearchLocationProps)}
        style={{
          borderBottom: "1px solid #dae0e9",
        }}
        className="flex flex-col py-[8px] px-[20px]"
      >
        <p className="text-[#181C21] text-[14px] m-[0] font-semibold flex gap-x-1">
          <AsSVG src={RedPinLocation} width="16px" height="16px" />
          {itemHistory?.city ?? "-"}
        </p>
        <p className="text-[#757F90] text-[12px]">
          {cityAddress(itemHistory as RamadhanSearchLocationProps)}
        </p>
      </div>
    );
  }

  if (isEmpty) return null;

  return (
    <RenderVerticalList
      data={data}
      keyIndex="id"
      pageSize={18}
      containerClassName="h-[82vh] px-[20px]"
    >
      {(item: RamadhanSearchLocationProps, index) => (
        <div
          onClick={() => handleSelect(item)}
          style={{
            borderBottom: "1px solid #dae0e9",
          }}
          className="flex flex-col py-[8px]"
          key={index}
        >
          <p className="text-[#181C21] text-[14px] m-[0] font-semibold">
            {item?.city ?? "-"}
          </p>
          <p className="text-[#757F90] text-[12px]">{cityAddress(item)}</p>
        </div>
      )}
    </RenderVerticalList>
  );
};

export default SearchResult;
