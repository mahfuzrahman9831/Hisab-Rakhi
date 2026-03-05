import React from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerTransactionList({ transactions }) {

  const navigate = useNavigate();

  const getInitials = (text) => {
    if (!text || text.trim() === "") return "OT";
    return text.trim().slice(0, 2).toUpperCase();
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        No Transactions Found
      </div>
    );
  }

  const sorted = [...transactions].reverse();

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      {sorted.map((txn, index) => {
        const isSell = txn.sell > 0;
        const amount = isSell ? txn.sell : txn.buy;

        // running balance calculate
        const balance = sorted.slice(0, index + 1).reduce((acc, t) => {
          const sell = t.sell || 0;
          const buy = t.buy || 0;
          return acc + sell - buy;
        }, 0);

        return (
          <div
            key={txn.id}
            onClick={() => navigate(`/transaction/${txn.id}`)}
            className="px-3 py-2 border-b border-gray-100 hover:bg-gray-50 transition-all cursor-pointer active:scale-[0.98]"
          >
            <div className="flex items-center justify-between">
              <div>
                {/* LEFT SIDE */}
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm flex-shrink-0">
                    <span className="text-white font-bold text-sm">
                      {getInitials(txn.details)}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="flex flex-col items-start  gap-[2px]">
                    <span className="text-[13px] font-semibold text-gray-800">
                      {new Date(txn.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>

                    <span className="text-[11px] text-gray-400">
                      {new Date(txn.date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>

                    <span className="text-[11px] font-medium text-gray-500">
                      {txn.details || "Bkash"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                {/* AMOUNT */}
                <div
                  className={`font-semibold text-base ${
                    isSell ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {amount.toLocaleString("en-BD", {
                    minimumFractionDigits: 2,
                  })}
                </div>

                {/* BALANCE */}
                <div className="flex justify-end text-xs text-gray-400 mt-2">
                  {/* <span
                    className={`font-medium py-2 px-2 rounded-2xl ${
                      isSell
                        ? "text-red-600 bg-gray-200"
                        : "text-green-600 bg-gray-200"
                    }`}
                  >
                    {isSell ? "পাবো" : "দেবো"}{" "}
                    {Math.abs(balance).toLocaleString("en-BD", {
                      minimumFractionDigits: 2,
                    })}
                  </span> */}

                  <span
                    className={`text-[11px] font-semibold py-1.5 px-3 rounded-full ${
                      isSell
                        ? "text-red-600 bg-red-100"
                        : "text-green-600 bg-green-100"
                    }`}
                  >
                    {isSell ? "পাবো" : "দেবো"}{" "}
                    {Math.abs(balance).toLocaleString("en-BD", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      
    </div>
  );
}
