import { useState, useCallback, useEffect } from "react";
import { CalendarEvent } from "../components/Calendar/CalendarView.types";

/** Create 8–10 sample demo events */
const generateDemoEvents = (): CalendarEvent[] => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  return [
    {
      id: "evt-1",
      title: "Team Standup",
      description: "Daily sync with the team",
      startDate: new Date(year, month, 5, 9, 0),
      endDate: new Date(year, month, 5, 9, 30),
      category: "Work",
      color: "#F97316", // orange
    },
    {
      id: "evt-2",
      title: "Client Meeting",
      description: "Project milestones discussion",
      startDate: new Date(year, month, 7, 14, 0),
      endDate: new Date(year, month, 7, 15, 30),
      category: "Work",
      color: "#3B82F6", // blue
    },
    {
      id: "evt-3",
      title: "Gym Session",
      description: "Leg day workout",
      startDate: new Date(year, month, 9, 18, 0),
      endDate: new Date(year, month, 9, 19, 0),
      category: "Personal",
      color: "#22C55E", // green
    },
    {
      id: "evt-4",
      title: "Project Review",
      description: "Weekly review meeting",
      startDate: new Date(year, month, 11, 10, 30),
      endDate: new Date(year, month, 11, 11, 30),
      category: "Work",
      color: "#8B5CF6", // purple
    },
    {
      id: "evt-5",
      title: "Lunch Break",
      description: "Lunch with teammates",
      startDate: new Date(year, month, 13, 12, 0),
      endDate: new Date(year, month, 13, 13, 0),
      category: "Personal",
      color: "#EAB308", // yellow
    },
    {
      id: "evt-6",
      title: "Code Review",
      description: "Review PRs before merge",
      startDate: new Date(year, month, 14, 15, 30),
      endDate: new Date(year, month, 14, 16, 30),
      category: "Work",
      color: "#14B8A6", // teal
    },
    {
      id: "evt-7",
      title: "Design Sprint",
      description: "Brainstorm UX improvements",
      startDate: new Date(year, month, 16, 11, 0),
      endDate: new Date(year, month, 16, 12, 30),
      category: "Work",
      color: "#EC4899", // pink
    },
    {
      id: "evt-8",
      title: "Weekly Planning",
      description: "Next week goals",
      startDate: new Date(year, month, 19, 9, 30),
      endDate: new Date(year, month, 19, 11, 0),
      category: "Work",
      color: "#EF4444", // red
    },
    {
      id: "evt-9",
      title: "Team Retrospective",
      description: "Sprint retrospective session",
      startDate: new Date(year, month, 22, 17, 0),
      endDate: new Date(year, month, 22, 18, 0),
      category: "Work",
      color: "#F59E0B", // amber
    },
  ];
};

/**
 * Hook: useEventManager
 * Handles adding, updating, deleting, and persisting events
 */
export const useEventManager = (initialEvents: CalendarEvent[] = []) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Load from localStorage or demo data on mount
  useEffect(() => {
    const saved = localStorage.getItem("calendar-events");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEvents(parsed.map((e) => ({
            ...e,
            startDate: new Date(e.startDate),
            endDate: new Date(e.endDate),
          })));
          return;
        }
      } catch {
        console.warn("Invalid saved events, loading demo data.");
      }
    }

    // No saved events → load demo data
    const demo = generateDemoEvents();
    setEvents(demo);
    localStorage.setItem("calendar-events", JSON.stringify(demo));
  }, []);

  // Persist whenever events change
  useEffect(() => {
    localStorage.setItem("calendar-events", JSON.stringify(events));
  }, [events]);

  // Add new event
  const addEvent = useCallback((event: CalendarEvent) => {
    setEvents((prev) => {
      const updated = [...prev, event];
      localStorage.setItem("calendar-events", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Update existing event
  const updateEvent = useCallback((id: string, updates: Partial<CalendarEvent>) => {
    setEvents((prev) => {
      const updated = prev.map((e) => (e.id === id ? { ...e, ...updates } : e));
      localStorage.setItem("calendar-events", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Delete event
  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      localStorage.setItem("calendar-events", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { events, addEvent, updateEvent, deleteEvent };
};
