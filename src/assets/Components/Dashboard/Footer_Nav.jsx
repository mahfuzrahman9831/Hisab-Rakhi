import React from "react";
import { MdDashboard } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export default function Footer_Nav() {
  return (
    <div>
     <nav className="fixed bottom-0 left-0 right-0 z-50 pointer-events-auto">
      <div className="flex justify-between items-center max-w-sm mx-auto">

        <NavLink 
           to="/" end 
           className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${
                isActive
                  ? "text-green-500"
                  : "text-gray-400"
              }`
            }
           >
          <MdDashboard size={22} />
          <span className="text-[11px] font-semibold">Home</span>
        </NavLink>
        
    

         <NavLink 
           to="/customer" 
           className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${
                isActive
                  ? "text-green-500"
                  : "text-gray-400"
              }`
            }
           >
         <MdGroups size={22} />
          <span className="text-[11px]">Customers</span>
        </NavLink>


        <NavLink 
         to="/report" className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${
                isActive
                  ? "text-green-500"
                  : "text-gray-400"
              }`
            }>
          <IoStatsChart size={22} />
          <span className="text-[11px]">Reports</span>
        </NavLink>

  

        <NavLink 
          to="/settings" 
          className={({ isActive }) =>
              `flex flex-col items-center gap-1 ${
                isActive
                  ? "text-green-500"
                  : "text-gray-400"
              }`
            }>
          <FaGear size={22} />
          <span className="text-[11px]">Settings</span>
        </NavLink>

      </div>
    </nav>
    </div>
  );
}
