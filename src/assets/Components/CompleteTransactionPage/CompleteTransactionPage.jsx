import React from "react";
import ShareButton from "./ShareButton";
import TransactionSuccessCard from "./CompleteTransactionMainCard";
import PageHeader from "../Common/Header";
import { IoClose } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { useCustomers } from "../../../Context/CustomerContext";
import { getCustomerBalance } from "../../../utils/ledger";
import { motion } from "framer-motion"; // ✅
import { pageVariants, pageTransition } from "../../../utils/animations"; // ✅

const TransactionSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { transactions } = useCustomers();

  const { customerId, sell = 0, buy = 0 } = location.state || {};
  const currentBalance = getCustomerBalance(transactions, Number(customerId));
  const previousBalance = currentBalance - (sell - buy);

  return (
    // ✅ Page transition
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="max-w-[380px] mx-auto h-screen overflow-hidden bg-[#f4f7f6] text-gray-800 font-['Hind_Siliguri',_sans-serif] flex flex-col"
    >
      <PageHeader title="Transaction Complete" backTo="AUTO" />

      <div className="flex-1 flex flex-col items-center px-4 relative">

        {/* ✅ Close Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="w-full flex justify-end pt-4"
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/customer")}
            className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 active:scale-90 transition-all duration-200"
          >
            <IoClose className="text-gray-500 text-2xl" />
          </motion.button>
        </motion.div>

        {/* ✅ Success Check — spin + bounce */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.15 }}
          className="z-10 -mb-8 mt-4"
        >
          <div className="success-circle">
            <svg className="success-check" viewBox="0 0 52 52">
              <circle className="success-circle-bg" cx="26" cy="26" r="25" fill="none" />
              <path className="success-check-path" fill="none" d="M14 27l7 7 16-16" />
            </svg>
          </div>
        </motion.div>

        {/* ✅ Main Card — slide up */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
          className="w-full"
        >
          <TransactionSuccessCard />
        </motion.div>

        {/* ✅ Share buttons — slide up */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.35 }}
          className="w-full"
        >
          <ShareButton
            sell={sell}
            buy={buy}
            previousBalance={previousBalance}
            currentBalance={currentBalance}
          />
        </motion.div>

        <div className="absolute bottom-4 w-32 h-1.5 bg-gray-300 rounded-full"></div>
      </div>
    </motion.div>
  );
};

export default TransactionSuccess;