import React from 'react'
import { IoChevronBack } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function Customer_Transaction_Header() {
  return (
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-100">

                <div className="flex items-center justify-between px-4 py-4">

                    {/* Back Button */}
                    <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-green-50 transition-colors">
                    <IoChevronBack className="text-gray-900 text-lg" />
                    </button>

                    {/* Title */}
                    <div className="text-center">
                    <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900">
                        Rahim Uddin
                    </h1>
                    <p className="text-xs text-gray-500 font-medium">
                        Customer Report
                    </p>
                    </div>

                    {/* Menu Button */}
                    <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-green-50 transition-colors">
                    <HiOutlineDotsVertical className="text-gray-900 text-lg" />
                    </button>

                </div>
                </header>
  )
}
