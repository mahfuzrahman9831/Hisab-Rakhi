import React from "react";
import { IoTrendingUp, IoTrendingDown, IoCalendarOutline } from "react-icons/io5";
import { FiChevronDown, FiCamera } from "react-icons/fi";

export default function Transaction_Form() {
  return (
    <main className="flex-1 px-4 py-6 space-y-6">
      {/* Sell / দিলাম */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-red-600 flex items-center gap-1">
          Sell / দিলাম
          <IoTrendingUp className="text-xs" />
        </label>

        <div className="relative flex items-center">
          <span className="absolute left-4 text-2xl font-bold text-red-400">
            ৳
          </span>

          <input
            type="number"
            placeholder="0.00"
            className="w-full pl-10 pr-4 py-4 bg-red-50 border-2 border-transparent focus:border-red-300 rounded-2xl text-2xl font-bold text-red-600 placeholder:text-red-300 transition-all focus:outline-none"
          />
        </div>
      </div>

      {/* Buy / পেলাম */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-green-600 flex items-center gap-1">
          Buy / পেলাম
          <IoTrendingDown className="text-xs" />
        </label>

        <div className="relative flex items-center">
          <span className="absolute left-4 text-2xl font-bold text-green-400">
            ৳
          </span>

          <input
            type="number"
            placeholder="0.00"
            className="w-full pl-10 pr-4 py-4 bg-green-50 border-2 border-transparent focus:border-green-300 rounded-2xl text-2xl font-bold text-green-600 placeholder:text-green-300 transition-all focus:outline-none"
          />
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-gray-600">
          Details / বিবরণ
        </label>

        <textarea
          rows="3"
          placeholder="Enter transaction items or notes..."
          className="w-full px-4 py-4 bg-gray-100 border-2 border-transparent focus:border-gray-300 rounded-2xl text-gray-800 placeholder:text-gray-400 resize-none transition-all focus:outline-none"
        />
      </div>

      {/* Date & Camera */}
      <div className="flex gap-4">
        {/* Date Button */}
        <button className="flex-1 flex items-center justify-between px-4 py-4 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors">
          <div className="flex items-center gap-3">
            <IoCalendarOutline className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              May 24, 2024
            </span>
          </div>

          <FiChevronDown className="text-gray-400 text-sm" />
        </button>

        {/* Camera Button */}
        <button className="flex items-center justify-center aspect-square px-4 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors">
          <FiCamera className="text-gray-500" />
        </button>
      </div>
    </main>
  );
}
