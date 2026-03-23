import React from "react";
import { getCustomerBalance } from "../../../../src/utils/ledger";
import { motion } from "framer-motion";

export default function CustomerTransactionHeaderCard({ customer, transactions }) {
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const balance = getCustomerBalance(transactions, customer?.id);

  return (
    <div className="pt-3 px-2 pb-1">
      {/* ✅ Card scale in */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.05 }}
        className="relative rounded-3xl p-6 overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
      >
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-green-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-400/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          {/* ✅ Customer name */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="text-center mb-6"
          >
            <h1 className="text-green-600 text-2xl font-bold tracking-tight">
              {customer?.name}
            </h1>
          </motion.div>

          {/* ✅ Balance — pop in */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.2 }}
            className="text-center"
          >
            <motion.div
              key={balance}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`text-3xl font-bold flex items-center justify-center gap-1 ${
                balance > 0 ? "text-red-500"
                : balance < 0 ? "text-green-500"
                : "text-gray-400"
              }`}
            >
              <span className="text-2xl font-semibold">৳</span>
              {Math.abs(balance).toLocaleString("en-BD", { minimumFractionDigits: 2 })}
            </motion.div>
            <p className="text-green-600 text-xs mt-1 uppercase tracking-widest">
              Current Balance
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}