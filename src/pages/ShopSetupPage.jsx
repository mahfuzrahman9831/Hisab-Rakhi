import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { MdStorefront, MdLocationOn, MdArrowForward } from "react-icons/md";

export default function ShopSetupPage() {
  const { saveShopInfo } = useAuth();
  const navigate = useNavigate();

  const [shopName, setShopName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!shopName) {
      setError("দোকানের নাম দেওয়া জরুরি!");
      return;
    }

    saveShopInfo({ shopName, shopAddress });
    navigate("/"); // ✅ Dashboard এ যাবে
  };

  return (
    <div className="min-h-screen bg-[#f6f8f7] font-sans flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[440px] bg-white p-8 rounded-xl shadow-sm border border-slate-200 space-y-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 w-16 h-16 bg-[#13ec6d]/20 rounded-2xl flex items-center justify-center">
            <MdStorefront className="text-4xl text-[#13ec6d]" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">দোকানের তথ্য দাও</h2>
          <p className="mt-2 text-sm text-slate-500">
            তোমার দোকানের নাম ও ঠিকানা দাও
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Shop Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-900">
              দোকানের নাম *
            </label>
            <div className="relative">
              <MdStorefront className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
              <input
                type="text"
                placeholder="যেমন: Mahfuz Shu & Bostraloy"
                className="flex w-full rounded-xl border border-slate-200 bg-white h-14 pl-12 pr-4 focus:border-[#13ec6d] focus:ring-1 focus:ring-[#13ec6d] focus:outline-none placeholder:text-slate-400 transition-all"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Shop Address */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-900">
              দোকানের ঠিকানা
            </label>
            <div className="relative">
              <MdLocationOn className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
              <input
                type="text"
                placeholder="যেমন: ঢাকা, বাংলাদেশ"
                className="flex w-full rounded-xl border border-slate-200 bg-white h-14 pl-12 pr-4 focus:border-[#13ec6d] focus:ring-1 focus:ring-[#13ec6d] focus:outline-none placeholder:text-slate-400 transition-all"
                value={shopAddress}
                onChange={(e) => setShopAddress(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#13ec6d] hover:bg-[#11d662] text-slate-900 font-bold text-base h-14 rounded-xl shadow-lg shadow-[#13ec6d]/20 transition-all flex items-center justify-center gap-2 mt-4 active:scale-[0.98]"
          >
            <span>শুরু করো</span>
            <MdArrowForward className="text-xl" />
          </button>

        </form>
      </div>
    </div>
  );
}