import InputNumber from "../../components/InputNumber";
import { useTravelFilterFlightData } from "../../store/travel";
import * as React from "react";

export interface PriceRangeFilterProps {
  show: boolean;
}

const PriceRange: React.FC<PriceRangeFilterProps> = ({ show = true }) => {
  if (!show) return null;

  const { priceRange, setPriceRange } = useTravelFilterFlightData();

  const handleChangeStartPrice = (value: number | undefined) => {
    setPriceRange({ ...priceRange, startPrice: value });
  };

  const handleChangeEndPrice = (value: number | undefined) => {
    setPriceRange({ ...priceRange, endPrice: value });
  };

  return (
    <div className="flex flex-col gap-[12px] px-[16px] pb-[16px] border-b-[1px] border-b-dividerGrey">
      <h1 className="text-[14px] font-[600] text-primary">Rentang Harga</h1>
      <div className="flex justify-between gap-x-[16px]">
        <div className="flex flex-col justify-between gap-[8px]">
          <p className="text-[12px] text-textSecondary">Mulai</p>
          <InputNumber
            value={priceRange?.startPrice}
            placeholder="Masukkan Harga"
            onChange={handleChangeStartPrice}
          />
        </div>
        <div className="relative top-[50px]">
          <svg
            width="26"
            height="1"
            viewBox="0 0 26 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="0.5" y1="0.5" x2="25.5" y2="0.5" stroke="#DAE0E9" />
          </svg>
        </div>

        <div className="flex flex-col justify-between gap-[8px]">
          <p className="text-[12px] text-textSecondary">Hingga</p>
          <InputNumber
            value={priceRange?.endPrice}
            placeholder="Masukkan Harga"
            onChange={handleChangeEndPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
