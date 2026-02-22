import React from 'react'
import { FiEdit2, FiEyeOff, FiUploadCloud } from 'react-icons/fi'

export default function UserProfileIdentitySection() {
  return (
    <div className="px-4 py-6">

        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-lg font-bold">
            Identification
          </h2>

          <button className="text-green-600 flex items-center gap-1 text-sm font-medium">
            <FiEdit2 size={16} />
            Edit
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-5">

          {/* NID */}
          <div>
            <label className="text-xs uppercase text-gray-500 font-medium">
              NID Number
            </label>

            <div className="relative mt-2">
              <input
                type="text"
                value="****-****-1234"
                readOnly
                className="w-full bg-gray-50 rounded-lg py-3 px-4 text-sm font-mono tracking-widest"
              />

              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FiEyeOff size={18} />
              </button>
            </div>
          </div>

          {/* Document Uploads */}
          <div className="grid grid-cols-2 gap-4">

            {["NID Front", "NID Back"].map((label, index) => (
              <div key={index} className="space-y-2">

                <p className="text-xs uppercase text-gray-500 text-center font-medium">
                  {label}
                </p>

                <div className="aspect-[3/2] rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 transition">
                  <FiUploadCloud size={20} className="text-green-600" />
                  <span className="text-[10px] font-bold text-green-600">
                    UPDATE
                  </span>
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
  )
}
