import React from "react";
import AutoCompleteInput from "../../components/AutocompleteInput/AutocompleteInput";
import { AutoCompleteDropdownOptionProps } from "../../components/AutocompleteInput/components/Dropdown/Dropdown";

interface SearchDestinationProps {
  isArrival: boolean;
  keyword: string;
  optionsData: AutoCompleteDropdownOptionProps[];
  isLoading: boolean;
  handleChangeKeyword: (value: string) => void;
  setIsTyping: (isTyping: boolean) => void;
  handleSelect: (data: AutoCompleteDropdownOptionProps) => void;
}

const SearchDestination: React.FC<SearchDestinationProps> = ({
  isArrival,
  keyword,
  optionsData,
  isLoading,
  handleChangeKeyword,
  setIsTyping,
  handleSelect,
}) => {
  return (
    <div className="px-6 pt-3 min-h-96">
      <div className="flex justify-center pb-4">
        <span className="text-base font-bold">
          {isArrival
            ? "Mau kemana kamu jalan-jalan?"
            : "Dari mana kamu mau jalan-jalan?"}
        </span>
      </div>
      <div className="mt-3">
        <p className="text-xs text-textSecondary">Cari Kota atau Bandara</p>
        <AutoCompleteInput
          className="rounded-lg bg-transparent"
          classNameInput="bg-transparent"
          options={optionsData}
          isLoading={isLoading}
          value={keyword}
          onChange={handleChangeKeyword}
          onTyping={setIsTyping}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
};

export default SearchDestination;
