import React, { useState } from "react";
import { useCustomers } from "../../../Context/CustomerContext";
import { MdChevronRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Search_Sort from "./Search_Sort";
import Search_Input from "./Search_Input";

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
    if (interval > 1) return interval + " " + intervals[i].label + "s ago";
    if (interval === 1) return interval + " " + intervals[i].label + " ago";
  }

  return "Just now";
}

export default function Customer_list() {

  const [searchTerm, setSearchTerm] = useState("");

  const { customers } = useCustomers();
  const navigate = useNavigate();

  const [dueOnly, setDueOnly] = useState(false);
  const [sortType, setSortType] = useState(null);

  // 🔥 PROCESSING SECTION
  let processedCustomers = [...customers];

  if (searchTerm.trim() !== "") {
  processedCustomers = processedCustomers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );
}

  // Sort by latest update first (default behaviour)
  processedCustomers.sort((a, b) => {
    const dateA = new Date(a.updatedAt || a.createdAt || 0);
    const dateB = new Date(b.updatedAt || b.createdAt || 0);
    return dateB - dateA;
  });

  // Due Only Filter
  if (dueOnly) {
    processedCustomers = processedCustomers.filter(
      (c) => c.balance > 0
    );
  }

  // Balance Sorting
  if (sortType === "high") {
    processedCustomers.sort((a, b) => b.balance - a.balance);
  }

  if (sortType === "low") {
    processedCustomers.sort((a, b) => a.balance - b.balance);
  }

  return (
    <>
      {/* 🔥 RENDER SECTION FOR FILTER & SORT */}
      <Search_Sort
        dueOnly={dueOnly}
        setDueOnly={setDueOnly}
        sortType={sortType}
        setSortType={setSortType}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* 🔥 CUSTOMER LIST RENDER */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        {processedCustomers.map((customer) => (
          <div
            key={customer.id}
            onClick={() => navigate(`/customer/${customer.id}`)}
            className="flex items-center justify-between px-4 py-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 active:scale-[0.995] transition-all cursor-pointer"
          >
            {/* Left */}
            <div className="flex flex-col items-start justify-center">
              <span className="text-[15px] font-medium text-gray-800 leading-tight">
                {customer.name}
              </span>

              <span className="text-[11px] text-gray-400 mt-0.5 tracking-wide">
                {timeAgo(customer.updatedAt || customer.createdAt)}
              </span>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
              <span
                className={`text-[15px] font-semibold ${
                  customer.balance > 0
                    ? "text-red-600"
                    : customer.balance < 0
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                {Math.abs(customer.balance).toLocaleString("en-BD", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>

              <MdChevronRight
                className="text-gray-400 text-xl cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}