import React from "react";
import { IoSearch, IoTrendingDown, IoTrendingUp } from "react-icons/io5";

export default function Search_Input() {
  return (
    <div>
      <div className="relative flex items-center">
        <IoSearch className="absolute left-3 text-gray-400 text-lg" />
        <input
          type="text"
          placeholder="Search customer name or phone..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-sm transition-all placeholder:text-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
        />
      </div>
    </div>
  );
}
