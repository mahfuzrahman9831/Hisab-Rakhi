import React from "react";
import { MdDashboard } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import { FaGear } from "react-icons/fa6";

export default function Footer_Nav() {
  return (
    <div>
     <nav className="fixed bottom-0 left-0 right-0 bg-white px-6 py-3 z-50 shadow-md">
      <div className="flex justify-between items-center max-w-sm mx-auto">
        
        <a className="flex flex-col items-center gap-1 text-blue-600" href="#">
          <MdDashboard size={22} />
          <span className="text-[11px] font-semibold">Home</span>
        </a>


        <a className="flex flex-col items-center gap-1 text-gray-500" href="#">
          <MdGroups size={22} />
          <span className="text-[11px]">Customers</span>
        </a>

        <a className="flex flex-col items-center gap-1 text-gray-500" href="#">
          <IoStatsChart size={22} />
          <span className="text-[11px]">Reports</span>
        </a>

        <a className="flex flex-col items-center gap-1 text-gray-500" href="#">
          <FaGear size={22} />
          <span className="text-[11px]">Settings</span>
        </a>

      </div>
    </nav>
    </div>
  );
}
