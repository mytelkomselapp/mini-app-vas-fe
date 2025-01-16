// src/components/Button.tsx
import { cn } from "../../lib/utils";
import React from "react";

type ButtonStyle = "primary" | "secondary";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  style?: ButtonStyle;
  isUseArrowIcon?: boolean;
  icon?: React.ReactNode;
}

const getButtonStyle = (style: string): string => {
  const base =
    "min-h-[48px] font-normal py-[8px] px-[16px] !w-full focus:outline-none rounded-[40px] font-sans ";
  switch (style) {
    case "primary":
      return base + "!bg-[#ED0226] !text-[#FFFFFF]";
    case "secondary":
      return (
        base +
        "bg-[#FFFFFF] text-[#ED0226] border-solid border border-[#ED0226]"
      );
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
  icon,
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
      {icon ? icon : null}
    </button>
  );
};

export default Button;
