// src/components/InputField.tsx
import { Input } from "@tarojs/components";
import React from "react";

interface InputFieldProps {
  placeholder: string;
  icon?: JSX.Element;
  type?: string;
  width?: string;
  parentClassName?: string;
  onFocus?(): any;
  value?: string | number;
  id: string;
  onClick?(): any;
  onChange?(): any;
  caretColor?: string;
  autoComplete?: "on" | "off";
  readOnly?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  icon,
  type = "text",
  width = "w-full",
  parentClassName,
  onFocus,
  value,
  onChange,
  id,
  onClick,
  caretColor = "caret-inherit",
  autoComplete = "on",
  readOnly = false,
}) => {
  return (
    <div className={parentClassName}>
      <div className="relative">
        <input
          id={id}
          onClick={onClick}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          onFocus={onFocus}
          autoComplete={autoComplete}
          readOnly={readOnly}
          placeholderStyle="color: #757F90;"
          className={`${width} rounded-lg focus:outline-none  focus:ring-blue-400 text-xs text-primaryBlack placeholder-grey border-transparent focus:border-transparent focus:ring-0 ${caretColor}`}
        />
        {icon && <div className="absolute top-2 right-3">{icon}</div>}
      </div>
    </div>
  );
};

export default InputField;
