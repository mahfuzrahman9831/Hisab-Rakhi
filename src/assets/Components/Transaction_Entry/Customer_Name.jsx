import React from "react";
import { FiShare2 } from "react-icons/fi";

export default function Customer_Name() {
  return (
    <div className="px-4 py-6 bg-gray-50 border-b border-gray-100">
      <div className="flex items-center justify-between mb-4">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl">
            AR
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">Abdur Rahman</h2>
            <p className="text-sm text-gray-500">01712-4455XX</p>
          </div>
        </div>

        {/* Right Side Balance */}
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
            Current Balance
          </p>
          <p className="text-xl font-bold text-red-600">৳1,500</p>
        </div>
      </div>

      {/* Share Button */}
      <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
        <FiShare2 size={18} />
        Share Report
      </button>
    </div>
  );
}
