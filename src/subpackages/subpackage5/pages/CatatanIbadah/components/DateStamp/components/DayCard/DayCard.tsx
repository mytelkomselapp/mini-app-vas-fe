import * as React from "react";
import CircularProgress from "../CircularProgress";

export interface DayCardProps {
  isToday: boolean;
  isActive: boolean;
  onClick: () => void;
  percentage: number;
  day: number;
}

const DayCard: React.FC<DayCardProps> = ({
  isToday,
  isActive,
  onClick,
  percentage,
  day,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-center items-center mb-[6px]"
    >
      <CircularProgress
        isActive={isActive}
        progress={percentage}
        number={day}
        isToday={isToday}
      />
    </div>
  );
};

export default DayCard;
