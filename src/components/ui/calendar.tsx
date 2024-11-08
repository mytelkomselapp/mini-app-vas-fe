import React, { useState } from "react";
import { View, Text } from "@tarojs/components";
import moment, { Moment } from "moment";
import ChevronLeft from "../../assets/chevron-left.svg";
import ChevronRight from "../../assets/chevron-right.svg";
import "./calendar.scss";

interface Props {
  onSelect: (value: any) => void;
}

const Calendar: React.FC<Props> = ({ onSelect }) => {
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);

  const today = moment(); // Store the current date to compare against

  const startOfMonth: Moment = currentDate.clone().startOf("month");
  const endOfMonth: Moment = currentDate.clone().endOf("month");
  const daysInMonth: number = currentDate.daysInMonth();
  const startDayOfWeek: number = startOfMonth.day();

  const previousMonthDays = startOfMonth
    .clone()
    .subtract(1, "month")
    .daysInMonth();
  const nextMonthDayCount = 6 - endOfMonth.day();

  // Handlers for changing month
  const handlePrevMonth = (): void => {
    if (!currentDate.isSame(today, "month")) {
      // Disable if current month is the same as today's month
      setCurrentDate(currentDate.clone().subtract(1, "month"));
    }
  };

  const handleNextMonth = (): void => {
    setCurrentDate(currentDate.clone().add(1, "month"));
  };

  // Generate days grid for the calendar
  const renderDays = (): JSX.Element[] => {
    const days: JSX.Element[] = [];

    // Add days from the previous month to fill the grid before the start of this month
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(
        <View className="calendar-day out-of-month" key={`prev-${i}`}>
          {previousMonthDays - startDayOfWeek + i + 1}
        </View>
      );
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = currentDate.clone().date(day);
      const isPastDate = date.isBefore(today, "day"); // Check if date is in the past
      const isSelected = selectedDate?.isSame(date, "day");
      const dayClass = isSelected ? "calendar-day selected" : "calendar-day";

      days.push(
        <View
          className={`${dayClass} ${isPastDate ? "disabled" : ""}`}
          key={day}
          onClick={() => !isPastDate && handleDateSelect(day)} // Disable click on past dates
        >
          {day}
        </View>
      );
    }

    // Add days from the next month to fill the grid after the end of this month
    for (let i = 1; i <= nextMonthDayCount; i++) {
      days.push(
        <View className="calendar-day out-of-month" key={`next-${i}`}>
          {i}
        </View>
      );
    }

    return days;
  };

  const handleDateSelect = (day: number): void => {
    const selectedDateVal = currentDate.clone().date(day);
    setSelectedDate(selectedDateVal);
    onSelect(selectedDateVal);
  };

  return (
    <View className="calendar-picker">
      <View className="flex justify-center mb-4">
        <Text className="text-sm font-semibold">{"Pilih Tanggal"}</Text>
      </View>

      <View className="calendar-header">
        <img
          onClick={handlePrevMonth}
          src={ChevronLeft}
          id={"calendar-left"}
          className={`h-4 w-4 ${
            currentDate.isSame(today, "month") ? "disabled" : ""
          }`} // Apply 'disabled' class if in the current month
        />
        <Text className="text-sm font-semibold">
          {currentDate.format("MMMM YYYY")}
        </Text>
        <img onClick={handleNextMonth} src={ChevronRight} className="h-4 w-4" />
      </View>
      <View className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <Text className="calendar-day-name" key={day}>
            {day}
          </Text>
        ))}
        {renderDays()}
      </View>
    </View>
  );
};

export default Calendar;
