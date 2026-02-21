import React from 'react'

export default function IncomeVSExpense() {
  return (
   <section className="px-4 pt-4">

      {/* Title */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          Income vs Expense
          <span className="text-xs font-normal opacity-60">
            আয় বনাম ব্যয়
          </span>
        </h3>
      </div>

      {/* Chart Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">

        {/* Bars */}
        <div className="flex gap-6 h-36">

          {/* Week 1 */}
          <div className="flex-1 flex flex-col justify-end gap-1">
            <div className="flex items-end justify-center gap-1.5 h-full">
              <div className="w-3 bg-green-500 rounded-t-full h-[80%]"></div>
              <div className="w-3 bg-red-500 rounded-t-full h-[30%]"></div>
            </div>
            <span className="text-[9px] text-center mt-1 opacity-50 font-bold">
              WK 1
            </span>
          </div>

          {/* Week 2 */}
          <div className="flex-1 flex flex-col justify-end gap-1">
            <div className="flex items-end justify-center gap-1.5 h-full">
              <div className="w-3 bg-green-500 rounded-t-full h-[65%]"></div>
              <div className="w-3 bg-red-500 rounded-t-full h-[45%]"></div>
            </div>
            <span className="text-[9px] text-center mt-1 opacity-50 font-bold">
              WK 2
            </span>
          </div>

          {/* Week 3 */}
          <div className="flex-1 flex flex-col justify-end gap-1">
            <div className="flex items-end justify-center gap-1.5 h-full">
              <div className="w-3 bg-green-500 rounded-t-full h-[90%]"></div>
              <div className="w-3 bg-red-500 rounded-t-full h-[20%]"></div>
            </div>
            <span className="text-[9px] text-center mt-1 opacity-50 font-bold">
              WK 3
            </span>
          </div>

          {/* Week 4 */}
          <div className="flex-1 flex flex-col justify-end gap-1">
            <div className="flex items-end justify-center gap-1.5 h-full">
              <div className="w-3 bg-green-500 rounded-t-full h-[75%]"></div>
              <div className="w-3 bg-red-500 rounded-t-full h-[60%]"></div>
            </div>
            <span className="text-[9px] text-center mt-1 opacity-50 font-bold">
              WK 4
            </span>
          </div>

        </div>

        {/* Legend */}
        <div className="mt-4 flex justify-center gap-4 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-[10px] font-bold">Income</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span className="text-[10px] font-bold">Expense</span>
          </div>
        </div>

      </div>
    </section>
  )
}
