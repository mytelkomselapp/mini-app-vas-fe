import * as React from "react";

interface Props {
  text?: string;
  textColor?: string;
  bgColor?: string;
  borderColor?: string;
  onClick?: (value: string) => void;
}

const Chips: React.FC<Props> = ({
  text,
  textColor,
  bgColor,
  borderColor,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick?.(text ?? "")}
      style={{
        color: textColor ?? "var(--chips-text-color)",
        backgroundColor: bgColor ?? "var(--chips-background-color)",
        border: `1px solid ${borderColor ?? "var(--chips-border-color)"}`,
      }}
      className="w-auto p-[8px] px-[12px] rounded-[20px] text-xs"
    >
      {text ?? "-"}
    </div>
  );
};

export default Chips;
