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
      style={{
        border: "1px solid #dae0e9",
      }}
      className={classNames(
        "w-full flex gap-x-2 justify-between items-center border border-[] rounded-[30px] py-[8px] px-[12px] bg-white h-[2rem]",
        className
      )}
    >
      <Show when={isLoading}>
        <div className="flex justify-center items-center h-screen">
          <div className="w-4 h-4 border-4 border-red-500 border-solid border-t-transparent rounded-full animate-spin"></div>
        </div>
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
          "w-[90%] h-[1.2rem] bg-white text-xs text-[#001A41] font-medium",
          style["input"],
          classNameInput
        )}
        // @ts-ignore
        placeholderStyle="color: #757F90;"
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
