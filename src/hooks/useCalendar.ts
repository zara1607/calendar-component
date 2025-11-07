import { useState, useCallback } from "react";

interface CalendarState {
  currentDate: Date;
  view: "month" | "week";
}

export const useCalendar = (
  initialDate: Date = new Date(),
  initialView: "month" | "week" = "month"
) => {
  const [state, setState] = useState<CalendarState>({
    currentDate: initialDate,
    view: initialView
  });

  const goToNextMonth = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: new Date(
        prev.currentDate.getFullYear(),
        prev.currentDate.getMonth() + 1,
        1
      )
    }));
  }, []);

  const goToPreviousMonth = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: new Date(
        prev.currentDate.getFullYear(),
        prev.currentDate.getMonth() - 1,
        1
      )
    }));
  }, []);

  const goToToday = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentDate: new Date()
    }));
  }, []);

  const setView = useCallback((view: "month" | "week") => {
    setState(prev => ({ ...prev, view }));
  }, []);

  return {
    ...state,
    setView,
    goToNextMonth,
    goToPreviousMonth,
    goToToday
  };
};
