import { useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";

export default function MobileDatePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const formattedDate = value.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleChange = (e) => {
    const newDate = new Date(e.target.value);
    onChange(newDate);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex-1 flex items-center justify-between px-4 py-4 bg-gray-100 rounded-2xl active:scale-95 transition"
      >
        <div className="flex items-center gap-3">
          <IoCalendarOutline className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            {formattedDate}
          </span>
        </div>
        <FiChevronDown className="text-gray-400 text-sm" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40"
          ></div>

          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 animate-slideUp">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6"></div>

            <input
              type="date"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-center text-lg"
              onChange={handleChange}
            />

            <button
              onClick={() => setOpen(false)}
              className="mt-6 w-full bg-black text-white py-3 rounded-xl"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}