import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface EventModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  onDelete?: (id: string) => void;
  eventToEdit?: any | null;
}

export const EventModal: React.FC<EventModalProps> = ({
  open,
  onClose,
  onSave,
  onDelete,
  eventToEdit,
}) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [category, setCategory] = useState("Work");
  const [color, setColor] = useState("#3b82f6");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Sync color picker and hex input
  const [hexCode, setHexCode] = useState("#3b82f6");

  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title || "");
      setDesc(eventToEdit.description || "");
      setStartTime(
        eventToEdit.startDate
          ? new Date(eventToEdit.startDate).toISOString().slice(0, 16)
          : ""
      );
      setEndTime(
        eventToEdit.endDate
          ? new Date(eventToEdit.endDate).toISOString().slice(0, 16)
          : ""
      );
      setCategory(eventToEdit.category || "Work");
      setColor(eventToEdit.color || "#3b82f6");
      setHexCode(eventToEdit.color || "#3b82f6");
    } else {
      setTitle("");
      setDesc("");
      setStartTime("");
      setEndTime("");
      setCategory("Work");
      setColor("#3b82f6");
      setHexCode("#3b82f6");
    }
  }, [eventToEdit, open]);

  // Handle color and hex synchronization
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    setHexCode(newColor);
  };

  const handleHexChange = (newHex: string) => {
    setHexCode(newHex);
    const validHex = /^#([0-9A-F]{3}){1,2}$/i.test(newHex);
    if (validHex) setColor(newHex);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-2xl shadow-2xl w-[440px] p-6 border border-neutral-200 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-md hover:bg-neutral-100"
          >
            <X className="w-5 h-5 text-neutral-500" />
          </button>

          {!showDeleteConfirm ? (
            <>
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">
                {eventToEdit ? "Edit Event" : "Create Event"}
              </h3>

              <div className="space-y-3">
                {/* Title */}
                <div>
                  <label className="block text-sm text-neutral-600 mb-1">
                    Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-xl border border-neutral-300 focus:ring-2 focus:ring-sky-400 p-2 outline-none"
                    placeholder="Event title"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm text-neutral-600 mb-1">
                    Description
                  </label>
                  <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    rows={2}
                    className="w-full rounded-xl border border-neutral-300 focus:ring-2 focus:ring-sky-400 p-2 outline-none resize-none"
                    placeholder="Optional details"
                  />
                </div>

                {/* Time Fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-neutral-600 mb-1">
                      Start Time
                    </label>
                    <input
                      type="datetime-local"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full rounded-xl border border-neutral-300 focus:ring-2 focus:ring-sky-400 p-2 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-600 mb-1">
                      End Time
                    </label>
                    <input
                      type="datetime-local"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full rounded-xl border border-neutral-300 focus:ring-2 focus:ring-sky-400 p-2 outline-none"
                    />
                  </div>
                </div>

                {/* Category + Color */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1">
                    <label className="block text-sm text-neutral-600 mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-xl border border-neutral-300 focus:ring-2 focus:ring-sky-400 p-2 outline-none bg-white"
                    >
                      <option>Work</option>
                      <option>Personal</option>
                      <option>Meeting</option>
                      <option>Deadline</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* Color Picker */}
                  <div className="col-span-1 flex flex-col">
                    <label className="block text-sm text-neutral-600 mb-1">
                      Color
                    </label>
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="w-full h-[42px] rounded-xl border border-neutral-300 cursor-pointer"
                    />
                  </div>

                  {/* Hex Input */}
                  <div className="col-span-1 flex flex-col">
                    <label className="block text-sm text-neutral-600 mb-1">
                      Hex Code
                    </label>
                    <input
                      type="text"
                      value={hexCode}
                      onChange={(e) => handleHexChange(e.target.value)}
                      className="w-full rounded-xl border border-neutral-300 focus:ring-2 focus:ring-sky-400 p-2 outline-none"
                      placeholder="#FF5733"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 pt-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-700 transition"
                  >
                    Cancel
                  </button>

                  {eventToEdit ? (
                    <>
                      <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          onSave({
                            id: eventToEdit.id,
                            title,
                            desc,
                            startTime,
                            endTime,
                            category,
                            color,
                          });
                          onClose();
                        }}
                        className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-medium transition"
                      >
                        Update
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        onSave({ title, desc, startTime, endTime, category, color });
                        onClose();
                      }}
                      className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-medium transition"
                    >
                      Create
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            // Delete confirmation
            <div className="text-center p-4">
              <h3 className="text-lg font-semibold mb-2 text-neutral-800">
                Delete this event?
              </h3>
              <p className="text-sm text-neutral-500 mb-4">
                This action cannot be undone.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onDelete?.(eventToEdit.id);
                    setShowDeleteConfirm(false);
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
