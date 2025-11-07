import React from "react";
import { getCalendarGrid, isSameDay } from "@/utils/date.utils";
import { CalendarEvent } from "./CalendarView.types";
import { CalendarCell } from "./CalendarCell";

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDayClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  onDayClick,
  onEventClick
}) => {
  const days = getCalendarGrid(currentDate);

  return (
    <div className="grid grid-cols-7 border border-neutral-200 rounded-lg overflow-hidden">
      {days.map((date, index) => {
        const dayEvents = events.filter(e => isSameDay(e.startDate, date));
        return (
          <CalendarCell
            key={index}
            date={date}
            events={dayEvents}
            isToday={isSameDay(date, new Date())}
            onClick={onDayClick}
            onEventClick={onEventClick}
          />
        );
      })}
    </div>
  );
};
