import React from "react";
import { CalendarEvent } from "./CalendarView.types";
import { format } from "date-fns";
import clsx from "clsx";

interface CalendarCellProps {
  date: Date;
  events: CalendarEvent[];
  isToday: boolean;
  isCurrentMonth: boolean;
  onDayClick: () => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const CalendarCell: React.FC<CalendarCellProps> = ({
  date,
  events,
  isToday,
  isCurrentMonth,
  onDayClick,
  onEventClick,
}) => {
  return (
    <div
      onClick={onDayClick}
      className={clsx(
        "min-h-[100px] p-2 border border-neutral-200 relative cursor-pointer transition-colors",
        isCurrentMonth ? "bg-white hover:bg-sky-50" : "bg-neutral-50 text-neutral-400",
        isToday && "bg-blue-50"
      )}
    >
      {/* Date number */}
      <div
        className={clsx(
          "text-sm font-medium mb-1 select-none",
          isToday ? "text-sky-700 font-semibold" : "text-neutral-700"
        )}
      >
        {format(date, "d")}
      </div>

      {/* Event chips */}
      <div className="flex flex-col gap-1 mt-1">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={(e) => {
              e.stopPropagation();
              onEventClick(event);
            }}
            className="w-full py-1 px-2 text-center font-semibold text-sm rounded-md border border-transparent"
            style={{
              backgroundColor: `${event.color}1A`, // soft tint background
              color: event.color, // bold text color
            }}
          >
            {event.title || "Untitled"}
          </div>
        ))}
      </div>
    </div>
  );
};
