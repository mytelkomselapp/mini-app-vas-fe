import FlightIcon from "../../assets/garuda.svg";
import ArrowRight from "../../assets/chevron-right-16px.svg";
import { cn, flightStateAttribute } from "../../lib/utils";

const DUMMY_STATS = "schedule";

interface Props {
  className?: string;
}

const FlightActivityCard: React.FC<Props> = ({ className }) => {
  const { className: classNameStats, label } =
    flightStateAttribute(DUMMY_STATS);
  return (
    <div
      className={cn(
        "rounded-2xl border-dividerGrey border-[1px] min-w-[288px] bg-white",
        className
      )}
    >
      <div className="p-[16px]">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <span className="font-semibold text-sm">{"14 SEP 2024"}</span>
          </div>
          <div className="flex flex-col">
            <p
              className={cn(
                "px-3 py-1 m-auto w-fit  rounded-[120px] text-[10px]/[14px] text-[#0452ad] font-semibold first-letter:uppercase",
                classNameStats
              )}
            >
              {label}
            </p>
          </div>
        </div>
        <div className="flex mt-2">
          <div className="flex flex-col w-[30vw]">
            <span className="font-semibold text-base">{"T3 CGK"}</span>
            <span className="text-xs">{"14:00"}</span>
          </div>
          <div className="flex flex-col w-[30vw]">
            <p
              className={
                "flex flex-row gap-1 items-center px-2 py-1 m-auto w-fit  rounded-[120px] font-semibold uppercase bg-grey bg-opacity-25 text-[10px]"
              }
            >
              <img src={FlightIcon} />
              {"ga147"}
            </p>

            <div className="flex flex-row items-center justify-center gap-1">
              <span className="text-grey text-xs">{"Direct"}</span>
              <span className="text-grey text-base">{"•"}</span>
              <span className="text-grey text-xs">{"1h 50m"}</span>
            </div>
          </div>
          <div className="flex flex-col w-[30vw]">
            <span className="font-semibold text-base text-right">
              {"T1 SIN"}
            </span>
            <span className="text-xs text-right">{"15:10"}</span>
          </div>
        </div>
        <div className="bg-inactiveGrey flex w-full px-4 py-2 mt-2 rounded-lg justify-between">
          <div className="flex flex-col">
            <span className="text-xs">{"Check-in Counter"}</span>
            <span className="text-xs font-semibold">{"G01-G02"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-right">{"Boarding Gate"}</span>
            <span className="text-xs font-semibold text-right">{"C22"}</span>
          </div>
        </div>
        <div className="border-dashed border-t-2 border-dividerGrey my-[12px]" />
        <div className="flex flex-row items-center">
          <div className="gap-1 flex">
            <span className="text-grey text-xs">{"KODE BOOKING"}</span>
            <span className="text-textError text-xs font-semibold">
              {"JNCYF12"}
            </span>
          </div>
          <div className="ml-auto justify-end flex flex-row items-center gap-1">
            <span className="text-xs">{"Lihat E-Tiket"}</span>
            <img src={ArrowRight} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FlightActivityCard;
