import {
  getCurrentDate,
  getCurrentDayRamadhan,
  getCurrentWeekRamadhan,
} from "../lib/utils";
import React from "react";

export interface WeeklyBannerSummaryData {
  visible: boolean;
  currentWeek: number;
}

const useWeeklyBannerSummary = (): WeeklyBannerSummaryData => {
  const currentDate = getCurrentDate();
  const currentWeek = getCurrentWeekRamadhan(
    getCurrentDayRamadhan() as string
  ) as number;

  return {
    visible: [8, 15, 22, 29]?.includes(currentDate),
    currentWeek: currentWeek - 1,
  };
};

export default useWeeklyBannerSummary;
