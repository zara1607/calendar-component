import React, { useState } from "react";
import { CalendarView } from "@/components/Calendar/CalendarView";
import { EventModal } from "@/components/Calendar/EventModal";
import { useEventManager } from "@/hooks/useEventManager";

export default function App() {
  const { events, addEvent, updateEvent, deleteEvent } = useEventManager([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [prefilledDate, setPrefilledDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-sky-50 text-neutral-800 p-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-sky-700">📅 Calendar View</h1>
        <button
          onClick={() => {
            setSelectedEvent(null);
            setPrefilledDate(new Date());
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-xl shadow-sm transition"
        >
          + Create Event
        </button>
      </header>

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
        <CalendarView
          events={events}
          onEventAdd={(event) => addEvent(event)}
          onEventUpdate={(id, data) => {
            setSelectedEvent({ ...data, id });
            setIsModalOpen(true);
          }}
          onEventDelete={deleteEvent}
          onDayClick={(date) => {
            setPrefilledDate(date);
            setSelectedEvent(null);
            setIsModalOpen(true);
          }}
          initialView="month"
        />
      </div>

      <EventModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventToEdit={selectedEvent}
        onSave={(data) => {
          if (selectedEvent) {
            updateEvent(selectedEvent.id, {
              ...selectedEvent,
              ...data,
              title: data.title,
              description: data.desc,
              startDate: new Date(data.startTime),
              endDate: new Date(data.endTime),
              color: data.color,
              category: data.category,
            });
          } else {
            addEvent({
              id: `evt-${Date.now()}`,
              title: data.title,
              description: data.desc,
              startDate: new Date(data.startTime || prefilledDate),
              endDate: new Date(data.endTime || prefilledDate),
              color: data.color,
              category: data.category,
            });
          }
        }}
        onDelete={deleteEvent}
      />
    </div>
  );
}
