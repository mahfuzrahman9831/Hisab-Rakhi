import React from 'react'
import { IoCheckmarkCircle } from "react-icons/io5";
import { FiShare2 } from "react-icons/fi";

export default function BottomSubmit() {
  return (
     <div className="sticky bottom-0 w-full p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 pb-8 space-y-3">

      <div className="flex gap-3">

        {/* Submit Button */}
        <button className="flex-1 bg-green-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-green-600/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2">
          <IoCheckmarkCircle size={20} />
          Submit Transaction
        </button>

        {/* Share Button */}
        <button className="aspect-square bg-gray-100 text-gray-600 p-4 rounded-2xl hover:bg-gray-200 active:scale-95 transition-all flex items-center justify-center">
          <FiShare2 size={18} />
        </button>

      </div>

    </div>
  )
}
