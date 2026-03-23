import React from "react";
import { useParams } from "react-router-dom";
import { useCustomers } from "../../../Context/CustomerContext";
import Customer_Name from "./Customer_Name";
import Transaction_Form from "./Transaction_Form";
import PageHeader from "../Common/Header";
import { motion } from "framer-motion"; // ✅
import { pageVariants, pageTransition } from "../../../utils/animations"; // ✅

export default function CustomerTransactionPage() {
  const { id, transactionId } = useParams();
  const { customers, transactions } = useCustomers();

  const customer = customers.find(c => c.id == id);
  const editTransaction = transactions.find(t => t.id == transactionId);

  return (
    // ✅ Page transition
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="max-w-[380px] mx-auto w-full pb-24 bg-gray-50 min-h-screen"
    >
      <PageHeader title={editTransaction ? "Edit Transaction" : "New Transaction"} />

      {/* ✅ Customer Name — slide down */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
      >
        <Customer_Name customer={customer} />
      </motion.div>

      {/* ✅ Form — slide up */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.35 }}
      >
        <Transaction_Form customer={customer} editTransaction={editTransaction} />
      </motion.div>
    </motion.main>
  );
}