import * as React from "react";
import style from "./AutocompleteInput.module.css";
import MagnifyingGlassIcon from "../../assets/magnifying-glass.svg";
import { cn as classNames } from "../../lib/utils";
import Show from "../../components/Show";
import Dropdown from "./components/Dropdown";
import { AutoCompleteDropdownOptionProps } from "./components/Dropdown/Dropdown";
import useToggle from "../../hooks/useToggle";

interface Props {
  isLoading: boolean;
  value: string;
  onTyping?: (isTyping: boolean) => void;
  onChange?: (value: string) => void;
  onSelect?: (data: AutoCompleteDropdownOptionProps) => void;
  placeholder?: string;
  className?: string;
  classNameInput?: string;
  isShowClearButton?: boolean;
  options: AutoCompleteDropdownOptionProps[];
}

const AutoCompleteInput: React.FC<Props> = ({
  isLoading = false,
  value = "",
  onTyping,
  onChange,
  onSelect,
  placeholder,
  className,
  classNameInput,
  options = [],
}) => {
  const { active: isFocus, setActive: toggleIsFocus } = useToggle();

  const handleChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value ?? "";
    if (/[0-9]/g.test(value)) {
      return;
    }

    onTyping?.(true);
    onChange?.(value);
  };

  const isShowDropdown = isFocus && options?.length > 0 && value?.length > 0;

  const handleSelect = (data: AutoCompleteDropdownOptionProps) => {
    onSelect?.(data);
    toggleIsFocus(false);
  };

  const handleFocus = () => {
    toggleIsFocus(true);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div
        className={classNames(
          "w-full flex gap-x-2 justify-between items-center rounded-[20px] py-[8px] px-[12px] bg-inputGroup",
          style["container"],
          className
        )}
      >
        <input
          value={value}
          placeholder={placeholder}
          onChange={handleChangeKeyword}
          type="text"
          onFocus={handleFocus}
          className={classNames(
            "w-[80%] h-[25px] bg-inputGroup text-xs text-[#001A41] font-medium",
            style["input"],
            classNameInput
          )}
        />
        <Show when={isLoading}>
          <span className={style["loader"]} />
        </Show>
        <Show when={!isLoading}>
          <img src={MagnifyingGlassIcon} />
        </Show>
      </div>
      <Dropdown
        show={isShowDropdown}
        onSelect={handleSelect}
        options={options}
      />
    </div>
  );
};

export default AutoCompleteInput;
