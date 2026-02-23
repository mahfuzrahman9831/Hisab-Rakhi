import React from 'react'

export default function Customer_list() {
  return (
    
      <div className="px-4 pb-32">

        {/* Item 1 */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer rounded-lg px-2">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm">
              AR
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900">
                Abdur Rahman
              </span>
              <span className="text-xs text-gray-500">
                01712-4455XX • 2 days ago
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-red-500/70 font-bold uppercase tracking-tight">
              You'll Get
            </span>
            <span className="font-bold text-red-600 text-lg tracking-tight">
              ৳1,500
            </span>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer rounded-lg px-2">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-sm">
              NH
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900">
                Nasir Hossain
              </span>
              <span className="text-xs text-gray-500">
                01823-9988XX • Today
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-green-500/70 font-bold uppercase tracking-tight">
              You'll Give
            </span>
            <span className="font-bold text-green-600 text-lg tracking-tight">
              ৳850
            </span>
          </div>
        </div>

        {/* Item 3 */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer rounded-lg px-2">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm">
              SK
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900">
                Sakib Khan
              </span>
              <span className="text-xs text-gray-500">
                01911-3322XX • 1 week ago
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-red-500/70 font-bold uppercase tracking-tight">
              You'll Get
            </span>
            <span className="font-bold text-red-600 text-lg tracking-tight">
              ৳12,400
            </span>
          </div>
        </div>

        {/* Item 4 */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer rounded-lg px-2">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-sm">
              TM
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900">
                Tamim Mridha
              </span>
              <span className="text-xs text-gray-500">
                01300-5544XX • 3 hours ago
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-green-500/70 font-bold uppercase tracking-tight">
              You'll Give
            </span>
            <span className="font-bold text-green-600 text-lg tracking-tight">
              ৳4,200
            </span>
          </div>
        </div>

        {/* Item 5 */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer rounded-lg px-2">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm">
              MA
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900">
                Mushfiq Ahmed
              </span>
              <span className="text-xs text-gray-500">
                01555-1122XX • Yesterday
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-red-500/70 font-bold uppercase tracking-tight">
              You'll Get
            </span>
            <span className="font-bold text-red-600 text-lg tracking-tight">
              ৳650
            </span>
          </div>
        </div>

      </div>
   
  )
}
