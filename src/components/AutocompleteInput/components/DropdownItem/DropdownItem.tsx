import * as React from "react";
import { AutoCompleteDropdownOptionProps } from "../Dropdown/Dropdown";

interface DropDownItemProps extends AutoCompleteDropdownOptionProps {
  onSelect: (data: AutoCompleteDropdownOptionProps) => void;
}

const DropdownItem: React.FC<DropDownItemProps> = ({
  onSelect,
  icon,
  subtitle,
  title,
}) => {
  const handleClick = () => {
    onSelect?.({
      icon,
      subtitle,
      title,
    });
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-row justify-start items-center p-[8px] gap-[12px] cursor-pointer"
    >
      <div className="w-[24px] h-[24px] bg-red-500 rounded-full" />
      <div className="flex flex-col justify-between">
        <p className="text-[12px]">{title ?? "-"}</p>
        <p className="text-[12px] text-textSecondary">{subtitle ?? "-"}</p>
      </div>
    </div>
  );
};

export default DropdownItem;
