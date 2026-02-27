import React from "react";
import { HiOutlineFilter } from "react-icons/hi";
import Search_Input from "./Search_Input";
import { IoTrendingDown, IoTrendingUp } from "react-icons/io5";

export default function Search_Sort({
  dueOnly,
  setDueOnly,
  sortType,
  setSortType,
  searchTerm,
  setSearchTerm,
}) {
  return (
    <div className="px-4 pt-4 pb-2 space-y-4">
      {/* Search */}
      <Search_Input searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="space-y-3">
        {/* Sort Section */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mr-1">
            Sort Balance:
          </span>

          <button
            onClick={() => setSortType(sortType === "high" ? null : "high")}
            className={`px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              sortType === "high"
                ? "border-green-500 bg-green-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <IoTrendingDown size={14} />
            High to Low
          </button>

          <button
            onClick={() => setSortType(sortType === "low" ? null : "low")}
            className={`px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              sortType === "low"
                ? "border-green-500 bg-green-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <IoTrendingUp size={14} />
            Low to High
          </button>
        </div>

        {/* Due Only Toggle */}
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
          <div className="flex items-center gap-2">
            <HiOutlineFilter className="text-green-500 text-xl" />
            <span className="text-sm font-semibold">Due Only Customers</span>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={dueOnly}
              onChange={() => setDueOnly(!dueOnly)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
        </div>
      </div>
    </div>
  );
}
