import React from "react";
import { IoMdSearch } from "react-icons/io";


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
            className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

       
      </section>
    </div>
  );
}
