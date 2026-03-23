import { IoCheckmarkCircle } from "react-icons/io5";
import { motion } from "framer-motion"; // ✅

export default function UpdateCustomerFooter({ onSave, disabled }) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.35 }}
      className="p-6 bg-white border-t border-gray-200"
    >
      <div className="max-w-md mx-auto">
        <motion.button
          whileTap={!disabled ? { scale: 0.97 } : {}}
          onClick={onSave}
          disabled={disabled}
          className={`w-full h-14 rounded-xl font-bold text-lg transition-all ${
            disabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {/* ✅ disabled → enabled হলে animate */}
          <motion.span
            animate={{ opacity: disabled ? 0.6 : 1 }}
            transition={{ duration: 0.2 }}
          >
            Update Details
          </motion.span>
        </motion.button>
      </div>
    </motion.footer>
  );
}