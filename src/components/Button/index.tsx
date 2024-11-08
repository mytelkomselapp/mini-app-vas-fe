// src/components/Button.tsx
import { cn } from "../../lib/utils";
import React from "react";
import ChevronRight from "../../assets/chevron-right-white.svg";
import ChevronRightRed from "../../assets/chevron-right-red.svg";

type ButtonStyle = "primary" | "secondary";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  style?: ButtonStyle;
  isUseArrowIcon?: boolean;
}

const getButtonStyle = (style: string): string => {
  const base =
    "!min-h-[48px] font-normal !py-[8px] px-[16px] !w-full focus:outline-none rounded-[40px] font-sans ";
  switch (style) {
    case "primary":
      return base + "bg-solidRed text-white";
    case "secondary":
      return base + "bg-white text-solidRed border border-solidRed";
    case "disabled":
      return (
        base +
        "bg-[#DAE0E9] text-[#9CA9B9] hover:bg-[#DAE0E9] focus:outline-none"
      );
    default:
      return base;
  }
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  disabled,
  style = "primary",
  isUseArrowIcon = false,
}) => {
  return (
    <button
      onClick={!disabled ? onClick : () => {}}
      className={cn(
        disabled ? getButtonStyle("disabled") : getButtonStyle(style),
        className,
        "justify-center items-center flex text-base font-sans"
      )}
    >
      {label}
      {isUseArrowIcon ? (
        style === "secondary" ? (
          // <img src={ChevronRightRed} />
          <></>
        ) : (
          // <img src={ChevronRight} />
          <></>
        )
      ) : (
        <></>
      )}
    </button>
  );
};

export default Button;
