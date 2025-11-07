import { CalendarEvent } from "../components/Calendar/CalendarView.types";

/**
 * Sorts events by start date
 */
export const sortEvents = (events: CalendarEvent[]): CalendarEvent[] => {
  return [...events]
    .filter(event => {
      const date = event.startDate instanceof Date ? event.startDate : new Date(event.startDate);
      return !isNaN(date.getTime());
    })
    .sort((a, b) => {
      const dateA = a.startDate instanceof Date ? a.startDate : new Date(a.startDate);
      const dateB = b.startDate instanceof Date ? b.startDate : new Date(b.startDate);
      return dateA.getTime() - dateB.getTime();
    });
};

/**
 * Groups events by day
 */
export const groupEventsByDay = (
  events: CalendarEvent[]
): Record<string, CalendarEvent[]> => {
  return events.reduce((acc, event) => {
    const date =
      event.startDate instanceof Date ? event.startDate : new Date(event.startDate);

    if (isNaN(date.getTime())) return acc; // ignore invalid dates

    const key = date.toDateString();
    if (!acc[key]) acc[key] = [];
    acc[key].push(event);

    return acc;
  }, {} as Record<string, CalendarEvent[]>);
};

/**
 * Generates a random event color (useful for demos)
 */
export const getRandomColor = (): string => {
  const palette = ["#0ea5e9", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"];
  return palette[Math.floor(Math.random() * palette.length)];
};

/**
 * Validates that an event has proper data
 */
export const validateEvent = (event: CalendarEvent): boolean => {
  if (!event.title || typeof event.title !== "string" || !event.title.trim()) {
    return false;
  }

  const startDate =
    event.startDate instanceof Date ? event.startDate : new Date(event.startDate);
  const endDate =
    event.endDate instanceof Date ? event.endDate : new Date(event.endDate);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return false;
  if (endDate <= startDate) return false;

  return true;
};
