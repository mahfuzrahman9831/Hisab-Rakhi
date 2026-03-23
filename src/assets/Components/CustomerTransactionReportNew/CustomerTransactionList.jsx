import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRunningBalances } from "../../../utils/ledger";
import { motion, AnimatePresence } from "framer-motion";
import { listVariants, listItemVariants } from "../../../utils/animations";

export default function CustomerTransactionList({ transactions }) {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") setPreview(null); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const getInitials = (text) => {
    if (!text || text.trim() === "") return "OT";
    return text.trim().slice(0, 2).toUpperCase();
  };

  if (!transactions || transactions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center py-10 text-gray-400"
      >
        No Transactions Found
      </motion.div>
    );
  }

  const ordered = getRunningBalances(transactions);
  const sorted = [...ordered].reverse();

  return (
    <div className="flex-1 overflow-y-auto bg-white scrollbar-hide">

      {/* ✅ Stagger list */}
      <motion.div
        variants={listVariants}
        initial="initial"
        animate="animate"
      >
        {sorted.map((txn, index) => {
          const isSell = txn.sell > 0;
          const amount = isSell ? txn.sell : txn.buy;
          const currentIndex = ordered.length - 1 - index;
          const balance = ordered
            .slice(0, currentIndex + 1)
            .reduce((acc, t) => acc + (t.sell || 0) - (t.buy || 0), 0);

          return (
            // ✅ Each row animate
            <motion.div
              key={txn.id}
              variants={listItemVariants}
              whileTap={{ backgroundColor: "#f9fafb", scale: 0.99 }}
              onClick={() => navigate(`/transaction/${txn.id}`)}
              className="grid grid-cols-[1fr_50px_auto] items-center px-3 py-3 border-b border-gray-100 cursor-pointer"
            >
              {/* LEFT */}
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: index * 0.03 }}
                  className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-sm shrink-0"
                >
                  {getInitials(txn.details)}
                </motion.div>

                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold text-gray-800">
                    {new Date(txn.date).toLocaleDateString("en-GB", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {new Date(txn.date).toLocaleTimeString("en-US", {
                      hour: "2-digit", minute: "2-digit", hour12: true,
                    })}
                  </span>
                  {txn.details && (
                    <span className="text-[11px] text-gray-500">{txn.details}</span>
                  )}
                </div>
              </div>

              {/* IMAGE */}
              <div className="flex justify-center">
                {txn.image && (
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                    src={txn.image}
                    alt="transaction"
                    className="w-10 h-10 rounded-md object-cover border cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); setPreview(txn.image); }}
                  />
                )}
              </div>

              {/* RIGHT */}
              <div className="text-right pl-2">
                <div className={`font-semibold whitespace-nowrap ${isSell ? "text-red-600" : "text-green-600"}`}>
                  {amount.toLocaleString("en-BD", { minimumFractionDigits: 2 })}
                </div>
                <div className="mt-1">
                  <span className={`text-[11px] font-semibold py-1 px-2 rounded-full whitespace-nowrap ${
                    balance > 0 ? "text-red-600 bg-red-100" : "text-green-600 bg-green-100"
                  }`}>
                    {balance > 0 ? "পাবো" : "দেবো"}{" "}
                    {Math.abs(balance).toLocaleString("en-BD", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ✅ Image Preview Modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setPreview(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="absolute top-6 right-6 text-white text-3xl font-bold"
              onClick={() => setPreview(null)}
            >
              ×
            </motion.button>
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              src={preview}
              alt="preview"
              className="max-w-[90%] max-h-[90%] rounded-xl shadow-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}