import React from 'react'

export default function Tranactions() {
  return (
    <div>
        <section className="space-y-4 px-4 pb-24">
  <div className="flex items-center justify-between">
    <h3 className="font-bold text-slate-900 text-lg">
      Recent Transactions
    </h3>
    <button className="text-xs font-bold text-blue-600">
      View All
    </button>
  </div>

  <div className="space-y-3">
    
    {/* Transaction 1 */}
    <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-green-600 text-lg">🛒</span>
        </div>
        <div>
          <p className="text-sm font-semibold">Product Sale</p>
          <p className="text-[11px] text-gray-500">
            12 Jun • 10:30 AM
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-green-600">
          +৳ 1,200
        </p>
        <p className="text-[11px] text-gray-400">Cash</p>
      </div>
    </div>

    {/* Transaction 2 */}
    <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
          <span className="text-red-600 text-lg">📦</span>
        </div>
        <div>
          <p className="text-sm font-semibold">Inventory Purchase</p>
          <p className="text-[11px] text-gray-500">
            11 Jun • 04:15 PM
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-red-600">
          -৳ 4,500
        </p>
        <p className="text-[11px] text-gray-400">Bank</p>
      </div>
    </div>

    {/* Transaction 3 */}
    <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-green-600 text-lg">💳</span>
        </div>
        <div>
          <p className="text-sm font-semibold">Customer Payment</p>
          <p className="text-[11px] text-gray-500">
            10 Jun • 09:20 AM
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-green-600">
          +৳ 2,800
        </p>
        <p className="text-[11px] text-gray-400">bKash</p>
      </div>
    </div>

  </div>
</section>
    </div>
  )
}
