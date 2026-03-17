import React, { useState } from "react";
import { useCustomers } from "../Context/CustomerContext";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoTrashOutline, IoRefreshOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { FiTrash2, FiUser } from "react-icons/fi";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-BD", {
    year: "numeric", month: "long", day: "numeric",
  });
}

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

function daysLeft(deletedAt) {
  const diff = 30 - Math.floor((new Date() - new Date(deletedAt)) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
}

export default function TrashPage() {
  const {
    trashedTransactions, restoreTransaction, permanentDelete,
    trashedCustomers, restoreCustomer, permanentDeleteCustomer,
    customers,
  } = useCustomers();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("transactions"); // "transactions" | "customers"
  const [confirmId, setConfirmId] = useState(null);
  const [confirmType, setConfirmType] = useState(null); // "transaction" | "customer"
  const [expandedCustomer, setExpandedCustomer] = useState(null);

  const getCustomerName = (id) => {
    const c = customers.find((c) => c.id === id);
    return c?.name || "Unknown";
  };

  // ✅ Transaction — date অনুযায়ী group
  const sortedTxns = [...trashedTransactions].sort(
    (a, b) => new Date(b.deletedAt) - new Date(a.deletedAt)
  );
  const groupedByDate = sortedTxns.reduce((groups, txn) => {
    const date = formatDate(txn.deletedAt);
    if (!groups[date]) groups[date] = [];
    groups[date].push(txn);
    return groups;
  }, {});

  // ✅ Customer — date sort
  const sortedCustomers = [...trashedCustomers].sort(
    (a, b) => new Date(b.deletedAt) - new Date(a.deletedAt)
  );

  const handleConfirmDelete = () => {
    if (confirmType === "transaction") permanentDelete(confirmId);
    if (confirmType === "customer") permanentDeleteCustomer(confirmId);
    setConfirmId(null);
    setConfirmType(null);
  };

  const totalCount = trashedTransactions.length + trashedCustomers.length;

  return (
    <div className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6]">

      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 pt-6 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 transition">
          <MdArrowBackIosNew size={18} />
        </button>
        <h1 className="text-lg font-bold text-slate-800 flex-1">ট্র্যাশ</h1>
        {totalCount > 0 && (
          <span className="text-xs bg-red-100 text-red-500 font-bold px-2 py-1 rounded-full">
            {totalCount}
          </span>
        )}
      </div>

      {/* ✅ Tabs */}
      <div className="flex bg-white border-b border-gray-100 px-4">
        <button
          onClick={() => setActiveTab("transactions")}
          className={`flex-1 py-3 text-sm font-semibold border-b-2 transition ${
            activeTab === "transactions"
              ? "border-green-500 text-green-600"
              : "border-transparent text-gray-400"
          }`}
        >
          লেনদেন
          {trashedTransactions.length > 0 && (
            <span className="ml-1.5 text-xs bg-red-100 text-red-500 px-1.5 py-0.5 rounded-full">
              {trashedTransactions.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("customers")}
          className={`flex-1 py-3 text-sm font-semibold border-b-2 transition ${
            activeTab === "customers"
              ? "border-green-500 text-green-600"
              : "border-transparent text-gray-400"
          }`}
        >
          কাস্টমার
          {trashedCustomers.length > 0 && (
            <span className="ml-1.5 text-xs bg-red-100 text-red-500 px-1.5 py-0.5 rounded-full">
              {trashedCustomers.length}
            </span>
          )}
        </button>
      </div>

      <div className="px-4 py-4 space-y-3">

        {/* =================== TRANSACTIONS TAB =================== */}
        {activeTab === "transactions" && (
          <>
            {sortedTxns.length === 0 && <EmptyState />}

            {Object.entries(groupedByDate).map(([date, txns]) => (
              <div key={date}>
                {/* Date Divider */}
                <div className="flex items-center gap-2 py-2">
                  <div className="h-px flex-1 bg-gray-200"></div>
                  <span className="text-xs font-semibold text-gray-400 px-2">{date}</span>
                  <div className="h-px flex-1 bg-gray-200"></div>
                </div>

                <div className="space-y-3">
                  {txns.map((txn) => (
                    <div key={txn.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">
                            {getCustomerName(txn.customerId)}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            মুছেছেন {timeAgo(txn.deletedAt)} •{" "}
                            <span className="text-orange-400">{daysLeft(txn.deletedAt)} দিন বাকি</span>
                          </p>
                        </div>
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

                      {txn.details && (
                        <p className="text-xs text-gray-500 mb-3 border-t border-gray-100 pt-2">
                          {txn.details}
                        </p>
                      )}

                      <div className="flex gap-2 border-t border-gray-100 pt-3">
                        <button
                          onClick={() => restoreTransaction(txn.id)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-green-50 text-green-600 text-xs font-semibold hover:bg-green-100 active:scale-95 transition"
                        >
                          <IoRefreshOutline size={14} />
                          পুনরুদ্ধার
                        </button>
                        <button
                          onClick={() => { setConfirmId(txn.id); setConfirmType("transaction"); }}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-50 text-red-500 text-xs font-semibold hover:bg-red-100 active:scale-95 transition"
                        >
                          <IoTrashOutline size={14} />
                          চিরতরে মুছুন
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {/* =================== CUSTOMERS TAB =================== */}
        {activeTab === "customers" && (
          <>
            {sortedCustomers.length === 0 && <EmptyState type="customer" />}

            {sortedCustomers.map((customer) => (
              <div key={customer.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                {/* Customer Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <FiUser className="text-green-600" size={16} />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{customer.name}</p>
                        {customer.phone && (
                          <p className="text-xs text-gray-400">{customer.phone}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-0.5">
                          মুছেছেন {timeAgo(customer.deletedAt)} •{" "}
                          <span className="text-orange-400">{daysLeft(customer.deletedAt)} দিন বাকি</span>
                        </p>
                      </div>
                    </div>

                    {/* Transaction count */}
                    {customer.trashedTransactions?.length > 0 && (
                      <button
                        onClick={() => setExpandedCustomer(
                          expandedCustomer === customer.id ? null : customer.id
                        )}
                        className="flex items-center gap-1 text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full"
                      >
                        {customer.trashedTransactions.length}টি লেনদেন
                        {expandedCustomer === customer.id
                          ? <IoChevronUp size={12} />
                          : <IoChevronDown size={12} />
                        }
                      </button>
                    )}
                  </div>

                  {/* ✅ Expanded transactions */}
                  {expandedCustomer === customer.id && customer.trashedTransactions?.length > 0 && (
                    <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
                      {customer.trashedTransactions.map((txn) => (
                        <div key={txn.id} className="flex justify-between items-center bg-gray-50 rounded-xl px-3 py-2">
                          <p className="text-xs text-gray-500">
                            {formatDate(txn.date)}
                            {txn.details && ` — ${txn.details}`}
                          </p>
                          <div className="text-right">
                            {txn.sell > 0 && (
                              <p className="text-xs font-bold text-red-500">-৳{txn.sell}</p>
                            )}
                            {txn.buy > 0 && (
                              <p className="text-xs font-bold text-green-600">+৳{txn.buy}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-2 px-4 pb-4">
                  <button
                    onClick={() => restoreCustomer(customer.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-green-50 text-green-600 text-xs font-semibold hover:bg-green-100 active:scale-95 transition"
                  >
                    <IoRefreshOutline size={14} />
                    পুনরুদ্ধার
                  </button>
                  <button
                    onClick={() => { setConfirmId(customer.id); setConfirmType("customer"); }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-50 text-red-500 text-xs font-semibold hover:bg-red-100 active:scale-95 transition"
                  >
                    <IoTrashOutline size={14} />
                    চিরতরে মুছুন
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* ✅ Confirm Modal */}
      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => { setConfirmId(null); setConfirmType(null); }} />
          <div className="relative bg-white rounded-3xl w-full max-w-[300px] p-6 shadow-2xl z-10">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                <FiTrash2 className="text-red-500 text-2xl" />
              </div>
            </div>
            <h3 className="text-center font-bold text-slate-800 mb-2">চিরতরে মুছবেন?</h3>
            <p className="text-center text-sm text-gray-500 mb-6">
              {confirmType === "customer"
                ? "এই কাস্টমার ও তার সব লেনদেন চিরতরে মুছে যাবে।"
                : "এই লেনদেন চিরতরে মুছে যাবে।"
              }<br />আর ফেরানো যাবে না।
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => { setConfirmId(null); setConfirmType(null); }}
                className="flex-1 py-3 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition"
              >
                বাতিল
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition"
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

// ✅ Empty State Component
function EmptyState({ type = "transaction" }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-full bg-white shadow-sm flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center">
            {type === "customer"
              ? <FiUser size={40} className="text-gray-300" />
              : <FiTrash2 size={40} className="text-gray-300" />
            }
          </div>
        </div>
        <div className="absolute top-2 right-0 w-3 h-3 rounded-full bg-green-200"></div>
        <div className="absolute bottom-2 left-0 w-2 h-2 rounded-full bg-red-200"></div>
        <div className="absolute top-8 -left-3 w-2 h-2 rounded-full bg-yellow-200"></div>
      </div>
      <h3 className="text-lg font-bold text-slate-700 mb-2">ট্র্যাশ খালি আছে</h3>
      <p className="text-sm text-gray-400 text-center leading-relaxed max-w-[240px]">
        {type === "customer"
          ? "মুছে ফেলা কাস্টমার এখানে জমা থাকবে।"
          : "মুছে ফেলা লেনদেন এখানে জমা থাকবে।"
        }
      </p>
    </div>
  );
}
