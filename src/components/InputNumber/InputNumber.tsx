import * as React from "react";
import { NumericFormat, NumberFormatValues } from "react-number-format";

export interface InputNumberProps {
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  value: number | undefined;
  onChange: (value: number | undefined) => void;
}

const InputNumber: React.FC<InputNumberProps> = ({
  placeholder = "",
  disabled = false,
  maxLength = 12,
  value,
  onChange,
}) => {
  const handleChangeValueNumber = (value: NumberFormatValues) => {
    const floatValues = value?.floatValue;

    onChange?.(floatValues);
  };

  return (
    <NumericFormat
      pattern="\d*"
      placeholder={placeholder}
      className="outline:none w-full bg-white border-[1px] text-[12px] px-[16px] py-[13px] border-[#DAE0E9] rounded-[12px]"
      disabled={disabled}
      maxLength={maxLength}
      thousandSeparator
      value={value}
      allowLeadingZeros
      onValueChange={handleChangeValueNumber}
      prefix="Rp"
    />
  );
};

export default InputNumber;
