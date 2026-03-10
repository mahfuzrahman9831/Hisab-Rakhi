import React from "react";

export default function SummaryCardNew() {
  return (
    <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold text-slate-700">Financial Overview</h2>

        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
          Monthly
        </span>
      </div>

      <div className="grid grid-cols-2 gap-8 items-center justify-center">
        {/* Income Gauge */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-slate-200 stroke-current"
                d="M4 20a14 14 0 1 1 28 0"
                fill="none"
                strokeWidth="3"
              />

              <path
                className="text-green-500 stroke-current"
                d="M4 20a14 14 0 1 1 28 0"
                fill="none"
                strokeDasharray="75, 100"
                strokeLinecap="round"
                strokeWidth="3"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
              <span className="text-xl font-bold text-slate-800">$12.4k</span>

              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                Income
              </span>
            </div>
          </div>
        </div>

        {/* Expense Gauge */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-slate-200 stroke-current"
                d="M4 20a14 14 0 1 1 28 0"
                fill="none"
                strokeWidth="3"
              />

              <path
                className="text-orange-400 stroke-current"
                d="M4 20a14 14 0 1 1 28 0"
                fill="none"
                strokeDasharray="45, 100"
                strokeLinecap="round"
                strokeWidth="3"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
              <span className="text-xl font-bold text-slate-800">$4.8k</span>

              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                Expenses
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className=" border-t border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span className="text-sm text-slate-500">Net Profit</span>
        </div>

        <span className="text-sm font-bold text-slate-900">+$7,600.00</span>
      </div>
    </section>
  );
}
