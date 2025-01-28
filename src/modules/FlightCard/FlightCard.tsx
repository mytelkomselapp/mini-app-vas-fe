import FlightIcon from "../../assets/mosque.svg";
import ArrowRight from "../../assets/chevron-right-16px.svg";
import travelokaImg from "../../assets/traveloka-squared.png";
import { cn } from "../../lib/utils";

interface Props {
  className?: string;
  isCheapest?: boolean;
  onClick?: () => void;
}

const FlightCard: React.FC<Props> = ({
  className,
  isCheapest = false,
  onClick,
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl border-dividerGrey border-[1px] min-w-[288px] bg-white",
        className
      )}
      onClick={onClick}
    >
      {isCheapest && (
        <div className="text-successGreen bg-successGreen bg-opacity-10 rounded-b-lg w-min ml-3 text-xs px-2 py-1">
          Termurah
        </div>
      )}
      <div className="p-3 ">
        <div className="flex flex-row gap-2">
          <img src={FlightIcon} className="h-6" />
          <span className="text-xs">Garuda Indonesia</span>
        </div>
        <div className="flex justify-between mt-2">
          <div className="flex flex-col">
            <span className="font-semibold text-sm">{"08:20 - 10:30"}</span>
            <span className="text-grey text-xs">{"CGK T1A - SIN 1"}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">{"Direct"}</span>
            <span className="text-grey text-xs">{"2h 10m"}</span>
          </div>
        </div>
        <div className="flex justify-between mt-[11px] items-center">
          <div className="flex flex-row items-center">
            <span className="font-semibold text-sm">{"Rp1.989.000"}</span>
            <span className="text-grey text-[10px]">{"/orang"}</span>
          </div>
          <div className="flex flex-row items-center">
            <div className="bg-[#1BA0E2] rounded-[4px] p-1">
              <img src={travelokaImg} className="w-4 h-4" alt="traveloka" />
            </div>

            <img src={ArrowRight} className="ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FlightCard;
