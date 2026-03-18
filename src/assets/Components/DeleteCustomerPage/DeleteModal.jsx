import { FiAlertTriangle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { fadeVariants, modalVariants } from "../../../utils/animations";

export default function DeleteCustomerModal({ open, onClose, onConfirm, customerName = "Customer" }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* ✅ Backdrop */}
          <motion.div
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-gray-500/75"
            onClick={onClose}
          />

          {/* ✅ Modal pop */}
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative w-full max-w-[320px] bg-white rounded-2xl shadow-xl overflow-hidden z-10"
          >
            <div className="p-8 text-center">

              {/* ✅ Icon bounce */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 mb-4 border border-red-100"
              >
                <FiAlertTriangle className="text-red-500 text-3xl" />
              </motion.div>

              {/* ✅ Text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Delete Customer?
                </h2>
                <p className="text-[14px] text-gray-500 leading-relaxed px-2">
                  Are you sure you want to delete{" "}
                  <span className="font-bold text-gray-800">{customerName}</span>
                  ? This action cannot be undone.
                </p>
              </motion.div>
            </div>

            {/* ✅ Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col border-t border-gray-100"
            >
              <motion.button
                whileTap={{ scale: 0.97, backgroundColor: "#fef2f2" }}
                onClick={onConfirm}
                className="w-full py-4 text-[16px] font-bold text-red-600 hover:bg-red-50 transition-colors border-b border-gray-100"
              >
                Delete Customer
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97, backgroundColor: "#f9fafb" }}
                onClick={onClose}
                className="w-full py-4 text-[16px] font-semibold text-gray-500 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
