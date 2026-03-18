import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { pageVariants, pageTransition } from "../utils/animations";

export default function CustomerSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const customer = location.state?.customer;
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!customer) {
      navigate("/customer");
      return;
    }
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/customer");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [customer, navigate]);

  if (!customer) return null;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] flex flex-col items-center justify-center px-6"
    >
      {/* ✅ Success Icon — spin + bounce */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="flex flex-col items-center gap-4 mb-8"
      >
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <CheckCircle className="w-14 h-14 text-green-500" strokeWidth={1.5} />
          </motion.div>
        </div>

        {/* ✅ Name slide up */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.35 }}
          className="text-2xl font-bold text-gray-800 text-center"
        >
          {customer.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.35 }}
          className="text-base text-gray-500 text-center"
        >
          নতুন কাস্টমার হিসাবে সফলভাবে যোগ করা হয়েছে! 🎉
        </motion.p>
      </motion.div>

      {/* ✅ Info Card — slide up */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
        className="w-full bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3 mb-8"
      >
        {customer.profileImage && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.55 }}
            className="flex justify-center mb-2"
          >
            <img
              src={customer.profileImage}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-green-400"
            />
          </motion.div>
        )}

        {/* ✅ Info rows stagger */}
        {[
          { label: "নাম", value: customer.name },
          { label: "ফোন", value: customer.phone },
          ...(customer.address ? [{ label: "ঠিকানা", value: customer.address }] : []),
          {
            label: "যোগ করা হয়েছে",
            value: new Date(customer.createdAt).toLocaleDateString("bn-BD", {
              year: "numeric", month: "long", day: "numeric",
            }),
          },
        ].map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55 + i * 0.07, duration: 0.3 }}
          >
            <InfoRow label={row.label} value={row.value} />
          </motion.div>
        ))}
      </motion.div>

      {/* ✅ Countdown */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
        className="flex flex-col items-center gap-3 w-full"
      >
        {/* Countdown ring */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18" cy="18" r="15"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="3"
            />
            <motion.circle
              cx="18" cy="18" r="15"
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="94.2"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: 94.2 }}
              transition={{ duration: 5, ease: "linear" }}
            />
          </svg>
          <motion.span
            key={countdown}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-sm font-bold text-green-600 z-10"
          >
            {countdown}
          </motion.span>
        </div>

        <p className="text-xs text-gray-400">
          {countdown} সেকেন্ড পরে কাস্টমার লিস্টে যাবে
        </p>

        {/* ✅ Manual navigate button */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => navigate("/customer")}
          className="mt-2 w-full py-3.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl shadow-lg shadow-green-500/20 transition"
        >
          এখনই দেখুন →
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-sm font-medium text-gray-700">{value}</span>
    </div>
  );
}