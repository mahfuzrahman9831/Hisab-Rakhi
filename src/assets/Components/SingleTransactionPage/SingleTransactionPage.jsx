import React from "react";
import PageHeader from "../Common/Header";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useCustomers } from "../../../Context/CustomerContext";

export default function SingleTransactionPage() {

 const { transactionId } = useParams();
  const { transactions } = useCustomers();


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
              <div></div>

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
              <div className="flex flex-col items-end gap-3 pl-2">
                <button className="p-1 text-gray-400 hover:text-blue-600 transition">
                  <FiEdit2 size={16} />
                </button>

                <button className="p-1 text-gray-400 hover:text-red-600 transition">
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

    </main>
  );
}
