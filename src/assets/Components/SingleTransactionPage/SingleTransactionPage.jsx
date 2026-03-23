import React, { useState, useEffect } from "react";
import PageHeader from "../Common/Header";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import { useCustomers } from "../../../Context/CustomerContext";
import PinVerifyModal from "../Common/PinVerifyModal";
import { motion, AnimatePresence } from "framer-motion"; // ✅
import { pageVariants, pageTransition, modalVariants, fadeVariants } from "../../../utils/animations"; // ✅

export default function SingleTransactionPage() {
  const { transactionId } = useParams();
  const { transactions, deleteTransaction } = useCustomers();
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") setPreview(null); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!transactions || transactions.length === 0) return null;

  const transaction = transactions.find((t) => t.id == transactionId);

  if (!transaction) {
    return <div className="flex items-center justify-center h-screen">Transaction not found</div>;
  }

  const isSell = transaction.sell > 0;
  const amount = isSell ? transaction.sell : transaction.buy;

  const handleEditRequest = () => { setPendingAction("edit"); setShowPinModal(true); };
  const handleDeleteRequest = () => { setPendingAction("delete"); setShowPinModal(true); };
  const handlePinSuccess = () => {
    setShowPinModal(false);
    if (pendingAction === "edit") navigate(`/customer/${transaction.customerId}/report/edit/${transaction.id}`);
    if (pendingAction === "delete") setShowDelete(true);
    setPendingAction(null);
  };
  const handleConfirmDelete = () => { deleteTransaction(transaction.id); setShowDelete(false); navigate(-1); };

  return (
    // ✅ Page transition
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="max-w-[380px] mx-auto w-full pb-24"
    >
      <PageHeader title="Transaction Report" backTo="AUTO" />

      <div className="bg-gray-50 text-slate-900 antialiased min-h-screen">
        <main className="px-1 mt-2">

          {/* ✅ Table card — slide up */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.35, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Table Header */}
            <div className="grid grid-cols-[1.5fr_0.5fr_1fr_auto] bg-gray-50 border-b border-gray-100">
              <div className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider">বিবরণ</div>
              <div className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">রেফারেন্স</div>
              <div className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">লেনদেন</div>
              <div className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">একশন</div>
            </div>

            {/* Transaction Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="grid grid-cols-[1.2fr_0.8fr_1fr_auto] items-center py-5 px-2 border-b border-gray-100 bg-white"
            >
              {/* Date + Time + Details */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="flex flex-col text-start gap-1.5 leading-tight"
              >
                <span className="text-[14px] font-semibold text-slate-800">
                  {new Date(transaction.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                </span>
                <span className="text-[12px] text-slate-400">
                  {new Date(transaction.date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}
                </span>
                <span className="text-[12px] text-slate-500">{transaction.details || "—"}</span>
              </motion.div>

              {/* Image */}
              <div className="flex justify-center">
                {transaction.image && (
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 16 }}
                    src={transaction.image}
                    alt="transaction"
                    className="w-12 h-12 rounded-md object-cover border cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); setPreview(transaction.image); }}
                  />
                )}
              </div>

              {/* Amount */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 16 }}
                className="flex justify-center"
              >
                <span className={`font-semibold text-[16px] ${isSell ? "text-red-600" : "text-green-600"}`}>
                  {amount.toLocaleString("en-BD", { minimumFractionDigits: 2 })}
                </span>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.32, duration: 0.3 }}
                className="flex flex-col items-end gap-3 pl-2"
              >
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={handleEditRequest}
                  className="p-1 text-gray-400 hover:text-blue-600 transition"
                >
                  <FiEdit2 size={16} />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={handleDeleteRequest}
                  className="p-1 text-gray-400 hover:text-red-600 transition"
                >
                  <FiTrash2 size={16} />
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ✅ Share button — slide up */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            className="mt-4"
          >
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 border border-amber-200 bg-amber-50 text-amber-800 font-semibold rounded-xl transition-all"
            >
              <span className="material-symbols-outlined text-xl">share</span>
              <span className="text-[15px]">শেয়ার করুন</span>
            </motion.button>
          </motion.div>
        </main>

        <div className="fixed bottom-0 w-full h-8 flex justify-center items-end pb-2 pointer-events-none">
          <div className="w-32 h-1.5 bg-slate-200 rounded-full"></div>
        </div>
      </div>

      {/* PIN Modal */}
      {showPinModal && (
        <PinVerifyModal
          title={pendingAction === "delete" ? "ডিলিট নিশ্চিত করুন" : "এডিট নিশ্চিত করুন"}
          onSuccess={handlePinSuccess}
          onCancel={() => { setShowPinModal(false); setPendingAction(null); }}
        />
      )}

      {/* ✅ Delete Confirm Modal */}
      <AnimatePresence>
        {showDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            <motion.div
              variants={fadeVariants}
              initial="initial" animate="animate" exit="exit"
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowDelete(false)}
            />
            <motion.div
              variants={modalVariants}
              initial="initial" animate="animate" exit="exit"
              className="relative bg-white rounded-3xl w-full max-w-[300px] p-6 shadow-2xl z-10"
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                className="flex justify-center mb-4"
              >
                <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                  <FiTrash2 className="text-red-500 text-2xl" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
                <h3 className="text-center font-bold text-slate-800 mb-2">লেনদেন মুছবেন?</h3>
                <p className="text-center text-sm text-gray-500 mb-6">
                  এই লেনদেন ট্র্যাশে চলে যাবে। চাইলে পরে ফেরত আনতে পারবেন।
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex gap-3"
              >
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDelete(false)}
                  className="flex-1 py-3 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition"
                >
                  বাতিল
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirmDelete}
                  className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition"
                >
                  মুছুন
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ✅ Image Preview Modal */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setPreview(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="absolute top-6 right-6 text-white text-3xl font-bold"
              onClick={() => setPreview(null)}
            >
              ×
            </motion.button>
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              src={preview}
              alt="preview"
              className="max-w-[90%] max-h-[90%] rounded-xl shadow-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
}