import React, { useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { MdBackspace, MdClose } from "react-icons/md";
import { FaShieldAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { fadeVariants } from "../../../utils/animations";

export default function PinVerifyModal({ onSuccess, onCancel, title = "পিন দিয়ে নিশ্চিত করুন" }) {
  const { pin } = useAuth();
  const [entered, setEntered] = useState("");
  const [error, setError] = useState("");

  if (!pin) {
    onSuccess();
    return null;
  }

  const handlePress = (num) => {
    if (entered.length < 6) {
      const newPin = entered + String(num);
      setEntered(newPin);
      setError("");
      if (newPin.length === 6) {
        if (newPin === pin) {
          setTimeout(() => onSuccess(), 150);
        } else {
          setTimeout(() => {
            setError("পিন ভুল হয়েছে! আবার চেষ্টা করো।");
            setEntered("");
          }, 300);
        }
      }
    }
  };

  const handleBackspace = () => {
    setEntered((prev) => prev.slice(0, -1));
    setError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* ✅ Backdrop */}
      <motion.div
        variants={fadeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* ✅ Modal slide up */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 60, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative bg-[#f6f8f7] rounded-3xl w-full max-w-[340px] mx-6 shadow-2xl z-10 overflow-hidden"
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-200/50 text-slate-400 z-10"
        >
          <MdClose size={18} />
        </button>

        <div className="flex flex-col items-center px-8 pt-8 pb-6 text-center">

          {/* ✅ Icon bounce */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            className="relative mb-6 flex items-center justify-center"
          >
            <div className="absolute w-24 h-24 bg-[#13ec6d]/10 rounded-full blur-2xl"></div>
            <div className="relative bg-white p-5 rounded-3xl shadow-xl shadow-[#13ec6d]/5 border border-[#13ec6d]/20">
              <FaShieldAlt className="text-[#13ec6d] text-5xl" />
            </div>
          </motion.div>

          {/* ✅ Title fade in */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-2 text-slate-900">{title}</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-4 max-w-[240px]">
              নিরাপত্তার জন্য আপনার সিকিউরিটি পিন দিন
            </p>
          </motion.div>

          {/* ✅ Error shake */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: [0, -8, 8, -8, 8, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-red-500 text-sm mb-3 font-medium"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* ✅ PIN Dots */}
          <div className="flex gap-4 mb-8">
            {[0,1,2,3,4,5].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: i < entered.length ? 1.2 : 1,
                  backgroundColor: i < entered.length ? "#13ec6d" : "transparent",
                  borderColor: i < entered.length ? "#13ec6d" : "#cbd5e1",
                }}
                transition={{ duration: 0.15 }}
                className="w-4 h-4 rounded-full border-2"
              />
            ))}
          </div>

          {/* ✅ Keypad */}
          <div className="w-full grid grid-cols-3 gap-y-2 gap-x-6 mb-6">
            {[1,2,3,4,5,6,7,8,9].map((num) => (
              <motion.button
                key={num}
                whileTap={{ scale: 0.85, backgroundColor: "rgba(148,163,184,0.3)" }}
                onClick={() => handlePress(num)}
                className="h-14 flex items-center justify-center text-2xl font-semibold rounded-xl text-slate-900"
              >
                {num}
              </motion.button>
            ))}
            <div className="h-14" />
            <motion.button
              whileTap={{ scale: 0.85, backgroundColor: "rgba(148,163,184,0.3)" }}
              onClick={() => handlePress(0)}
              className="h-14 flex items-center justify-center text-2xl font-semibold rounded-xl text-slate-900"
            >
              0
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleBackspace}
              className="h-14 flex items-center justify-center rounded-xl"
            >
              <MdBackspace className="text-slate-500 text-2xl" />
            </motion.button>
          </div>

          <p className="text-xs text-slate-400">
            ৬ সংখ্যার পিন দিলেই স্বয়ংক্রিয়ভাবে যাচাই হবে
          </p>
        </div>
      </motion.div>
    </div>
  );
}