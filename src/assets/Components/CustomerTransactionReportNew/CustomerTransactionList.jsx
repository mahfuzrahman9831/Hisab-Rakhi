import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerTransactionList({ transactions }) {

  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

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

  // chronological order
  let running = 0;

  const ordered = [...transactions]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((txn) => {
      running += (txn.sell || 0) - (txn.buy || 0);
      return { ...txn, balance: running };
    });

  const sorted = [...ordered].reverse();

  return (
    <div className="flex-1 overflow-y-auto bg-white">

      {sorted.map((txn) => {

        const isSell = txn.sell > 0;
        const amount = isSell ? txn.sell : txn.buy;

        return (

          <div
            key={txn.id}
            onClick={() => navigate(`/transaction/${txn.id}`)}
            className="grid grid-cols-[1fr_60px_110px] items-center px-3 py-3 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer"
          >

            {/* LEFT SIDE */}
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">
                {getInitials(txn.details)}
              </div>

              <div className="flex flex-col">

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

                {txn.details && (
                  <span className="text-[11px] text-gray-500">
                    {txn.details}
                  </span>
                )}

              </div>
            </div>

            {/* MIDDLE IMAGE */}
            <div className="flex justify-center">

              {txn.image && (
                <img
                  src={txn.image}
                  alt="txn"
                  className="w-10 h-10 rounded-md object-cover border cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreview(txn.image);
                  }}
                />
              )}

            </div>

            {/* RIGHT SIDE */}
            <div className="text-right">

              <div
                className={`font-semibold ${
                  isSell ? "text-red-600" : "text-green-600"
                }`}
              >
                {amount.toLocaleString("en-BD", {
                  minimumFractionDigits: 2,
                })}
              </div>

              <div className="mt-1">

                <span
                  className={`text-[11px] font-semibold py-1 px-3 rounded-full ${
                    txn.balance > 0
                      ? "text-red-600 bg-red-100"
                      : "text-green-600 bg-green-100"
                  }`}
                >
                  {txn.balance > 0 ? "পাবো" : "দেবো"}{" "}
                  {Math.abs(txn.balance).toLocaleString("en-BD", {
                    minimumFractionDigits: 2,
                  })}
                </span>

              </div>

            </div>

          </div>

        );

      })}

      {/* IMAGE PREVIEW MODAL */}

      {preview && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setPreview(null)}
        >
          <img
            src={preview}
            alt="preview"
            className="max-w-[90%] max-h-[90%] rounded-xl"
          />
        </div>
      )}

    </div>
  );
}