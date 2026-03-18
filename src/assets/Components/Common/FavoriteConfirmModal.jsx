import React from "react";
import { IoStar, IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { modalVariants, fadeVariants } from "../../../utils/animations";

export default function FavoriteConfirmModal({ customer, onConfirm, onCancel, mode = "add" }) {
  const isRemove = mode === "remove";

  return (
    <AnimatePresence>
      {customer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">

          {/* ✅ Backdrop fade */}
          <motion.div
            variants={fadeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onCancel}
          />

          {/* ✅ Modal pop */}
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="relative bg-white rounded-3xl w-full max-w-[320px] p-6 shadow-2xl z-10"
          >
            <button onClick={onCancel} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400">
              <IoClose size={20} />
            </button>

            {/* ✅ Icon bounce in */}
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
              className="flex justify-center mb-4"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isRemove ? "bg-red-50" : "bg-green-50"}`}>
                <IoStar className={`text-4xl ${isRemove ? "text-red-400" : "text-green-500"}`} />
              </div>
            </motion.div>

            {/* ✅ Text slide up */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
            >
              <h3 className="text-center text-base font-bold text-slate-800 mb-2">
                {isRemove ? "ফেভারিট থেকে সরাবেন?" : "ফেভারিটে যোগ করবেন?"}
              </h3>
              <p className="text-center text-sm text-gray-500 leading-relaxed mb-6">
                আপনি কি{" "}
                <span className="font-semibold text-slate-800">"{customer.name}"</span>{" "}
                কে {isRemove ? "ফেভারিট লিস্ট থেকে সরাতে" : "ফেভারিট কাস্টমারে যোগ করতে"} চান?
              </p>
            </motion.div>

            {/* ✅ Buttons slide up */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex gap-3"
            >
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onCancel}
                className="flex-1 py-3 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition"
              >
                বাতিল
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onConfirm}
                className={`flex-1 py-3 rounded-2xl text-white text-sm font-bold transition flex items-center justify-center gap-2 ${
                  isRemove ? "bg-red-400 hover:bg-red-500" : "bg-green-500 hover:bg-green-600"
                }`}
              >
                <IoStar size={14} />
                {isRemove ? "সরিয়ে দিন" : "যোগ করুন"}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}