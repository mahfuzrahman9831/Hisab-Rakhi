import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { IoTrendingUp, IoTrendingDown } from "react-icons/io5";

export default function Summary_Cards() {
  return (
    <div>
      <section className="px-4 py-3">
        <div className="grid grid-cols-2 gap-4">
          {/* Income Card */}
          <div className="relative p-4 rounded-2xl bg-green-100 border border-green-200 shadow-sm">
            <div className="absolute -right-2 -top-2 opacity-10 group-hover:scale-110 transition-transform">
              <FaArrowDown className="text-6xl text-green-600" />
            </div>

            <p className="text-[11px] font-semibold text-green-600 uppercase tracking-wider">
              Income
              <span className="text-[9px] opacity-70 block">মোট আয়</span>
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-1">৳ 62,000</h3>

            <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-green-600">
              <IoTrendingUp size={12} />
              <span>+8% this week</span>
            </div>
          </div>

          {/* Expense Card */}
          <div className="relative p-4 rounded-2xl bg-red-100 border border-red-200 shadow-sm">
            <div className="absolute -right-2 -top-2 opacity-10 group-hover:scale-110 transition-transform">
              <FaArrowUp className="text-6xl text-red-600" />
            </div>

            <p className="text-[11px] font-semibold text-red-600 uppercase tracking-wider">
              Expense
              <span className="text-[9px] opacity-70 block">মোট ব্যয়</span>
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-1">৳ 12,000</h3>

            <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-red-600">
              <IoTrendingDown size={12} />
              <span>-2% this week</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
