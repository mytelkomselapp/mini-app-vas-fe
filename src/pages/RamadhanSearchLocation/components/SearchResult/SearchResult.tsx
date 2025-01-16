import * as React from "react";
import { RamadhanSearchLocationProps } from "../../../../network/types/response-props";
import RenderVerticalList from "../../../../components/RenderVerticalList/RenderVerticalList";

export interface Props {
  data: RamadhanSearchLocationProps[];
  onSelect: (data: RamadhanSearchLocationProps) => void;
}

const SearchResult: React.FC<Props> = ({ data = [], onSelect }) => {
  const isEmpty = data?.length <= 0;

  const handleSelect = (data: RamadhanSearchLocationProps) => {
    onSelect?.(data);
  };

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
          <p className="text-[#757F90] text-[12px]">{item?.address ?? "-"}</p>
        </div>
      )}
    </RenderVerticalList>
  );
};

export default SearchResult;
