import React from "react";
import { IoStar, IoClose } from "react-icons/io5";

export default function FavoriteConfirmModal({ customer, onConfirm, onCancel, mode = "add" }) {
  if (!customer) return null;

  const isRemove = mode === "remove"; // ✅ mode check

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />

      <div className="relative bg-white rounded-3xl w-full max-w-[320px] p-6 shadow-2xl z-10">
        <button onClick={onCancel} className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400">
          <IoClose size={20} />
        </button>

        <div className="flex justify-center mb-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isRemove ? "bg-red-50" : "bg-green-50"}`}>
            <IoStar className={`text-4xl ${isRemove ? "text-red-400" : "text-green-500"}`} />
          </div>
        </div>

        <h3 className="text-center text-base font-bold text-slate-800 mb-2">
          {isRemove ? "ফেভারিট থেকে সরাবেন?" : "ফেভারিটে যোগ করবেন?"}
        </h3>
        <p className="text-center text-sm text-gray-500 leading-relaxed mb-6">
          আপনি কি{" "}
          <span className="font-semibold text-slate-800">"{customer.name}"</span>{" "}
          কে {isRemove ? "ফেভারিট লিস্ট থেকে সরাতে" : "ফেভারিট কাস্টমারে যোগ করতে"} চান?
        </p>

        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-3 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-500 hover:bg-gray-50 active:scale-95 transition">
            বাতিল
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 rounded-2xl text-white text-sm font-bold active:scale-95 transition flex items-center justify-center gap-2 ${
              isRemove ? "bg-red-400 hover:bg-red-500" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            <IoStar size={14} />
            {isRemove ? "সরিয়ে দিন" : "যোগ করুন"}
          </button>
        </div>
      </div>
    </div>
  );
}