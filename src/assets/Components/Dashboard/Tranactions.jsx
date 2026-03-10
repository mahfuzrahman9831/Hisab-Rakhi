import React from "react";
import { useCustomers } from "../../../Context/CustomerContext";
import { getCustomerBalance } from "../../../utils/ledger";
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
    if (interval > 1) return interval + " " + intervals[i].label + "s ago";
    if (interval === 1) return interval + " " + intervals[i].label + " ago";
  }

  return "Just now";
}

export default function Tranactions() {

  const { customers, transactions } = useCustomers();
  const navigate = useNavigate();

  function getInitials(name) {
    if (!name) return "";

    const parts = name.trim().split(" ");

    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }

    return (
      parts[0][0] +
      parts[parts.length - 1][0]
    ).toUpperCase();
  }

  const favoriteCustomers = customers
  .filter((c) => c.favorite)
  .sort((a, b) => {
    const dateA = new Date(a.updatedAt || a.createdAt || 0);
    const dateB = new Date(b.updatedAt || b.createdAt || 0);
    return dateB - dateA; // newest first
  });

  return (
    <section className="space-y-4 px-4 pb-24">

      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900 text-lg">
          Favorite Customers
        </h3>

        <button className="text-xs font-bold text-green-600">
          View All
        </button>
      </div>

      <div className="space-y-3 mt-4">

        {favoriteCustomers.length === 0 && (
          <p className="text-center text-gray-400 py-6">
            No favorite customers yet
          </p>
        )}

        {favoriteCustomers.map((customer) => {

          const balance = getCustomerBalance(transactions, customer.id);

          return (
            <div
              key={customer.id}
              onClick={() => navigate(`/customer/${customer.id}`)}
              className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm cursor-pointer hover:bg-gray-50 active:scale-[0.99] transition"
            >

              {/* LEFT */}
              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <span className="text-green-700 font-semibold text-sm">
                    {getInitials(customer.name)}
                  </span>
                </div>

                <div className="flex flex-col items-start">

                  <p className="text-[15px] font-medium text-gray-800 leading-tight">
                    {customer.name}
                  </p>

                  <p className="text-[11px] text-gray-400 mt-0.5">
                    {timeAgo(customer.updatedAt || customer.createdAt)}
                  </p>

                </div>

              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-end">

                <p
                  className={`text-base font-semibold ${
                    balance > 0
                      ? "text-red-600"
                      : balance < 0
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  ৳ {Math.abs(balance).toLocaleString("en-BD")}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}