import * as React from "react";

export interface SeatMapProps {
  column_left: number;
  column_right: number;
  row: number;
}

export const SeatMap: React.FC<SeatMapProps> = ({
  column_left = 0,
  column_right = 0,
  row = 0,
}) => {
  return (
    <div className="w-[100%] flex justify-center">
      <div className="p-[16px] gap-[12px] border-[1px] border-[#DAE0E9] rounded-[18px]">
        <p className="text-[12px] text-[#757F90] text-center pb-[16px]">
          Contoh Layout Kursi
        </p>

        <div className="flex justify-around gap-x-[12px] gap-y-[4px]">
          <div className="flex flex-col gap-y-[4px]">
            {Array(row)
              .fill(null)
              ?.map((_, idx) => (
                <div className="flex gap-x-[4px]" key={idx}>
                  {Array(column_left)
                    ?.fill(null)
                    ?.map((_, idx) => (
                      <div
                        className="bg-[#FF0025] w-[12px] h-[12px]"
                        key={idx}
                      />
                    ))}
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-y-[4px]">
            {Array(row)
              .fill(null)
              ?.map((_, idx) => (
                <div className="flex gap-x-[4px]" key={idx}>
                  {Array(column_right)
                    ?.fill(null)
                    ?.map((_, idx) => (
                      <div
                        className="bg-[#FF0025] w-[12px] h-[12px]"
                        key={idx}
                      />
                    ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
