import React from "react";
import { CalendarEvent } from "./CalendarView.types";
import { format } from "date-fns";

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onSlotClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onSlotClick,
  onEventClick
}) => {
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden">
      <div className="grid grid-cols-7 text-center bg-neutral-50 font-medium">
        {days.map(day => (
          <div key={day.toISOString()} className="p-2 border-b border-neutral-200">
            {format(day, "EEE dd")}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 h-[600px]">
        {days.map(day => (
          <div
            key={day.toISOString()}
            className="border-l border-neutral-200 relative"
            onClick={() => onSlotClick(day)}
          >
            {events
              .filter(e => e.startDate.toDateString() === day.toDateString())
              .map(event => (
                <div
                  key={event.id}
                  onClick={e => {
                    e.stopPropagation();
                    onEventClick(event);
                  }}
                  className="absolute left-1 right-1 rounded text-xs text-white p-1 truncate"
                  style={{
                    backgroundColor: event.color || "#0ea5e9",
                    top: `${(event.startDate.getHours() / 24) * 100}%`,
                    height: `${((event.endDate.getTime() - event.startDate.getTime()) / (3600000 * 24)) * 100}%`
                  }}
                >
                  {event.title}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};
