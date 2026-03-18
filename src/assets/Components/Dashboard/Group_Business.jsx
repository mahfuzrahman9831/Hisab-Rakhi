import React, { useState } from "react";
import { FaBuilding, FaUsers, FaQrcode, FaCloudUploadAlt, FaCheck } from "react-icons/fa";
import { MdClose, MdAdd } from "react-icons/md";
import { useBusiness } from "../../../Context/BusinessContext";
import { motion, AnimatePresence } from "framer-motion";
import { fadeVariants, sheetVariants, listVariants, listItemVariants } from "../../../utils/animations";

export default function Group_Business() {
  const { businesses, activeBusiness, switchBusiness, addBusiness } = useBusiness();
  const [showSheet, setShowSheet] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [bizName, setBizName] = useState("");
  const [bizAddress, setBizAddress] = useState("");

  const handleAddBusiness = () => {
    if (!bizName.trim()) return;
    const newBiz = addBusiness(bizName.trim(), bizAddress.trim());
    switchBusiness(newBiz.id);
    setBizName("");
    setBizAddress("");
    setShowAddForm(false);
    setShowSheet(false);
  };

  const menuItems = [
    { icon: <FaBuilding size={20} />, label: "Multi Business", onClick: () => setShowSheet(true) },
    { icon: <FaUsers size={20} />, label: "Group Collection", onClick: () => {} },
    { icon: <FaQrcode size={20} />, label: "My QR", onClick: () => {} },
    { icon: <FaCloudUploadAlt size={20} />, label: "Data Backup", onClick: () => {} },
  ];

  return (
    <>
      <section className="px-4 py-3">
        {/* ✅ Stagger menu icons */}
        <motion.div
          variants={listVariants}
          initial="initial"
          animate="animate"
          className="grid grid-cols-4 gap-3"
        >
          {menuItems.map((item, i) => (
            <motion.button
              key={i}
              variants={listItemVariants}
              whileTap={{ scale: 0.88 }}
              whileHover={{ scale: 1.05 }}
              onClick={item.onClick}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-500 text-white shadow-sm flex items-center justify-center border border-gray-200 transition-transform">
                {item.icon}
              </div>
              <span className="text-[10px] font-semibold text-center leading-tight">
                {item.label}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* ✅ Bottom Sheet */}
      <AnimatePresence>
        {showSheet && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end items-center">

            {/* ✅ Backdrop */}
            <motion.div
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 bg-black/40"
              onClick={() => { setShowSheet(false); setShowAddForm(false); }}
            />

            {/* ✅ Sheet slide up */}
            <motion.div
              variants={sheetVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative bg-white rounded-t-3xl w-full max-w-[380px] px-5 pt-4 pb-24 z-10 max-h-[80vh] overflow-y-auto"
            >
              {/* Handle */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4"
              />

              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="flex items-center justify-between mb-4"
              >
                <div>
                  <h3 className="font-bold text-slate-800 text-base">ব্যবসা সমূহ</h3>
                  <p className="text-xs text-gray-400">{businesses.length} টি ব্যবসা</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => { setShowSheet(false); setShowAddForm(false); }}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <MdClose size={20} />
                </motion.button>
              </motion.div>

              {/* ✅ Business List — stagger */}
              <motion.div
                variants={listVariants}
                initial="initial"
                animate="animate"
                className="space-y-2 mb-4 max-h-60 overflow-y-auto"
              >
                {businesses.map((biz) => (
                  <motion.button
                    key={biz.id}
                    variants={listItemVariants}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { switchBusiness(biz.id); setShowSheet(false); }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition ${
                      activeBusiness?.id === biz.id
                        ? "border-green-500 bg-green-50"
                        : "border-gray-100 bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div className="text-left">
                      <p className="font-semibold text-sm text-slate-800">{biz.name}</p>
                      {biz.address && (
                        <p className="text-xs text-gray-400 mt-0.5">{biz.address}</p>
                      )}
                    </div>
                    {activeBusiness?.id === biz.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      >
                        <FaCheck className="text-green-500" size={14} />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </motion.div>

              {/* ✅ Add Form — AnimatePresence */}
              <AnimatePresence mode="wait">
                {showAddForm ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3 border-t pt-4"
                  >
                    <p className="font-semibold text-sm text-slate-700">নতুন ব্যবসা যোগ করুন</p>
                    <input
                      type="text"
                      placeholder="ব্যবসার নাম *"
                      value={bizName}
                      onChange={(e) => setBizName(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      type="text"
                      placeholder="ঠিকানা (ঐচ্ছিক)"
                      value={bizAddress}
                      onChange={(e) => setBizAddress(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div className="flex gap-2">
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setShowAddForm(false)}
                        className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500"
                      >
                        বাতিল
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={handleAddBusiness}
                        disabled={!bizName.trim()}
                        className="flex-1 py-3 rounded-xl bg-green-500 text-white text-sm font-semibold disabled:opacity-40"
                      >
                        যোগ করুন
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.button
                    key="add-btn"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowAddForm(true)}
                    className="w-full py-3 rounded-xl border-2 border-dashed border-green-300 text-green-600 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-green-50 transition"
                  >
                    <MdAdd size={18} />
                    + নতুন ব্যবসা যোগ করুন
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}