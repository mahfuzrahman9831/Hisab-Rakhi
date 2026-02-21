import React from 'react'

export default function CategoryDistribution() {
  return (
    <div>
        <section className="px-4 pt-4">

      {/* Title */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          Category Distribution
          <span className="text-xs font-normal opacity-60">
            ক্যাটাগরি অনুযায়ী
          </span>
        </h3>
      </div>

      {/* Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-6">

        {/* Donut Chart */}
        <div className="relative w-24 h-24 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">

            {/* Background circle */}
            <circle
              className="stroke-gray-200"
              cx="18"
              cy="18"
              r="16"
              fill="none"
              strokeWidth="4"
            />

            {/* Retail 60% */}
            <circle
              className="stroke-green-500"
              cx="18"
              cy="18"
              r="16"
              fill="none"
              strokeDasharray="60, 100"
              strokeWidth="4"
            />

            {/* Wholesale 25% */}
            <circle
              className="stroke-blue-500"
              cx="18"
              cy="18"
              r="16"
              fill="none"
              strokeDasharray="25, 100"
              strokeDashoffset="-60"
              strokeWidth="4"
            />

            {/* Services 15% */}
            <circle
              className="stroke-amber-500"
              cx="18"
              cy="18"
              r="16"
              fill="none"
              strokeDasharray="15, 100"
              strokeDashoffset="-85"
              strokeWidth="4"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-bold text-gray-700">
              Total
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2">

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-[11px] font-medium">
                Retail Sales
              </span>
            </div>
            <span className="text-[11px] font-bold">60%</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-[11px] font-medium">
                Wholesale
              </span>
            </div>
            <span className="text-[11px] font-bold">25%</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              <span className="text-[11px] font-medium">
                Services
              </span>
            </div>
            <span className="text-[11px] font-bold">15%</span>
          </div>

        </div>

      </div>
    </section>
    </div>
  )
}
