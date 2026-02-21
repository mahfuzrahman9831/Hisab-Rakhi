import React from "react";
import { IoMdSearch } from "react-icons/io";
import { GoFilter } from "react-icons/go";
import { MdDownload } from "react-icons/md";

export default function Search() {
  return (
    <div>
      <section className="flex items-center gap-2 px-4 py-3 bg-gray-50">
        {/* Search Input */}
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
            <IoMdSearch />
          </span>
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter Button */}
        <button className="w-[42px] h-[42px] flex items-center justify-center bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100 transition">
          <GoFilter />
        </button>

        {/* PDF Button */}
        <button className="w-[42px] h-[42px] flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-sm hover:opacity-90 active:scale-95 transition">
          <MdDownload />
        </button>
      </section>
    </div>
  );
}
