import React from 'react'

export default function TopState() {
  return (
    <div>
         <section className="grid grid-cols-2 gap-4 px-4 pt-4">

      {/* Top Income Source */}
      <div className="bg-gradient-to-br from-green-100 to-transparent p-4 rounded-2xl border border-green-200">
        <p className="text-[10px] font-bold text-green-600 uppercase">
          Top Income Source
        </p>
        <p className="text-sm font-semibold mt-1 text-gray-800">
          Direct Sales
        </p>
        <p className="text-lg font-bold mt-1 text-gray-900">
          ৳ 45,200
        </p>
      </div>

      {/* Top Expense */}
      <div className="bg-gradient-to-br from-red-100 to-transparent p-4 rounded-2xl border border-red-200">
        <p className="text-[10px] font-bold text-red-600 uppercase">
          Top Expense
        </p>
        <p className="text-sm font-semibold mt-1 text-gray-800">
          Inventory
        </p>
        <p className="text-lg font-bold mt-1 text-gray-900">
          ৳ 18,400
        </p>
      </div>

    </section>
    </div>
  )
}
