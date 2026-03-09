import React, { useState, useEffect } from "react";
import PageHeader from "../Common/Header";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useCustomers } from "../../../Context/CustomerContext";
import { useNavigate } from "react-router-dom";

export default function SingleTransactionPage() {
  const { transactionId } = useParams();
  const { transactions, deleteTransaction, updateTransaction } = useCustomers();
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setPreview(null);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!transactions || transactions.length === 0) {
    return null;
  }

  const transaction = transactions.find((t) => t.id == transactionId);

  if (!transaction) {
    return (
      <div className="flex items-center justify-center h-screen">
        Transaction not found
      </div>
    );
  }

  const isSell = transaction.sell > 0;
  const amount = isSell ? transaction.sell : transaction.buy;

  return (
    <main className="max-w-[380px] mx-auto w-full pb-24">
      <PageHeader title="Transaction Report" backTo="AUTO"></PageHeader>

      <div className="bg-gray-50 text-slate-900 antialiased min-h-screen">
        {/* Main */}
        <main className="px-1 mt-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[1.5fr_0.5fr_1fr_auto] bg-gray-50 border-b border-gray-100">
              <div className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                বিবরণ
              </div>

              <div className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                রেফারেন্স
              </div>

              <div className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                লেনদেন
              </div>

              <div className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                একশন
              </div>
            </div>

            {/* Transaction Row */}
            <div className="grid grid-cols-[1.2fr_0.8fr_1fr_auto] items-center py-5 px-2 border-b border-gray-100 bg-white">
              {/* COLUMN 1 : DATE + TIME + DETAILS */}
              <div className="flex flex-col text-start gap-1.5 leading-tight">
                <span className="text-[14px] font-semibold text-slate-800">
                  {new Date(transaction.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>

                <span className="text-[12px] text-slate-400">
                  {new Date(transaction.date).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>

                <span className="text-[12px] text-slate-500">
                  {transaction.details || "Bkash"}
                </span>
              </div>

              {/* COLUMN 2 : EMPTY */}
              <div className="flex justify-center">
                {transaction.image && (
                  <img
                    src={transaction.image}
                    alt="transaction"
                    className="w-12 h-12 rounded-md object-cover border cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreview(transaction.image);
                    }}
                  />
                )}
              </div>

              {/* COLUMN 3 : AMOUNT */}
              <div className="flex justify-center">
                <span
                  className={`font-semibold text-[16px] ${
                    isSell ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {amount.toLocaleString("en-BD", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              {/* COLUMN 4 : ACTIONS */}
              {/* <div
                className="flex flex-col items-end gap-3 pl-2"
                onClick={() =>
                  navigate(
                    `/customer/${transaction.customerId}/report/edit/${transaction.id}`,
                  )
                }
              >
                <button className="p-1 text-gray-400 hover:text-blue-600 transition">
                  <FiEdit2 size={16} />
                </button>

                <button
                  className="p-1 text-gray-400 hover:text-red-600 transition"
                  onClick={() => setShowDelete(true)}
                >
                  <FiTrash2 size={16} />
                </button>
              </div> */}

              <div className="flex flex-col items-end gap-3 pl-2">
                {/* EDIT */}
                <button
                  onClick={() =>
                    navigate(
                      `/customer/${transaction.customerId}/report/edit/${transaction.id}`,
                    )
                  }
                  className="p-1 text-gray-400 hover:text-blue-600 transition"
                >
                  <FiEdit2 size={16} />
                </button>

                {/* DELETE */}
                <button
                  onClick={() => setShowDelete(true)}
                  className="p-1 text-gray-400 hover:text-red-600 transition"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Share */}
          <div className="mt-4">
            <button className="w-full flex items-center justify-center gap-2 py-3.5 px-4 border border-amber-200 bg-amber-50 text-amber-800 font-semibold rounded-xl transition-all active:scale-[0.98]">
              <span className="material-symbols-outlined text-xl">share</span>

              <span className="text-[15px]">শেয়ার করুন</span>
            </button>
          </div>
        </main>

        {/* Bottom Handle */}
        <div className="fixed bottom-0 w-full h-8 flex justify-center items-end pb-2 pointer-events-none">
          <div className="w-32 h-1.5 bg-slate-200 rounded-full"></div>
        </div>
      </div>

      {/* IMAGE PREVIEW MODAL */}

      {preview && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setPreview(null)}
        >
          {/* CLOSE BUTTON */}
          <button
            className="absolute top-6 right-6 text-white text-3xl font-bold"
            onClick={() => setPreview(null)}
          >
            ×
          </button>

          {/* IMAGE */}
          <img
            src={preview}
            alt="preview"
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {showDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[280px] text-center">
            <h3 className="text-lg font-semibold mb-3">Delete Transaction?</h3>

            <p className="text-sm text-gray-500 mb-5">
              Are you sure you want to delete this transaction?
            </p>

            <div className="flex gap-3 justify-center">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg"
                onClick={() => setShowDelete(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={() => {
                  deleteTransaction(transaction.id);
                  setShowDelete(false);
                  navigate(-1);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-end gap-3 pl-2">
        {/* EDIT */}
        <button
          onClick={() =>
            navigate(
              `/customer/${transaction.customerId}/report/edit/${transaction.id}`,
            )
          }
          className="p-1 text-gray-400 hover:text-blue-600 transition"
        >
          <FiEdit2 size={16} />
        </button>

        {/* DELETE */}
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
          onClick={() => {
            deleteTransaction(Number(transaction.id));
            setShowDelete(false);
            navigate(-1);
          }}
        >
          Delete
        </button>
      </div>
    </main>
  );
}
