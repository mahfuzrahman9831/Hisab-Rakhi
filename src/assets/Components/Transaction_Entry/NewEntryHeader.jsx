import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiBarChart2, FiEdit2 } from "react-icons/fi";
import { MdOutlinePayments } from "react-icons/md";

export default function NewEntryHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">

      <div className="flex items-center justify-between px-4 py-4">

        {/* Left Side */}
        <div className="flex items-center gap-3">
          <button className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors">
            <IoChevronBack className="text-gray-600 text-lg" />
          </button>

          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            New Entry
          </h1>
        </div>

        {/* Right Menu */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <HiOutlineDotsVertical className="text-gray-600 text-lg" />
          </button>

          {/* Overlay */}
          {open && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
          )}

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">

              <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-gray-50 border-b border-gray-100 text-gray-700 w-full text-left">
                <FiBarChart2 size={18} />
                Report
              </button>

              <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-gray-50 border-b border-gray-100 text-gray-700 w-full text-left">
                <FiEdit2 size={18} />
                Edit
              </button>

              <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-gray-50 text-gray-700 w-full text-left">
                <MdOutlinePayments size={18} />
                Bill Collection
              </button>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}