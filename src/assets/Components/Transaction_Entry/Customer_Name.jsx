import React from "react";
import { FiShare2 } from "react-icons/fi";
import { useCustomers } from "../../../Context/CustomerContext";
import { getCustomerBalance } from "../../../utils/ledger";
import { motion } from "framer-motion"; // ✅

function getInitials(name) {
  if (!name) return "";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Customer_Name({ customer }) {
  const { transactions } = useCustomers();
  if (!customer) return null;

  const initials = getInitials(customer.name);
  const balance = getCustomerBalance(transactions, customer.id);

  return (
    <div className="px-4 py-6 bg-gray-50 border-b border-gray-100">

      <div className="flex items-center justify-between mb-4">

        {/* ✅ Left — slide in from left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05, duration: 0.35 }}
          className="flex items-center gap-4"
        >
          {/* ✅ Avatar — bounce in */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
            className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium text-xl shrink-0"
          >
            {initials}
          </motion.div>

          <div className="flex flex-col items-start justify-center">
            <h2 className="text-[15px] font-medium text-gray-800 leading-tight">{customer.name}</h2>
            <p className="text-sm text-gray-500 text-left">{customer.phone}</p>
          </div>
        </motion.div>

        {/* ✅ Balance — slide in from right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.35 }}
          className="text-right"
        >
          <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
            Current Balance
          </p>
          <motion.p
            key={balance} // ✅ balance বদলালে re-animate
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`text-xl font-bold ${
              balance > 0 ? "text-red-600"
              : balance < 0 ? "text-green-600"
              : "text-gray-400"
            }`}
          >
            {Math.abs(balance).toLocaleString("en-BD", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </motion.p>
        </motion.div>
      </div>

      {/* ✅ Share button — slide up + whileTap */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          const shareText =
            balance > 0
              ? `বাকি ${Math.abs(balance).toLocaleString("en-BD", { minimumFractionDigits: 2 })} টাকা\n${customer.name}\nMAHFUZ SHU & BOSTRALOY`
              : balance < 0
              ? `জমা ${Math.abs(balance).toLocaleString("en-BD", { minimumFractionDigits: 2 })} টাকা\n${customer.name}\nMAHFUZ SHU & BOSTRALOY`
              : `ব্যালেন্স ০.০০ টাকা\n${customer.name}\nMAHFUZ SHU & BOSTRALOY`;
          window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
        }}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
      >
        <FiShare2 size={18} />
        Share Report
      </motion.button>
    </div>
  );
}