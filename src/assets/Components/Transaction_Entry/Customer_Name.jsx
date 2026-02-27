import React from "react";
import { FiShare2 } from "react-icons/fi";

function getInitials(name) {
  if (!name) return "";

  const parts = name.trim().split(" ");

  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }

  const first = parts[0][0];
  const last = parts[parts.length - 1][0];

  return (first + last).toUpperCase();
}

export default function Customer_Name({ customer }) {
  const initials = getInitials(customer.name);

  return (
    <div className="px-4 py-6 bg-gray-50 border-b border-gray-100">
      <div className="flex items-center justify-between mb-4">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium text-xl shrink-0">
            {initials}
          </div>

          <div className="flex flex-col items-start justify-center">
            <h2 className="text-[15px] font-medium text-gray-800 leading-tight">
              {customer.name}
            </h2>
            <p className="text-sm text-gray-500 text-left">{customer.phone}</p>
          </div>
        </div>

        {/* Right Side Balance */}
        {/* Right Side Balance */}
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
            Current Balance
          </p>

          <p
            className={`text-xl font-bold ${
              customer.balance > 0
                ? "text-red-600" // You'll Get
                : customer.balance < 0
                  ? "text-green-600" // You'll Give
                  : "text-gray-400"
            }`}
          >
            {Math.abs(customer.balance).toLocaleString("en-BD", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>

      {/* Share Button */}
      <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
        <FiShare2 size={18} />
        Share Report
      </button>
    </div>
  );
}
