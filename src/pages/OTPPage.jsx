import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { MdAccountBalanceWallet } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { pageVariants, pageTransition } from "../utils/animations";

export default function OTPPage() {
  const { verifyOTP } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { name, password } = location.state || {};

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await verifyOTP(otp, name, password);
    setLoading(false);
    if (result.success) {
      navigate("/shop-setup");
    } else {
      setError(result.message);
    }
  };

  return (
    // ✅ Page slide transition
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="min-h-screen bg-[#f6f8f7] font-sans flex flex-col items-center justify-center px-4"
    >
      {/* ✅ Card slide up */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[440px] bg-white p-8 rounded-xl shadow-sm border border-slate-200 space-y-6"
      >

        {/* ✅ Header */}
        <div className="flex flex-col items-center text-center">
          {/* Icon spin + bounce */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#13ec6d]/20"
          >
            <MdAccountBalanceWallet className="text-3xl text-[#13ec6d]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="text-2xl font-bold text-slate-900"
          >
            OTP যাচাই করো
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="mt-2 text-sm text-slate-500"
          >
            তোমার ফোনে একটা OTP পাঠানো হয়েছে
          </motion.p>
        </div>

        {/* ✅ Error shake */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: [0, -8, 8, -8, 8, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-lg text-center"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.35 }}
          onSubmit={handleVerify}
          className="space-y-4"
        >
          {/* ✅ OTP Input */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.42, duration: 0.3 }}
            className="flex flex-col gap-2"
          >
            <label className="text-sm font-semibold text-slate-900">OTP কোড</label>
            <input
              type="number"
              placeholder="6 সংখ্যার OTP দাও"
              className="flex w-full rounded-xl border border-slate-200 bg-white h-14 px-4 text-center text-xl font-bold tracking-widest focus:border-[#13ec6d] focus:ring-1 focus:ring-[#13ec6d] focus:outline-none placeholder:text-slate-400 placeholder:text-sm placeholder:font-normal placeholder:tracking-normal"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </motion.div>

          {/* ✅ Submit button */}
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-[#13ec6d] hover:bg-[#11d662] text-slate-900 font-bold text-base h-14 rounded-xl shadow-lg shadow-[#13ec6d]/20 transition-all disabled:opacity-60"
          >
            {/* ✅ Loading state animate */}
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  যাচাই হচ্ছে...
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  OTP যাচাই করো ✓
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.form>
      </motion.div>

      <div id="recaptcha-container"></div>
    </motion.div>
  );
}