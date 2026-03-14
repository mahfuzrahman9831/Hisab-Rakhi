import React, { useState } from "react";
import { useCustomers } from "../../../Context/CustomerContext";
import { getCustomerBalance } from "../../../utils/ledger";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";

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
  const [searchTerm, setSearchTerm] = useState("");


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
    // ✅ search filter যোগ করো
    .filter((c) =>
      searchTerm.trim() === "" ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.phone && c.phone.includes(searchTerm))
    )
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt || 0);
      const dateB = new Date(b.updatedAt || b.createdAt || 0);
      return dateB - dateA;
    });

  return (
    <section className="space-y-4 px-4 pb-24 pt-4">

      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900 text-lg">
          Favorite Customers
        </h3>

        {/* ✅ View All সরিয়ে Search Field দাও */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-36 bg-gray-100 border border-gray-200 rounded-full py-1.5 pl-3 pr-8 text-xs focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition"
          />
          {searchTerm ? (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          ) : (
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
              <IoSearchOutline className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2 mt-4">

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
              className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:bg-gray-50 active:scale-[0.99] transition"
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