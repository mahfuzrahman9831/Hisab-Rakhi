import { IoChevronBack } from "react-icons/io5";
import { motion } from "framer-motion";

export default function AddCustomerHeader({ onBack }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      {/* ✅ Back button */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        aria-label="Go back"
        onClick={onBack}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors text-gray-900"
      >
        <IoChevronBack size={18} />
      </motion.button>

      {/* ✅ Title */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10 text-gray-900"
      >
        Add New Customer
      </motion.h1>
    </motion.header>
  );
}