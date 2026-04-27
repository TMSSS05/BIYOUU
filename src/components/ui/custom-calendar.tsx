"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  isBefore,
  startOfDay,
  addMonths,
  subMonths,
  getDay,
} from "date-fns";
import { fr, enUS, es } from "date-fns/locale";

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  month?: Date;
  onMonthChange?: (date: Date) => void;
  fromDate?: Date;
  disabledDays?: { before: Date }[];
  locale?: Locale;
  className?: string;
}

type Locale = typeof fr | typeof enUS | typeof es;

const WEEKDAYS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const WEEKDAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Premium Custom Calendar - Pure CSS Grid Layout
 */
export function CustomCalendar({
  selected,
  onSelect,
  month: controlledMonth,
  onMonthChange,
  fromDate,
  disabledDays,
  locale = fr,
  className,
}: CalendarProps) {
  const [internalMonth, setInternalMonth] = React.useState(controlledMonth || new Date());

  const currentMonth = controlledMonth || internalMonth;
  const setCurrentMonth = onMonthChange || setInternalMonth;

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDayOfWeek = getDay(monthStart);
  const adjustedStartDay = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
  const emptyDays = Array(adjustedStartDay).fill(null);

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handleSelectDay = (day: Date) => onSelect?.(day);

  const isDayDisabled = (day: Date) => {
    if (fromDate && isBefore(day, fromDate)) return true;
    if (disabledDays?.some((d) => d.before && isBefore(day, d.before))) return true;
    return false;
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <button type="button" onClick={handlePrevMonth} className="h-8 w-8 flex items-center justify-center rounded-lg text-foreground/60 hover:text-primary hover:bg-primary/10 transition-all">
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <span className="text-sm font-semibold text-foreground tracking-wide">
          {format(currentMonth, "MMMM yyyy", { locale }).replace(/^\w/, (c) => c.toUpperCase())}
        </span>
        <button type="button" onClick={handleNextMonth} className="h-8 w-8 flex items-center justify-center rounded-lg text-foreground/60 hover:text-primary hover:bg-primary/10 transition-all">
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 mb-2">
        {(locale === fr ? WEEKDAYS : WEEKDAYS_EN).map((day) => (
          <div key={day} className="h-8 flex items-center justify-center text-[0.7rem] font-medium text-muted-foreground uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="h-10" />
        ))}

        {startDate.map((day) => {
          const disabled = isDayDisabled(day);
          const isSelectedDay = selected && isSameDay(day, selected);
          const today = isToday(day);

          return (
            <button
              key={day.toISOString()}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && handleSelectDay(day)}
              className={cn(
                "h-10 w-full flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-150",
                "hover:bg-primary/10 hover:text-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-inset",
                "disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-transparent",
                isSelectedDay && "bg-primary text-primary-foreground shadow-md",
                today && !isSelectedDay && "bg-primary/15 text-primary font-bold border border-primary/30",
                !isSelectedDay && !today && !disabled && "text-foreground"
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}