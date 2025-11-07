import type { Meta, StoryObj } from "@storybook/react";
import { CalendarView } from "./CalendarView";
import { CalendarEvent } from "./CalendarView.types";

const sampleEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Team Meeting",
    startDate: new Date(),
    endDate: new Date(),
    color: "#0ea5e9",
    category: "Work"
  },
  {
    id: "2",
    title: "Lunch with Client",
    startDate: new Date(),
    endDate: new Date(),
    color: "#10b981",
    category: "Meeting"
  }
];

const meta: Meta<typeof CalendarView> = {
  title: "CalendarView",
  component: CalendarView
};
export default meta;

type Story = StoryObj<typeof CalendarView>;

export const Default: Story = {
  args: {
    events: sampleEvents,
    onEventAdd: console.log,
    onEventUpdate: console.log,
    onEventDelete: console.log
  }
};

export const Empty: Story = {
  args: {
    events: [],
    onEventAdd: console.log,
    onEventUpdate: console.log,
    onEventDelete: console.log
  }
};
