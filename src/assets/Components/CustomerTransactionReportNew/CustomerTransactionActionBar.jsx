import React from "react";
import { FiBell, FiDownload } from "react-icons/fi";
import { motion } from "framer-motion";

export default function CustomerTransactionActionBar() {
  return (
    // ✅ Slide down + fade
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.3 }}
      className="px-4 mb-3"
    >
      <div className="bg-white rounded-2xl p-3 flex items-center justify-between shadow-sm border border-gray-100">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.18, duration: 0.3 }}
          className="flex items-center gap-2 px-2 border-r border-gray-200 pr-4"
        >
          <FiBell className="text-gray-500 w-5 h-5" />
          <span className="text-gray-700 text-sm font-medium">ডিউ খোর</span>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.22, duration: 0.3 }}
          className="flex items-center gap-4 pl-3"
        >
          <motion.div
            whileTap={{ scale: 0.92 }}
            className="flex items-center gap-1.5 cursor-pointer hover:text-green-600 transition"
          >
            <FiDownload className="text-gray-500 w-5 h-5" />
            <span className="text-gray-700 text-sm font-medium">রিপোর্ট শেয়ার</span>
          </motion.div>

          {/* Toggle */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
        </motion.div>
      </div>
    </motion.div>
  );
}