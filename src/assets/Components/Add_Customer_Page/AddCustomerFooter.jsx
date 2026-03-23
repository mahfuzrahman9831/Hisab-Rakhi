import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AddCustomerFooter({ onSave }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.35 }}
    >
      <footer className="p-5 bg-white border-t border-gray-100">
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.01 }}
          onClick={onSave}
          className="w-full bg-green-600 hover:bg-green-700 transition-all text-white h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
        >
          {/* ✅ Icon animate */}
          <motion.div
            initial={{ rotate: -20, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.4 }}
          >
            <FaUserPlus size={18} />
          </motion.div>
          Add Customer
        </motion.button>
        <div className="h-6 w-full"></div>
      </footer>
    </motion.div>
  );
}