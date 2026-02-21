import React from 'react'
import { FaBuilding, FaUsers, FaQrcode, FaCloudUploadAlt } from "react-icons/fa";

export default function Group_Business() {
  return (
    <div>
      <section className="px-4 py-3">
      <div className="grid grid-cols-4 gap-3">

        {/* Multi Business */}
        <button className="flex flex-col items-center gap-2 group">
          <div className="w-14 h-14 rounded-2xl bg-green-500 hover:bg-green-600 text-white shadow-sm flex items-center justify-center border border-gray-200 group-active:scale-95 transition-transform">
            <FaBuilding size={20} />
          </div>
          <span className="text-[10px] font-semibold text-center leading-tight">
            Multi Business
          </span>
        </button>

        {/* Group Collection */}
        <button className="flex flex-col items-center gap-2 group">
          <div className="w-14 h-14 rounded-2xl bg-green-500 hover:bg-green-600 text-white shadow-sm flex items-center justify-center border border-gray-200 group-active:scale-95 transition-transform">
            <FaUsers size={20} />
          </div>
          <span className="text-[10px] font-semibold text-center leading-tight">
            Group Collection
          </span>
        </button>

        {/* My QR */}
        <button className="flex flex-col items-center gap-2 group">
          <div className="w-14 h-14 rounded-2xl bg-green-500 hover:bg-green-600 text-white shadow-sm flex items-center justify-center border border-gray-200 group-active:scale-95 transition-transform">
            <FaQrcode size={20} />
          </div>
          <span className="text-[10px] font-semibold text-center leading-tight">
            My QR
          </span>
        </button>

        {/* Data Backup */}
        <button className="flex flex-col items-center gap-2 group">
          <div className="w-14 h-14 rounded-2xl bg-green-500 hover:bg-green-600 text-white shadow-sm flex items-center justify-center  border border-gray-200 group-active:scale-95 transition-transform">
            <FaCloudUploadAlt size={20} />
          </div>
          <span className="text-[10px] font-semibold text-center leading-tight">
            Data Backup
          </span>
        </button>

      </div>
    </section>
    </div>
  )
}
