import { CMSFlightLandingPopularCitiesSection } from "../../network/types/response-props";
import * as React from "react";

export interface RecommendationCitiesProps {
  data: CMSFlightLandingPopularCitiesSection[];
  onClick: (city: string, cityId: string) => void;
}

const RecommendationCities: React.FC<RecommendationCitiesProps> = ({
  data = [],
  onClick,
}) => {
  const handleClick = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const { city, cityid } = event?.currentTarget?.dataset;

    onClick?.(city as string, cityid as string);
  };

  return (
    <div className="grid grid-cols-4 gap-x-[8px] gap-y-[12px]">
      {data?.map((cities, idx) => {
        const isBiggerCard = [0, 4]?.includes(idx);
        const className = isBiggerCard
          ? "flex cursor-pointer items-end p-[16px] rounded-[16px] bg-gradient-to-b from-slate-200 to-red-200 row-span-2 col-span-2 h-[184px]"
          : "flex cursor-pointer items-end p-[16px] rounded-[16px] bg-gradient-to-b from-slate-200 to-red-200 col-span-2";

        return (
          <div
            data-city={cities?.cityName}
            data-cityid={cities?.id}
            className={className}
            onClick={handleClick}
          >
            {cities?.cityName}
          </div>
        );
      })}
    </div>
  );
};

export default RecommendationCities;
