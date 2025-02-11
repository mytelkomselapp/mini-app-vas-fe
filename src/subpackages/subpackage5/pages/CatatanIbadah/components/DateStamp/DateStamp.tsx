import * as React from "react";
import Show from "../../../../../../components/Show";
import { View } from "@tarojs/components";
import ChevronLeft from "../../../../../../assets/chevron-left.svg";
import ChevronRight from "../../../../../../assets/chevron-right.svg";
import {
  generateCalendarByMonth,
  getCurrentDayRamadhan,
} from "../../../../../../lib/utils";
import moment, { Moment } from "moment";
import DayCard from "./components/DayCard";
import { useDataCatatanIbadah } from "../../../../../../store/ramadhan";
import { StampMissionSummaryData } from "../../../../../..//network/types/response-props";

export interface DateStampProps {
  dataMissionSummary: StampMissionSummaryData[];
}

const DateStamp: React.FC<DateStampProps> = ({ dataMissionSummary = [] }) => {
  const {
    currentDay,
    currentView,
    currentWeek,
    setCurrentDay,
    setCurrentView,
    setCurrentWeek,
  } = useDataCatatanIbadah();

  const listOfDay = generateCalendarByMonth(moment());
  const currentDayMoment = getCurrentDayRamadhan();

  /** get data of march  */
  const dataMarch = [...listOfDay]?.filter((data) =>
    moment(data)?.isSame(currentDay, "month")
  );

  const dayOfWeek = React.useMemo(() => {
    /** why -1 because week 1 must start from zero */
    const startWeek = 7 * (currentWeek - 1);

    return dataMarch?.splice(startWeek, 7);
  }, [currentWeek, listOfDay]);

  const handleClickDate = (d: Moment) => {
    if (d.isBefore(currentDay, "month")) return;

    setCurrentDay(moment(d)?.format("YYYY-MM-DD"));
  };

  const handleNext = () => {
    if (currentWeek >= 5) return;
    setCurrentWeek(currentWeek + 1);
  };

  const handlePrev = () => {
    if (currentWeek <= 1) return;
    setCurrentWeek(currentWeek - 1);
  };

  const toggleView = () => {
    setCurrentView(currentView === "all" ? "weekly" : "all");
  };

  const renderChevron = (
    type: "next" | "prev",
    isDisabled: boolean = false
  ) => {
    const Chevron = type === "next" ? ChevronRight : ChevronLeft;
    const Action = type === "next" ? handleNext : handlePrev;

    return (
      <img
        width="24px"
        height="24px"
        onClick={Action}
        src={Chevron}
        className={`cursor-pointer ${isDisabled ? "opacity-40" : ""}`}
      />
    );
  };

  return (
    <View
      style={{ borderBottom: "1px solid #eff14" }}
      className="pt-[20px] px-[20px]"
    >
      <div className="flex justify-between items-center">
        {/* Weekly Header */}
        <Show when={currentView === "weekly"}>
          <div className="flex items-center gap-x-[8px]">
            {renderChevron("prev", currentWeek <= 1)}
            <p className="text-[16px] text-black font-bold">
              Minggu Ke-{currentWeek}
            </p>
            {renderChevron("next", currentWeek >= 5)}
          </div>
          <p
            onClick={toggleView}
            className="text-[12px] text-[#757F90] cursor-pointer"
          >
            Lihat Semua
          </p>
        </Show>

        <Show when={currentView === "all"}>
          <p className="text-[16px] text-black font-bold">Bulan Ramadhan</p>

          <p
            onClick={toggleView}
            className="text-[12px] text-[#757F90] cursor-pointer"
          >
            Lihat Mingguan
          </p>
        </Show>
      </div>

      <Show when={currentView === "weekly"}>
        <div className="my-[16px] w-full h-auto">
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}
          >
            {dayOfWeek.map((d: Moment, i: number) => {
              const theDay = moment(d)?.format("YYYY-MM-DD");
              const percentage =
                dataMissionSummary?.find((data) =>
                  moment(theDay)?.isSame(data?.date, "date")
                )?.percentage_of_mission || 0;

              console.log({ theDay, percentage });

              return (
                <DayCard
                  key={i}
                  isToday={d.isSame(moment(currentDayMoment), "day")}
                  isActive={d.isSame(moment(currentDay), "day")}
                  onClick={() => {
                    handleClickDate(d);
                  }}
                  percentage={percentage}
                  day={d.date()}
                />
              );
            })}
          </div>
        </div>
      </Show>

      <Show when={currentView === "all"}>
        <div className="my-[16px] w-full h-auto">
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)" }}
          >
            {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((d) => (
              <div
                key={d}
                className="text-[14px] text-[#757f90] text-center mb-[8px]"
              >
                {d}
              </div>
            ))}
            {listOfDay.map((d: Moment, i: number) => {
              const isSameMonth = moment(d)?.isSame("2025-02-01", "month");
              const theDay = moment(d)?.format("YYYY-MM-DD");
              const percentage =
                dataMissionSummary?.find((data) =>
                  moment(theDay)?.isSame(data?.date)
                )?.percentage_of_mission || 0;

              if (!isSameMonth) return <div></div>;

              return (
                <DayCard
                  key={i}
                  isToday={d.isSame(moment(currentDayMoment), "day")}
                  isActive={d.isSame(moment(currentDay), "day")}
                  onClick={() => {
                    handleClickDate(d);
                  }}
                  percentage={percentage}
                  day={d.date()}
                />
              );
            })}
          </div>
        </div>
      </Show>
    </View>
  );
};

export default DateStamp;
