import * as React from "react";

export interface ChipsFilterProps {
  isActive: boolean;
  content: string | React.ReactNode;
  value: string;
  onClick: (index: number, value: string) => void;
  isActiveHighlighted: boolean;
  index: number;
}

const ChipsFilter: React.FC<ChipsFilterProps> = ({
  isActive = false,
  content,
  value,
  isActiveHighlighted = true,
  index = 0,
  onClick,
}) => {
  const className =
    isActive && isActiveHighlighted
      ? "rounded-[38px] px-[16px] py-[6px] bg-[#001A41] text-white text-[12px]"
      : "rounded-[38px] px-[16px] py-[6px] bg-[] border-b-[1px] border-b-[#DAE0E9] text-primary text-[12px]rounded-[38px] px-[16px] py-[6px] bg-white border-b-[1px] border-b-[#DAE0E9] text-primary text-[12px]";

  const handleClick = () => {
    onClick?.(index, value);
  };

  return (
    <button onClick={handleClick} className={className}>
      {content}
    </button>
  );
};

export default ChipsFilter;
