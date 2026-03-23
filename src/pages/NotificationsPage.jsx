import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowBackIosNew } from "react-icons/md";
import { FiBell, FiBellOff } from "react-icons/fi";
import { IoCheckmarkCircle } from "react-icons/io5";
import { pageVariants, pageTransition, listVariants, listItemVariants } from "../utils/animations";

const notificationSettings = [
  { id: "due_reminder", title: "বাকি রিমাইন্ডার", desc: "কাস্টমারের বাকি থাকলে মনে করিয়ে দেবে", icon: "💰", enabled: true },
  { id: "transaction_alert", title: "লেনদেন নোটিফিকেশন", desc: "নতুন লেনদেন যোগ হলে জানাবে", icon: "📊", enabled: true },
  { id: "daily_summary", title: "দৈনিক সারসংক্ষেপ", desc: "প্রতিদিন আজকের হিসাবের সারসংক্ষেপ", icon: "📅", enabled: false },
  { id: "backup_reminder", title: "ব্যাকআপ রিমাইন্ডার", desc: "ডেটা ব্যাকআপ করতে মনে করিয়ে দেবে", icon: "☁️", enabled: false },
  { id: "app_update", title: "আপডেট নোটিফিকেশন", desc: "নতুন ভার্সন আসলে জানাবে", icon: "🔄", enabled: true },
];

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(notificationSettings);
  const [saved, setSaved] = useState(false);

  const toggleSetting = (id) => {
    setSettings(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
    setSaved(false);
  };

  const enabledCount = settings.filter(s => s.enabled).length;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      // ✅ flex column — header + scrollable content + footer
      className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] flex flex-col"
    >
      {/* ✅ Header */}
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
        <h1 className="text-lg font-bold flex-1">Notifications</h1>
        {/* <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
          className="text-xs bg-green-100 text-green-600 font-bold px-2 py-1 rounded-full"
        >
          {enabledCount} চালু
        </motion.span> */}
      </motion.header>

      {/* ✅ Toast */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2 text-sm font-semibold"
          >
            <IoCheckmarkCircle size={18} />
            সফলভাবে সেভ হয়েছে!
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Scrollable content — flex-1 + overflow */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {/* Info card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <FiBell className="text-green-600" size={18} />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            কোন কোন বিষয়ে নোটিফিকেশন পাবেন সেটা নিচে থেকে সেট করুন।
          </p>
        </motion.div>

        {/* Settings list */}
        <motion.div
          variants={listVariants}
          initial="initial"
          animate="animate"
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          {settings.map((setting, i) => (
            <motion.div
              key={setting.id}
              variants={listItemVariants}
              className={`flex items-center gap-4 p-4 ${
                i < settings.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.2 + i * 0.05 }}
                className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xl shrink-0"
              >
                {setting.icon}
              </motion.div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{setting.title}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-tight">{setting.desc}</p>
              </div>

              <motion.label
                whileTap={{ scale: 0.9 }}
                className="relative inline-flex items-center cursor-pointer shrink-0"
              >
                <input
                  type="checkbox"
                  checked={setting.enabled}
                  onChange={() => toggleSetting(setting.id)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                  after:bg-white after:border after:rounded-full after:h-5 after:w-5
                  after:transition-all peer-checked:after:translate-x-full">
                </div>
              </motion.label>
            </motion.div>
          ))}
        </motion.div>

        {/* All off button */}
        {/* <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => { setSettings(prev => prev.map(s => ({ ...s, enabled: false }))); setSaved(false); }}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-gray-200 text-gray-500 font-semibold text-sm hover:bg-gray-50 transition"
        >
          <FiBellOff size={16} />
          সব বন্ধ করুন
        </motion.button> */}
      </div>

      {/* ✅ Save footer — flex এর নিচে, nav bar এর উপরে */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.35 }}
        className="bg-white border-t border-gray-100 px-4 py-4 mb-16"
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          className="w-full h-14 bg-green-500 hover:bg-green-600 text-white font-bold rounded-2xl shadow-lg shadow-green-500/20 transition flex items-center justify-center gap-2"
        >
          <IoCheckmarkCircle size={20} />
          সেটিংস সেভ করুন
        </motion.button>
      </motion.div>
    </motion.div>
  );
}