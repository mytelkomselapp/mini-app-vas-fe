import * as React from "react";
import DropdownItem from "../DropdownItem";
import RenderVerticalList from "../../components/RenderVerticalList";

export interface AutoCompleteDropdownOptionProps {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}

export interface AutoCompleteDropdownProps {
  show: boolean;
  options: AutoCompleteDropdownOptionProps[];
  onSelect: (data: AutoCompleteDropdownOptionProps) => void;
}

const Dropwdown: React.FC<AutoCompleteDropdownProps> = ({
  show,
  options = [],
  onSelect,
}) => {
  if (!show) return;

  return (
    <RenderVerticalList
      keyIndex="title"
      data={options}
      pageSize={5}
      containerClassName="absolute w-[92%] max-w-[390px] z-10 top-[120px] rounded-[12px] bg-white shadow-lg max-h-[200px] py-[8px] px-[12px] overflow-y-scroll"
    >
      {(item, index) => (
        <DropdownItem key={index} {...item} onSelect={onSelect} />
      )}
    </RenderVerticalList>
  );
};

export default Dropwdown;
