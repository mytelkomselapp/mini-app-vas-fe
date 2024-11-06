import * as React from "react";
import IconDelete from "../../assets/ico-delete.svg";
import { AutoCompleteDropdownOptionProps } from "../../components/AutocompleteInput/components/Dropdown/Dropdown";
import Chips from "../../components/Chips";

export interface TravelHistoryProps {
  data: AutoCompleteDropdownOptionProps[];
  show: boolean;
  onRemove: () => void;
  onSelect: (data: AutoCompleteDropdownOptionProps) => void;
}

const TravelSearchHistory: React.FC<TravelHistoryProps> = ({
  show = false,
  data,
  onRemove,
  onSelect,
}) => {
  if (!show) return;

  const handleSelect = (item: AutoCompleteDropdownOptionProps) => {
    onSelect(item);
  };

  return (
    <div className="flex flex-col my-[16px] px-[16px]">
      <div className="flex justify-between items-center">
        <h1 className="text-[16px] font-normal">Pencarian Terakhir</h1>
        <img src={IconDelete} onClick={onRemove} />
      </div>

      <div className="flex flex-wrap gap-2 mt-[8px]">
        {data?.map((item, idx) => (
          <Chips
            key={idx}
            text={item?.title}
            onClick={() => handleSelect(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default TravelSearchHistory;
