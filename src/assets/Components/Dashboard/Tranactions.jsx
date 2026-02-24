import React from "react";
import { useCustomers } from "../../../Context/CustomerContext";

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

export default function Tranactions() {
  const { customers } = useCustomers();

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

  return (
    <div>
      <section className="space-y-4 px-4 pb-24">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-lg">
            Recent Transactions
          </h3>
          <button className="text-xs font-bold text-green-600">View All</button>
        </div>

        <div className="space-y-3">
          {/* Transaction 1 */}

          <div className="space-y-3 mt-4">
            {customers.length === 0 && (
              <p className="text-center text-gray-400 py-6">
                No recent transactions
              </p>
            )}

            {customers
              .slice()
              .reverse()
              .map((customer) => (
              
                <div
                  key={customer.id}
                  className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm"
                >
                  {/* Left Section */}
                  <div className="flex items-center gap-3">
                    {" "}
                
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <span className="text-green-700 font-semibold text-sm">
                        {getInitials(customer.name)}
                      </span>
                    </div>
                    {/* Name + Time */}
                    <div className="flex flex-col items-start justify-center">
                      <p className="text-[15px] font-medium text-gray-800 leading-tight">
                        {customer.name}
                      </p>

                      
                      <p className="text-[11px] text-gray-400 mt-0.5 block text-left">
                        {timeAgo(customer.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="flex flex-col items-end justify-center">
                    <p className="text-base font-semibold text-gray-900 leading-none">
                      ৳ {customer.balance}
                    </p>

                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
                      Cash
                    </p>
                  </div>
                </div>
              ))}
          </div>

      
        </div>
      </section>
    </div>
  );
}
