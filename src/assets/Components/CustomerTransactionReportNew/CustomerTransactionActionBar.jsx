import React from "react";
import { FiBell, FiDownload } from "react-icons/fi";

export default function CustomerTransactionActionBar() {
  return (
    <div className="px-4 mb-3">
      <div className="bg-white rounded-2xl p-3 flex items-center justify-between shadow-sm border border-gray-100">

        {/* Left Side */}
        <div className="flex items-center gap-2 px-2 border-r border-gray-200 pr-4">
          <FiBell className="text-gray-500 w-5 h-5" />
          <span className="text-gray-700 text-sm font-medium">
            ডিউ খোর
          </span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4 pl-3">

          <div className="flex items-center gap-1.5 cursor-pointer hover:text-green-600 transition">
            <FiDownload className="text-gray-500 w-5 h-5" />
            <span className="text-gray-700 text-sm font-medium">
              রিপোর্ট শেয়ার
            </span>
          </div>

          {/* Toggle */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              defaultChecked
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full 
              peer peer-checked:bg-green-500 
              after:content-[''] after:absolute after:top-[2px] after:left-[2px]
              after:bg-white after:border after:border-gray-300
              after:rounded-full after:h-5 after:w-5 after:transition-all
              peer-checked:after:translate-x-full">
            </div>
          </label>

        </div>
      </div>
    </div>
  );
}