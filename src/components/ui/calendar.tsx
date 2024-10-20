import * as React from "react";

import { DayPicker } from "react-day-picker";

import { cn } from "../../lib/utils";
import { buttonVariants } from "../../components/ui/button";
import { id } from "date-fns/locale";
import ChevronLeft from "../../assets/chevron-left.svg";
import ChevronRight from "../../assets/chevron-right.svg";
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={id}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-semibold",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "default" }),
          "h-7 w-7 bg-transparent p-0"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full max-w-mobile-screen border-collapse space-y-1",
        head_row: "flex gap-[19px] border-t-[1px] border-shadesGrey",
        head_cell:
          "text-muted-foreground rounded-lg w-9 font-semibold text-[15px] mt-[12px]",
        row: "flex w-full gap-[19px]",
        cell: "h-10 w-9 text-center text-sm py-1 relative [&:has([aria-selected].day-range-end)]:rounded-lg first:[&:has([aria-selected])]:rounded-lg last:[&:has([aria-selected])]:rounded-lg focus-within:relative focus-within:z-20 bg-[#FFFF]",
        day: cn(
          //  buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-lg bg-[#FFFF]"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "font-semibold bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground radius-lg",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => (
          <img src={ChevronLeft} id={"calendar-left"} className="h-4 w-4" />
        ),
        IconRight: () => <img src={ChevronRight} className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
