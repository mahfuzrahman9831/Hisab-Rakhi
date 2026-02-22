import React from "react";
import { FaUserPlus } from "react-icons/fa";

export default function AddCustomerFooter() {
  return (
    <div>
      <footer className="p-5 bg-white border-t border-gray-100">
        <button className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] transition-all text-white h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-green-600/20">
          <FaUserPlus size={18} />
          Add Customer
        </button>

        <div className="h-6 w-full"></div>
      </footer>
    </div>
  );
}
