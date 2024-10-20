import * as React from "react";
import ChipsFilter from "./components/Chips/Chips";

export interface FilterButtonOptionsProps {
  content: string | React.ReactNode;
  value: string;
  isActiveHighlighted: boolean;
}
export interface FilterButtonProps {
  data: FilterButtonOptionsProps[];
  onClick: (value: string) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ data = [], onClick }) => {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const handleClick = (index: number, value: string) => {
    setActiveIndex(index);
    onClick?.(value);
  };

  return (
    <div className="flex overflow-auto mb-[6px] gap-x-[8px] pr-[16px] no-scrollbar">
      {data?.map((opt, idx) => (
        <ChipsFilter
          index={idx}
          onClick={handleClick}
          key={idx}
          isActive={activeIndex === idx}
          {...opt}
        />
      ))}
    </div>
  );
};

export default FilterButton;
