import * as React from "react";

interface Chips {
  value: number;
  label: string;
}

export interface ChipsProps {
  chips: Chips[];
  activeTab: number;
  onClick: (value: number) => void;
}

const Chips: React.FC<ChipsProps> = ({ chips = [], onClick, activeTab }) => {
  const handleClick = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const { value } = event?.currentTarget?.dataset;

    onClick?.(Number(value ?? 0));
  };

  return (
    <React.Fragment>
      <div className="flex justify-start gap-x-[8px] mt-[18px] mb-[12px]">
        {chips?.map((data, idx) => {
          const isActive = activeTab === idx;
          const badgeClassName = isActive
            ? "cursor-pointer rounded-[38px] py-[8px] px-[12px] bg-[#001A41] text-white text-[12px]"
            : "cursor-pointer rounded-[38px] py-[8px] px-[12px] bg-[#fffff] border-[1px] border-[#DAE0E9] text-[12px]";

          return (
            <div
              data-value={data?.value}
              key={idx}
              onClick={handleClick}
              className={badgeClassName}
            >
              {data?.label}
            </div>
          );
        })}
      </div>
      <div className="w-[100%] h-[1px] bg-[#DAE0E9] mb-[12px]" />
    </React.Fragment>
  );
};

export default Chips;
