import React from "react";
import { useCustomers } from "../../../Context/CustomerContext";
import { MdChevronRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";



function timeAgo(date) {
  if (!date) return "Just now";

  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (let i = 0; i < intervals.length; i++) {
    const interval = Math.floor(seconds / intervals[i].seconds);
    if (interval > 1) {
      return interval + " " + intervals[i].label + "s ago";
    }
    if (interval === 1) {
      return interval + " " + intervals[i].label + " ago";
    }
  }

  return "Just now";
}

export default function Customer_list() {
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

  const { customers } = useCustomers();

  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      {customers
        .slice()
        .reverse()
        .map((customer) => (
          <div
            key={customer.id}
            className="flex items-center justify-between px-4 py-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition"
          >
            <div className="flex flex-col items-start justify-center">
              <span className="text-[15px] font-medium text-gray-800 leading-tight">
                {customer.name}
              </span>

              <span className="text-[11px] text-gray-400 mt-0.5 tracking-wide">
                {timeAgo(customer.createdAt)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[15px] font-medium text-gray-800">
                ৳{customer.balance}
              </span>

              <MdChevronRight
                onClick={() => navigate(`/customer/${customer.id}`)}
                className="text-gray-400 text-xl cursor-pointer"
              />
            </div>
             </div>
        ))}
    </div>
    
  );
};
