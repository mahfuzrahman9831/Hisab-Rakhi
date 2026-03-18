import React, { useState } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { MdBackspace, MdClose } from "react-icons/md";
import { FaShieldAlt } from "react-icons/fa";

export default function PinVerifyModal({ onSuccess, onCancel, title = "পিন দিয়ে নিশ্চিত করুন" }) {
  const { pin } = useAuth();
  const [entered, setEntered] = useState("");
  const [error, setError] = useState("");

  // ✅ PIN নেই — directly allow
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
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal — SecurityPinPage এর style এ */}
      <div className="relative bg-[#f6f8f7] rounded-3xl w-full max-w-[340px] mx-6 shadow-2xl z-10 overflow-hidden">

        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-200/50 text-slate-400 z-10"
        >
          <MdClose size={18} />
        </button>

        <div className="flex flex-col items-center px-8 pt-8 pb-6 text-center">

          {/* Icon — SecurityPinPage এর মতো */}
          <div className="relative mb-6 flex items-center justify-center">
            <div className="absolute w-24 h-24 bg-[#13ec6d]/10 rounded-full blur-2xl"></div>
            <div className="relative bg-white p-5 rounded-3xl shadow-xl shadow-[#13ec6d]/5 border border-[#13ec6d]/20">
              <FaShieldAlt className="text-[#13ec6d] text-5xl" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold mb-2 text-slate-900">{title}</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-4 max-w-[240px]">
            নিরাপত্তার জন্য আপনার সিকিউরিটি পিন দিন
          </p>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mb-3 font-medium">{error}</p>
          )}

          {/* PIN Dots — SecurityPinPage এর মতো */}
          <div className="flex gap-4 mb-8">
            {[0,1,2,3,4,5].map((i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                  i < entered.length
                    ? "border-[#13ec6d] bg-[#13ec6d]"
                    : "border-slate-300"
                }`}
              />
            ))}
          </div>

          {/* Keypad — SecurityPinPage এর মতো */}
          <div className="w-full grid grid-cols-3 gap-y-2 gap-x-6 mb-6">
            {[1,2,3,4,5,6,7,8,9].map((num) => (
              <button
                key={num}
                onClick={() => handlePress(num)}
                className="h-14 flex items-center justify-center text-2xl font-semibold rounded-xl hover:bg-slate-200/50 active:scale-95 transition-all text-slate-900"
              >
                {num}
              </button>
            ))}
            <div className="h-14" />
            <button
              onClick={() => handlePress(0)}
              className="h-14 flex items-center justify-center text-2xl font-semibold rounded-xl hover:bg-slate-200/50 active:scale-95 transition-all text-slate-900"
            >
              0
            </button>
            <button
              onClick={handleBackspace}
              className="h-14 flex items-center justify-center rounded-xl hover:bg-slate-200/50 active:scale-95 transition-all"
            >
              <MdBackspace className="text-slate-500 text-2xl" />
            </button>
          </div>

          {/* ✅ Auto verify — ৬ সংখ্যা পূর্ণ হলেই verify হয়, বাটন দরকার নেই */}
          <p className="text-xs text-slate-400">
            ৬ সংখ্যার পিন দিলেই স্বয়ংক্রিয়ভাবে যাচাই হবে
          </p>
        </div>
      </div>
    </div>
  );
}