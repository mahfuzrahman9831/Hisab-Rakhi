import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerTransactionList({ transactions }) {

  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  // ESC key close
  useEffect(() => {

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setPreview(null);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);

  }, []);

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
  const ordered = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const sorted = [...ordered].reverse();

  return (
    <div className="flex-1 overflow-y-auto bg-white">

      {sorted.map((txn, index) => {

        const isSell = txn.sell > 0;
        const amount = isSell ? txn.sell : txn.buy;

        // running balance calculation
        const balance = ordered
          .slice(0, ordered.length - index)
          .reduce((acc, t) => {
            return acc + (t.sell || 0) - (t.buy || 0);
          }, 0);

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

            {/* IMAGE */}
            <div className="flex justify-center">

              {txn.image && (
                <img
                  src={txn.image}
                  alt="transaction"
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
                    balance > 0
                      ? "text-red-600 bg-red-100"
                      : "text-green-600 bg-green-100"
                  }`}
                >
                  {balance > 0 ? "পাবো" : "দেবো"}{" "}
                  {Math.abs(balance).toLocaleString("en-BD", {
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

          {/* CLOSE BUTTON */}
          <button
            className="absolute top-6 right-6 text-white text-3xl font-bold"
            onClick={() => setPreview(null)}
          >
            ×
          </button>

          <img
            src={preview}
            alt="preview"
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />

        </div>
      )}

    </div>
  );
}