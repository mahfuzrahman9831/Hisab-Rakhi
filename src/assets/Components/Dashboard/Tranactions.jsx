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
                  className="flex items-center justify-between bg-white p-3 rounded-2xl border border-gray-100 shadow-sm"
                >
                  {/* Left Side */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 text-lg">👤</span>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {customer.name}
                      </p>

                      <p className="text-[11px] text-gray-500">
                        {timeAgo(customer.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">
                      ৳ {customer.balance}
                    </p>

                    <p className="text-[11px] text-gray-400">Cash</p>
                  </div>
                </div>
              ))}
          </div>

          {/* Transaction 2 */}
          {/* <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
          <span className="text-red-600 text-lg">📦</span>
        </div>
        <div>
          <p className="text-sm font-semibold">Inventory Purchase</p>
          <p className="text-[11px] text-gray-500">
            11 Jun • 04:15 PM
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-red-600">
          -৳ 4,500
        </p>
        <p className="text-[11px] text-gray-400">Bank</p>
      </div>
        </div> */}

          
        </div>
      </section>
    </div>
  );
}
