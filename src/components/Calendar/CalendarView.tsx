import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";
import { getCalendarGrid, isSameDay } from "../../utils/date.utils";
import { CalendarEvent, CalendarViewProps } from "./CalendarView.types";
import { CalendarCell } from "./CalendarCell";
import {
  format,
  addWeeks,
  subWeeks,
  startOfWeek,
  addDays,
  eachDayOfInterval,
  endOfWeek,
} from "date-fns";

export const CalendarView: React.FC<
  CalendarViewProps & { onDayClick?: (date: Date) => void }
> = ({
  events,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  initialView = "month",
  initialDate = new Date(),
  onDayClick,
}) => {
  const [view, setView] = useState<"month" | "week">(initialView);
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);

  /** --- Month Grid --- */
  const monthGrid = useMemo(() => getCalendarGrid(currentDate), [currentDate]);

  /** --- Week Range --- */
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  /** --- Navigation --- */
  const goToNext = () => {
    if (view === "month")
      setCurrentDate(
        (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
      );
    else setCurrentDate((prev) => addWeeks(prev, 1));
  };
  const goToPrev = () => {
    if (view === "month")
      setCurrentDate(
        (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
      );
    else setCurrentDate((prev) => subWeeks(prev, 1));
  };
  const goToToday = () => setCurrentDate(new Date());

  /** --- Events by Day --- */
  const eventsByDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const e of events) {
      const key = e.startDate.toDateString();
      const arr = map.get(key) ?? [];
      arr.push(e);
      map.set(key, arr);
    }
    return map;
  }, [events]);

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="px-3 py-1.5 rounded-lg bg-white border border-neutral-200 shadow-sm text-sm hover:bg-neutral-50 transition"
          >
            Today
          </button>

          <button
            onClick={goToPrev}
            aria-label="Previous"
            className="p-2 rounded-lg bg-white border border-neutral-200 shadow-sm hover:bg-neutral-50 transition"
          >
            <ChevronLeft className="w-4 h-4 text-neutral-600" />
          </button>

          <button
            onClick={goToNext}
            aria-label="Next"
            className="p-2 rounded-lg bg-white border border-neutral-200 shadow-sm hover:bg-neutral-50 transition"
          >
            <ChevronRight className="w-4 h-4 text-neutral-600" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <CalendarIcon className="w-5 h-5 text-sky-500" />
          <div className="text-lg font-semibold text-neutral-800">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentDate.getMonth() + "-" + currentDate.getFullYear()}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.22 }}
                className="inline-block"
              >
                {format(currentDate, "MMMM yyyy")}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-md bg-white border border-neutral-200 shadow-sm p-1">
            <button
              onClick={() => setView("month")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                view === "month"
                  ? "bg-sky-600 text-white shadow"
                  : "text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setView("week")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                view === "week"
                  ? "bg-sky-600 text-white shadow"
                  : "text-neutral-700 hover:bg-neutral-50"
              }`}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      {/* DAY LABELS */}
      {view === "month" ? (
        <div className="grid grid-cols-7 text-center text-sm font-medium text-neutral-500 border-b pb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="py-2">
              {d}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-8 border-b pb-2 text-sm font-medium text-neutral-500">
          <div className="col-span-1 text-right pr-2"></div>
          {weekDays.map((date) => (
            <div key={date.toDateString()} className="text-center">
              <div>{format(date, "EEE")}</div>
              <div className="text-xs text-neutral-400">
                {format(date, "d")}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* WEEK VIEW UPDATED */}
      {view === "week" && (
        <div className="grid grid-cols-8 border-t border-neutral-200">
          {/* Time Labels */}
          <div className="col-span-1 border-r border-neutral-200 text-xs text-neutral-500">
            {Array.from({ length: 15 }, (_, i) => {
              const hour = 8 + i; // 8 AM → 10 PM
              const displayHour =
                hour === 12
                  ? "12 PM"
                  : hour > 12
                  ? `${hour - 12} PM`
                  : `${hour} AM`;
              return (
                <div key={hour} className="h-16 flex justify-end pr-2 items-start">
                  {displayHour}
                </div>
              );
            })}
          </div>

          {/* Day Columns */}
          {weekDays.map((date) => {
            const key = date.toDateString();
            const dayEvents = eventsByDay.get(key) ?? [];

            return (
              <div
                key={key}
                className="border-r border-neutral-200 relative bg-white"
              >
                {Array.from({ length: 15 }, (_, i) => (
                  <div
                    key={i}
                    onClick={() => onDayClick?.(date)}
                    className="h-16 border-b border-neutral-100 hover:bg-sky-50 cursor-pointer transition"
                  ></div>
                ))}

                {dayEvents.map((ev) => {
                  const startHour = new Date(ev.startDate).getHours();
                  const duration =
                    (new Date(ev.endDate).getTime() -
                      new Date(ev.startDate).getTime()) /
                    (1000 * 60 * 60);
                  const top = (startHour - 8) * 64;
                  const height = Math.max(duration * 64, 40);

                  return (
                    <motion.div
                      key={ev.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute left-1 right-1 rounded-md text-xs p-1 text-white cursor-pointer overflow-hidden"
                      style={{
                        top,
                        height,
                        backgroundColor: ev.color ?? "#3b82f6",
                      }}
                      onClick={() => onEventUpdate?.(ev.id, ev)}
                    >
                      <strong>{ev.title || "Untitled Event"}</strong>
                      <div className="text-[10px] opacity-80">
                        {format(ev.startDate, "h:mm a")} -{" "}
                        {format(ev.endDate, "h:mm a")}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}

      {/* MONTH VIEW */}
      {view === "month" && (
        <div className="grid grid-cols-7 gap-px bg-neutral-200">
          {monthGrid.map((date, idx) => {
            const key = date.toDateString();
            const dayEvents = eventsByDay.get(key) ?? [];
            const today = isSameDay(date, new Date());
            const isCurrentMonth = date.getMonth() === currentDate.getMonth();

            return (
              <CalendarCell
                key={idx}
                date={date}
                events={dayEvents}
                isToday={today}
                isCurrentMonth={isCurrentMonth}
                onDayClick={() => onDayClick?.(date)}
                onEventClick={(ev) => onEventUpdate?.(ev.id, ev)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
