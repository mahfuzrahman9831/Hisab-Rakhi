import React, { useState, useRef, useEffect } from "react";
import { IoChevronBack, IoChevronForward, IoCalendarOutline } from "react-icons/io5";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

export default function CustomCalendar({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date(value || new Date()));
  const ref = useRef();

  // ✅ Outside click close
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = value ? new Date(value) : new Date();

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];
  // prev month padding
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, current: false });
  }
  // current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true });
  }
  // next month padding
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, current: false });
  }

  const isSelected = (day, current) => {
    if (!current) return false;
    return (
      selected.getDate() === day &&
      selected.getMonth() === month &&
      selected.getFullYear() === year
    );
  };

  const isToday = (day, current) => {
    if (!current) return false;
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  const handleSelect = (day, current) => {
    if (!current) return;
    const date = new Date(year, month, day, 12, 0, 0);
    onChange(date);
    setOpen(false);
  };

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const displayDate = selected.toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });

  return (
    <div className="relative flex-1" ref={ref}>

      {/* ✅ Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3.5 bg-gray-100 rounded-2xl border border-gray-200 hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all"
      >
        <IoCalendarOutline className="text-green-500 text-lg shrink-0" />
        <span className="text-sm font-semibold text-slate-700">{displayDate}</span>
      </button>

      {/* ✅ Calendar Dropdown */}
      {open && (
        <div className="absolute left-0 top-14 z-50 w-[300px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-[fadeIn_0.15s_ease]">

          {/* Header */}
          <div className="bg-green-500 px-5 py-4">
            <p className="text-green-100 text-xs font-semibold uppercase tracking-widest mb-1">
              Select Date
            </p>
            <p className="text-white text-xl font-bold">
              {selected.toLocaleDateString("en-GB", {
                weekday: "short", day: "numeric", month: "long",
              })}
            </p>
          </div>

          {/* Month Navigator */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
            <button
              type="button"
              onClick={prevMonth}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition active:scale-95"
            >
              <IoChevronBack size={16} className="text-gray-600" />
            </button>

            <span className="font-bold text-slate-800 text-sm">
              {MONTHS[month]} {year}
            </span>

            <button
              type="button"
              onClick={nextMonth}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition active:scale-95"
            >
              <IoChevronForward size={16} className="text-gray-600" />
            </button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 px-3 pt-3 pb-1">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-[11px] font-bold text-gray-400 py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 px-3 pb-4 gap-y-1">
            {cells.map((cell, i) => {
              const sel = isSelected(cell.day, cell.current);
              const tod = isToday(cell.day, cell.current);

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelect(cell.day, cell.current)}
                  disabled={!cell.current}
                  className={`
                    h-9 w-full rounded-xl text-[13px] font-semibold transition-all active:scale-95
                    ${!cell.current ? "text-gray-300 cursor-default" : ""}
                    ${cell.current && !sel && !tod ? "text-slate-700 hover:bg-green-50 hover:text-green-600" : ""}
                    ${sel ? "bg-green-500 text-white shadow-md shadow-green-500/30" : ""}
                    ${tod && !sel ? "text-green-600 bg-green-50 ring-1 ring-green-400" : ""}
                  `}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-4 pb-4 flex gap-2">
            <button
              type="button"
              onClick={() => {
                onChange(new Date());
                setOpen(false);
              }}
              className="flex-1 py-2.5 rounded-xl bg-green-50 text-green-600 text-xs font-bold hover:bg-green-100 transition active:scale-95"
            >
              আজকের তারিখ
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-500 text-xs font-bold hover:bg-gray-200 transition active:scale-95"
            >
              বাতিল
            </button>
          </div>
        </div>
      )}
    </div>
  );
}