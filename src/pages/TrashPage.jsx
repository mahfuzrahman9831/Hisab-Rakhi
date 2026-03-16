import React, { useState } from "react";
import { useCustomers } from "../Context/CustomerContext";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoTrashOutline, IoRefreshOutline } from "react-icons/io5";
import { FiTrash2 } from "react-icons/fi";

function timeAgo(date) {
  if (!date) return "";
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];
  for (let i of intervals) {
    const n = Math.floor(seconds / i.seconds);
    if (n >= 1) return n + " " + i.label + (n > 1 ? "s" : "") + " ago";
  }
  return "Just now";
}

export default function TrashPage() {
  const { trashedTransactions, restoreTransaction, permanentDelete, customers } = useCustomers();
  const navigate = useNavigate();
  const [confirmId, setConfirmId] = useState(null);

  const getCustomerName = (id) => {
    const c = customers.find((c) => c.id === id);
    return c?.name || "Unknown";
  };

  const sorted = [...trashedTransactions].sort(
    (a, b) => new Date(b.deletedAt) - new Date(a.deletedAt)
  );

  return (
    <div className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6]">

      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 pt-6 pb-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <MdArrowBackIosNew size={18} />
        </button>
        <h1 className="text-lg font-bold text-slate-800 flex-1">ট্র্যাশ</h1>
        {sorted.length > 0 && (
          <span className="text-xs bg-red-100 text-red-500 font-bold px-2 py-1 rounded-full">
            {sorted.length}
          </span>
        )}
      </div>

      <div className="px-4 py-4 space-y-3">

        {/* ✅ Empty State */}
        {sorted.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-6">

            {/* Illustration */}
            <div className="relative mb-8">
              <div className="w-32 h-32 rounded-full bg-white shadow-sm flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center">
                  <FiTrash2 size={40} className="text-gray-300" />
                </div>
              </div>
              {/* Decorative dots */}
              <div className="absolute top-2 right-0 w-3 h-3 rounded-full bg-green-200"></div>
              <div className="absolute bottom-2 left-0 w-2 h-2 rounded-full bg-red-200"></div>
              <div className="absolute top-8 -left-3 w-2 h-2 rounded-full bg-yellow-200"></div>
            </div>

            <h3 className="text-lg font-bold text-slate-700 mb-2">
              ট্র্যাশ খালি আছে
            </h3>
            <p className="text-sm text-gray-400 text-center leading-relaxed mb-8 max-w-[240px]">
              আপনি কোনো লেনদেন মুছলে সেটা এখানে জমা থাকবে। চাইলে পুনরুদ্ধার করতে পারবেন।
            </p>

           
          </div>
        )}

        {/* ✅ Trash List */}
        {sorted.map((txn) => (
          <div
            key={txn.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
          >
            {/* Top Row */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-slate-800 text-sm">
                  {getCustomerName(txn.customerId)}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  মুছেছেন {timeAgo(txn.deletedAt)}
                </p>
              </div>

              {/* Amount */}
              <div className="text-right">
                {txn.sell > 0 && (
                  <p className="text-sm font-bold text-red-500">
                    দিলাম: ৳{txn.sell.toLocaleString("en-BD")}
                  </p>
                )}
                {txn.buy > 0 && (
                  <p className="text-sm font-bold text-green-600">
                    পেলাম: ৳{txn.buy.toLocaleString("en-BD")}
                  </p>
                )}
              </div>
            </div>

            {/* Details */}
            {txn.details && (
              <p className="text-xs text-gray-500 mb-3 border-t pt-2 border-gray-100">
                {txn.details}
              </p>
            )}

            {/* Date */}
            <p className="text-[10px] text-gray-300 mb-3">
              {new Date(txn.date).toLocaleDateString("en-BD", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-2 border-t border-gray-100 pt-3">
              <button
                onClick={() => restoreTransaction(txn.id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-green-50 text-green-600 text-xs font-semibold hover:bg-green-100 active:scale-95 transition"
              >
                <IoRefreshOutline size={14} />
                পুনরুদ্ধার করুন
              </button>

              <button
                onClick={() => setConfirmId(txn.id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-50 text-red-500 text-xs font-semibold hover:bg-red-100 active:scale-95 transition"
              >
                <IoTrashOutline size={14} />
                চিরতরে মুছুন
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Confirm Delete Modal */}
      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setConfirmId(null)}
          />
          <div className="relative bg-white rounded-3xl w-full max-w-[300px] p-6 shadow-2xl z-10">

            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                <FiTrash2 className="text-red-500 text-2xl" />
              </div>
            </div>

            <h3 className="text-center font-bold text-slate-800 mb-2">
              চিরতরে মুছবেন?
            </h3>
            <p className="text-center text-sm text-gray-500 mb-6">
              এই লেনদেন চিরতরে মুছে যাবে।<br />আর ফেরানো যাবে না।
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="flex-1 py-3 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 active:scale-95 transition"
              >
                বাতিল
              </button>
              <button
                onClick={() => { permanentDelete(confirmId); setConfirmId(null); }}
                className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold active:scale-95 transition"
              >
                মুছুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}