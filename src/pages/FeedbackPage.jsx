import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowBackIosNew } from "react-icons/md";
import { FiSend, FiCheckCircle } from "react-icons/fi";
import { pageVariants, pageTransition } from "../utils/animations";

const categories = [
  { id: "bug",         emoji: "🐛", label: "Bug Report",   desc: "কিছু কাজ করছে না",     color: "border-red-400    bg-red-50    text-red-600"    },
  { id: "suggestion",  emoji: "💡", label: "Suggestion",   desc: "নতুন ফিচার চাই",        color: "border-yellow-400 bg-yellow-50 text-yellow-600" },
  { id: "ui",          emoji: "🎨", label: "UI/Design",    desc: "ডিজাইন সমস্যা",         color: "border-purple-400 bg-purple-50 text-purple-600" },
  { id: "performance", emoji: "⚡", label: "Performance",  desc: "স্লো বা ক্র্যাশ",       color: "border-orange-400 bg-orange-50 text-orange-600" },
  { id: "other",       emoji: "❓", label: "Other",        desc: "অন্য কিছু",              color: "border-gray-400   bg-gray-50   text-gray-600"   },
];

export default function FeedbackPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!selected || !message.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleReset = () => {
    setSelected(null);
    setMessage("");
    setSubmitted(false);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6]"
    >
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 bg-white border-b border-gray-200 shadow-sm px-4 py-4 flex items-center gap-3 z-10"
      >
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
        >
          <MdArrowBackIosNew size={20} />
        </motion.button>
        <h1 className="text-lg font-bold flex-1">Feedback</h1>
      </motion.header>

      <div className="px-4 py-6 space-y-6">

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* ✅ Top info */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.35 }}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
              >
                <p className="text-sm text-gray-600 leading-relaxed">
                  আপনার মতামত আমাদের কাছে অনেক গুরুত্বপূর্ণ। যেকোনো সমস্যা বা পরামর্শ জানান — আমরা দ্রুত সমাধান করব।
                </p>
              </motion.div>

              {/* ✅ Category */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.35 }}
              >
                <p className="text-sm font-bold text-gray-700 mb-3 px-1">
                  ক্যাটাগরি সিলেক্ট করুন
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat, i) => (
                    <motion.button
                      key={cat.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.18 + i * 0.06, duration: 0.25 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelected(cat.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                        selected === cat.id
                          ? cat.color + " border-2"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <span className="text-xl">{cat.emoji}</span>
                      <div>
                        <p className={`text-xs font-bold leading-tight ${
                          selected === cat.id ? "" : "text-gray-700"
                        }`}>
                          {cat.label}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {cat.desc}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* ✅ Message */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.35 }}
              >
                <p className="text-sm font-bold text-gray-700 mb-3 px-1">
                  আপনার বার্তা লিখুন
                </p>
                <div className="relative">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="এখানে বিস্তারিত লিখুন..."
                    rows={5}
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-all placeholder:text-gray-300"
                  />
                  {/* Character count */}
                  <span className="absolute bottom-3 right-4 text-[10px] text-gray-300 font-medium">
                    {message.length}/500
                  </span>
                </div>
              </motion.div>

              {/* ✅ Submit */}
              <motion.button
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.35 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                disabled={!selected || !message.trim() || loading}
                className={`w-full h-14 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-lg ${
                  selected && message.trim()
                    ? "bg-green-500 hover:bg-green-600 text-white shadow-green-500/25"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                }`}
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      {/* Spinner */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      পাঠানো হচ্ছে...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="send"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <FiSend size={18} />
                      Feedback পাঠান
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>

          ) : (
            /* ✅ Success State */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex flex-col items-center justify-center py-16 px-6 text-center"
            >
              {/* Success icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6"
              >
                <FiCheckCircle className="text-green-500 text-5xl" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.35 }}
                className="text-2xl font-bold text-slate-800 mb-3"
              >
                ধন্যবাদ! 🎉
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="text-sm text-gray-500 leading-relaxed mb-8 max-w-[260px]"
              >
                আপনার Feedback সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই বিষয়টি দেখব।
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="flex gap-3 w-full"
              >
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleReset}
                  className="flex-1 py-3 rounded-2xl border-2 border-green-500 text-green-600 font-bold text-sm"
                >
                  আরো পাঠান
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => navigate(-1)}
                  className="flex-1 py-3 rounded-2xl bg-green-500 text-white font-bold text-sm"
                >
                  ফিরে যান
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}