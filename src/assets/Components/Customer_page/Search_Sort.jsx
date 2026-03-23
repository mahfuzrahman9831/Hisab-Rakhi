import React from "react";
import { HiOutlineFilter, HiOutlineDownload } from "react-icons/hi";
import Search_Input from "./Search_Input";
import { IoTrendingDown, IoTrendingUp } from "react-icons/io5";
import { generateCustomerReport } from "../../../utils/generateCustomerReport";
import { useAuth } from "../../../Context/AuthContext";
import { useCustomers } from "../../../Context/CustomerContext";
import { motion } from "framer-motion"; // ✅

export default function Search_Sort({
  dueOnly, setDueOnly, sortType, setSortType, searchTerm, setSearchTerm,
  displayedCustomers
}) {
  const { shopInfo } = useAuth();
  const { customers, transactions } = useCustomers();

  const handleDownload = () => {
    const list = displayedCustomers || customers;
    generateCustomerReport(list, transactions, shopInfo);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="px-4 pt-4 pb-2 space-y-4"
    >
      {/* ✅ Search — fade in */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <Search_Input searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </motion.div>

      <div className="space-y-3">

        {/* ✅ Sort buttons — stagger */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          className="flex flex-wrap items-center gap-2"
        >
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mr-1">
            Sort Balance:
          </span>

          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => setSortType(sortType === "high" ? null : "high")}
            className={`px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              sortType === "high" ? "border-green-500 bg-green-50" : "border-gray-200 bg-white"
            }`}
          >
            <IoTrendingDown size={14} />
            High to Low
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => setSortType(sortType === "low" ? null : "low")}
            className={`px-3 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              sortType === "low" ? "border-green-500 bg-green-50" : "border-gray-200 bg-white"
            }`}
          >
            <IoTrendingUp size={14} />
            Low to High
          </motion.button>
        </motion.div>

        {/* ✅ Due Only Toggle — slide up */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.3 }}
          className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100"
        >
          <div className="flex items-center gap-2">
            <HiOutlineFilter className="text-green-500 text-xl" />
            <span className="text-sm font-semibold">Due Only Customers</span>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={dueOnly}
              onChange={() => setDueOnly(!dueOnly)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500
              after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white
              after:border after:rounded-full after:h-5 after:w-5 after:transition-all
              peer-checked:after:translate-x-full">
            </div>
          </label>

          {/* ✅ Download button */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            whileHover={{ scale: 1.1 }}
            onClick={handleDownload}
            className="p-2 rounded-lg text-gray-600 hover:text-white hover:bg-green-500 transition"
            title="PDF রিপোর্ট ডাউনলোড করুন"
          >
            <HiOutlineDownload className="text-xl" />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}