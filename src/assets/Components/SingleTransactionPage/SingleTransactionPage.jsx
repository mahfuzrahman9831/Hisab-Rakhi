import React, { useState, useEffect } from "react";
import PageHeader from "../Common/Header";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useParams, useNavigate } from "react-router-dom";
import { useCustomers } from "../../../Context/CustomerContext";
import PinVerifyModal from "../Common/PinVerifyModal";

export default function SingleTransactionPage() {
  const { transactionId } = useParams();
  const { transactions, deleteTransaction } = useCustomers();
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // "edit" | "delete"

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setPreview(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (!transactions || transactions.length === 0) return null;

  const transaction = transactions.find((t) => t.id == transactionId);

  if (!transaction) {
    return (
      <div className="flex items-center justify-center h-screen">
        Transaction not found
      </div>
    );
  }

  const isSell = transaction.sell > 0;
  const amount = isSell ? transaction.sell : transaction.buy;

  // ✅ Edit বাটনে ক্লিক → PIN modal
  const handleEditRequest = () => {
    setPendingAction("edit");
    setShowPinModal(true);
  };

  // ✅ Delete বাটনে ক্লিক → PIN modal
  const handleDeleteRequest = () => {
    setPendingAction("delete");
    setShowPinModal(true);
  };

  // ✅ PIN সঠিক হলে action করো
  const handlePinSuccess = () => {
    setShowPinModal(false);
    if (pendingAction === "edit") {
      navigate(`/customer/${transaction.customerId}/report/edit/${transaction.id}`);
    }
    if (pendingAction === "delete") {
      setShowDelete(true);
    }
    setPendingAction(null);
  };

  // ✅ Confirm delete
  const handleConfirmDelete = () => {
    deleteTransaction(transaction.id);
    setShowDelete(false);
    navigate(-1);
  };

  return (
    <main className="max-w-[380px] mx-auto w-full pb-24">
      <PageHeader title="Transaction Report" backTo="AUTO" />

      <div className="bg-gray-50 text-slate-900 antialiased min-h-screen">
        <main className="px-1 mt-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            {/* Table Header */}
            <div className="grid grid-cols-[1.5fr_0.5fr_1fr_auto] bg-gray-50 border-b border-gray-100">
              <div className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider">বিবরণ</div>
              <div className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">রেফারেন্স</div>
              <div className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">লেনদেন</div>
              <div className="py-3 px-2 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">একশন</div>
            </div>

            {/* Transaction Row */}
            <div className="grid grid-cols-[1.2fr_0.8fr_1fr_auto] items-center py-5 px-2 border-b border-gray-100 bg-white">

              {/* Date + Time + Details */}
              <div className="flex flex-col text-start gap-1.5 leading-tight">
                <span className="text-[14px] font-semibold text-slate-800">
                  {new Date(transaction.date).toLocaleDateString("en-GB", {
                    day: "2-digit", month: "short", year: "numeric",
                  })}
                </span>
                <span className="text-[12px] text-slate-400">
                  {new Date(transaction.date).toLocaleTimeString("en-US", {
                    hour: "2-digit", minute: "2-digit", hour12: true,
                  })}
                </span>
                <span className="text-[12px] text-slate-500">
                  {transaction.details || "—"}
                </span>
              </div>

              {/* Image */}
              <div className="flex justify-center">
                {transaction.image && (
                  <img
                    src={transaction.image}
                    alt="transaction"
                    className="w-12 h-12 rounded-md object-cover border cursor-pointer"
                    onClick={(e) => { e.stopPropagation(); setPreview(transaction.image); }}
                  />
                )}
              </div>

              {/* Amount */}
              <div className="flex justify-center">
                <span className={`font-semibold text-[16px] ${isSell ? "text-red-600" : "text-green-600"}`}>
                  {amount.toLocaleString("en-BD", { minimumFractionDigits: 2 })}
                </span>
              </div>

              {/* ✅ Actions — PIN দিয়ে */}
              <div className="flex flex-col items-end gap-3 pl-2">
                <button
                  onClick={handleEditRequest}
                  className="p-1 text-gray-400 hover:text-blue-600 transition"
                >
                  <FiEdit2 size={16} />
                </button>
                <button
                  onClick={handleDeleteRequest}
                  className="p-1 text-gray-400 hover:text-red-600 transition"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Share */}
          <div className="mt-4">
            <button className="w-full flex items-center justify-center gap-2 py-3.5 px-4 border border-amber-200 bg-amber-50 text-amber-800 font-semibold rounded-xl transition-all active:scale-[0.98]">
              <span className="material-symbols-outlined text-xl">share</span>
              <span className="text-[15px]">শেয়ার করুন</span>
            </button>
          </div>
        </main>

        <div className="fixed bottom-0 w-full h-8 flex justify-center items-end pb-2 pointer-events-none">
          <div className="w-32 h-1.5 bg-slate-200 rounded-full"></div>
        </div>
      </div>

      {/* ✅ PIN Verify Modal */}
      {showPinModal && (
        <PinVerifyModal
          title={pendingAction === "delete" ? "ডিলিট নিশ্চিত করুন" : "এডিট নিশ্চিত করুন"}
          onSuccess={handlePinSuccess}
          onCancel={() => { setShowPinModal(false); setPendingAction(null); }}
        />
      )}

      {/* ✅ Delete Confirm Modal */}
      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDelete(false)} />
          <div className="relative bg-white rounded-3xl w-full max-w-[300px] p-6 shadow-2xl z-10">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                <FiTrash2 className="text-red-500 text-2xl" />
              </div>
            </div>
            <h3 className="text-center font-bold text-slate-800 mb-2">লেনদেন মুছবেন?</h3>
            <p className="text-center text-sm text-gray-500 mb-6">
              এই লেনদেন ট্র্যাশে চলে যাবে। চাইলে পরে ফেরত আনতে পারবেন।
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDelete(false)}
                className="flex-1 py-3 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 transition"
              >
                বাতিল
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition"
              >
                মুছুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {preview && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setPreview(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-3xl font-bold"
            onClick={() => setPreview(null)}
          >
            ×
          </button>
          <img
            src={preview}
            alt="preview"
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}