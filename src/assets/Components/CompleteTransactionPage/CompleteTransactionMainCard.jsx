import React from "react";
import { useLocation } from "react-router-dom";
import { useCustomers } from "../../../Context/CustomerContext";
import { getCustomerBalance } from "../../../utils/ledger";
import { motion } from "framer-motion"; 

const DetailRow = ({ label, value, colorClass = "text-gray-700", isBold = false }) => (
  <div className="flex justify-between items-center py-1">
    <span className="text-gray-600 font-medium">{label}</span>
    <span className={`${isBold ? "font-bold" : "font-semibold"} ${colorClass} font-sans`}>
      {value}
    </span>
  </div>
);

const TransactionSuccessCard = () => {
  const location = useLocation();
  const { customers, transactions } = useCustomers();

  const { customerId, sell = 0, buy = 0 } = location.state || {};

  const customer = customers.find((c) => c.id === Number(customerId));
  const currentBalance = getCustomerBalance(transactions, Number(customerId));
  const previousBalance = currentBalance - (sell - buy);

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    // ✅ Card slide up
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
      className="w-full bg-white rounded-[2.5rem] pt-12 pb-8 px-6 shadow-sm border border-gray-100"
    >
      {/* ✅ Title fade in */}
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="text-xl font-bold text-center mb-8 text-gray-800"
      >
        Transaction recorded.
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.3 }}
        className="bg-[#f8faf9] rounded-2xl p-5 space-y-4 border border-gray-50"
      >
        {/* ✅ User Info — slide in */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.35 }}
          className="flex items-center space-x-3 border-b border-gray-100 pb-4"
        >
          {/* ✅ Avatar bounce */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.45 }}
            className="w-12 h-12 rounded-full bg-[#005a9e] flex items-center justify-center text-white font-bold text-lg"
          >
            {getInitials(customer?.name)}
          </motion.div>

          <div>
            <div className="font-bold text-gray-800 leading-tight">{customer?.name}</div>
            <div className="text-xs text-gray-400 font-sans">{customer?.phone}</div>
          </div>
        </motion.div>

        {/* ✅ Table rows — stagger */}
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.48, duration: 0.3 }}
          >
            <DetailRow
              label="Previous Balance"
              value={Math.abs(previousBalance).toLocaleString("en-BD", {
                minimumFractionDigits: 2, maximumFractionDigits: 2,
              })}
            />
          </motion.div>

          {sell > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.54, duration: 0.3 }}
            >
              <DetailRow
                label="Sell / দিলাম"
                value={sell.toLocaleString("en-BD")}
                colorClass="text-rose-500"
                isBold
              />
            </motion.div>
          )}

          {buy > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.54, duration: 0.3 }}
            >
              <DetailRow
                label="Buy / পেলাম"
                value={buy.toLocaleString("en-BD")}
                colorClass="text-[#00a65a]"
                isBold
              />
            </motion.div>
          )}

          {/* ✅ Current Balance — pop in */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.35 }}
            className="pt-4 border-t border-gray-100 flex justify-between items-center"
          >
            <span className="text-gray-700 font-bold">Current Balance</span>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.65 }}
              className="flex flex-col items-end leading-tight"
            >
              <span className={`font-bold text-xl font-sans ${
                currentBalance > 0 ? "text-red-600"
                : currentBalance < 0 ? "text-green-600"
                : "text-gray-400"
              }`}>
                ৳{Math.abs(currentBalance).toLocaleString("en-BD")}
              </span>
              <span className={`text-[12px] font-semibold ${
                currentBalance > 0 ? "text-red-500"
                : currentBalance < 0 ? "text-green-500"
                : "text-gray-400"
              }`}>
                {currentBalance > 0 ? "You'll Get" : currentBalance < 0 ? "You'll Give" : "Settled"}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TransactionSuccessCard;