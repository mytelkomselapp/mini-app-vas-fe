import * as React from "react";
import style from "./InputComponent.module.css";
import MagnifyingGlassIcon from "../../../../assets/magnifying-glass.svg";
import FailedFilledIcon from "../../../../assets/ico-failed-filled.svg";
import { cn as classNames } from "../../../../lib/utils";
import Show from "../../../../components/Show";

interface Props {
  isLoading: boolean;
  value: string;
  onTyping?: (isTyping: boolean) => void;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  classNameInput?: string;
  isShowClearButton?: boolean;
}

const InputComponent: React.FC<Props> = ({
  isLoading = false,
  value = "",
  onTyping,
  onChange,
  placeholder,
  className,
  classNameInput,
  isShowClearButton = true,
}) => {
  const handleChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value ?? "";
    if (/[0-9]/g.test(value)) {
      return;
    }

    onTyping?.(true);
    onChange?.(value);
  };

  const handleResetValue = () => {
    onChange?.("");
  };

  return (
    <div
      className={classNames(
        "w-full flex gap-x-2 justify-between items-center rounded-[20px] py-[8px] px-[12px] bg-inputGroup h-[2rem]",
        style["container"],
        className
      )}
    >
      <Show when={isLoading}>
        <span className={style["loader"]} />
      </Show>
      <Show when={!isLoading}>
        <img
          src={MagnifyingGlassIcon}
          alt="magnifying-glass"
          style={{ height: "1rem", width: "1rem" }}
        />
      </Show>
      <input
        value={value}
        placeholder={placeholder}
        onChange={handleChangeKeyword}
        type="text"
        className={classNames(
          "w-[75%] h-[1.2rem] bg-inputGroup text-xs text-[#001A41] font-medium",
          style["input"],
          classNameInput
        )}
      />
      {isShowClearButton && (
        <img
          src={FailedFilledIcon}
          onClick={handleResetValue}
          style={{ height: "1rem", width: "1rem" }}
        />
      )}
    </div>
  );
};

export default InputComponent;
