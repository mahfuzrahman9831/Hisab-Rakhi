import React from 'react'

import { HiOutlineFilter } from "react-icons/hi";
import Search_Input from './Search_Input';
import { IoTrendingDown, IoTrendingUp } from 'react-icons/io5';

export default function Search_Sort() {
  return (
    <div>
         <div className="px-4 pt-4 pb-2 space-y-4">

      {/* Search Input */}
     <Search_Input></Search_Input>

      <div className="space-y-3">

        {/* Sort Section */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mr-1">
            Sort Balance:
          </span>

          <button className="px-3 py-1.5 rounded-full border border-gray-200 bg-white text-xs font-semibold flex items-center gap-1.5 hover:border-green-400 transition-colors">
            <IoTrendingDown size={14} />
            High to Low
          </button>

          <button className="px-3 py-1.5 rounded-full border border-gray-200 bg-white text-xs font-semibold flex items-center gap-1.5 hover:border-green-400 transition-colors">
            <IoTrendingUp size={14} />
            Low to High
          </button>
        </div>

        {/* Due Only Toggle */}
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
          
          <div className="flex items-center gap-2">
            <HiOutlineFilter className="text-green-500 text-xl" />
            <span className="text-sm font-semibold">
              Due Only Customers
            </span>
          </div>

          {/* Toggle Switch */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
          </label>

        </div>

      </div>
    </div>
    </div>
  )
}
