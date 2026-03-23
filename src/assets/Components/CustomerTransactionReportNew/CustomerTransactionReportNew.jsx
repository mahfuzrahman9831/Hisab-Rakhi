import React from "react";
import { useParams } from "react-router-dom";
import { useCustomers } from "../../../Context/CustomerContext";
import CustomerTransactionHeaderCard from "./CustomerTransactionHeaderCard";
import CustomerTransactionActionBar from "./CustomerTransactionActionBar";
import CustomerTransactionList from "./CustomerTransactionList";
import PageHeader from "../Common/Header";
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../../../utils/animations";

export default function CustomerTransactionReportNew() {
  const { id } = useParams();
  const { customers, transactions } = useCustomers();

  const customer = customers.find((c) => c.id === Number(id));
  const customerTransactions = transactions.filter((t) => t.customerId === customer?.id);
  const totalSell = customerTransactions.reduce((sum, t) => sum + (t.sell || 0), 0);
  const totalBuy = customerTransactions.reduce((sum, t) => sum + (t.buy || 0), 0);

  if (!customer) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">Customer not found</div>;
  }

  return (
    // ✅ Page transition
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="max-w-[380px] mx-auto h-screen flex flex-col bg-[#f3f4f6]"
    >
      <div className="sticky top-0 z-50 bg-white">
        <PageHeader title="Transaction Details" backTo="AUTO" />
      </div>

      {/* ✅ Header Card — slide down */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        className="sticky top-[56px] z-40"
      >
        <CustomerTransactionHeaderCard customer={customer} transactions={customerTransactions} />
      </motion.div>

      <div className="flex-1 overflow-y-auto hide-scrollbar">
        {/* ✅ Action Bar — fade in */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.3 }}
        >
          <CustomerTransactionActionBar />
        </motion.div>

        {/* ✅ Table Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22, duration: 0.3 }}
          className="px-6 py-3 flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-200"
        >
          <span>Transaction Details</span>
          <span>Amount</span>
        </motion.div>

        <CustomerTransactionList customer={customer} transactions={customerTransactions} />
      </div>

      {/* ✅ Total row — slide up */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        className="sticky bottom-16 backdrop-blur-md bg-white/80 border-t border-gray-200 px-3 py-2 flex items-center justify-between shadow-sm"
      >
        <span className="text-gray-700 font-semibold">মোট</span>
        <div className="flex items-center gap-6 pr-2">
          <span className="text-red-600 font-semibold">
            {totalSell.toLocaleString("en-BD", { minimumFractionDigits: 2 })}
          </span>
          <span className="text-green-600 font-semibold">
            {totalBuy.toLocaleString("en-BD", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}