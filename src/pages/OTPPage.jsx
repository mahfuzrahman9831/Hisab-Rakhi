import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { MdAccountBalanceWallet } from "react-icons/md";

export default function OTPPage() {
  const { verifyOTP } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // RegistrationPage থেকে পাঠানো name + password
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
      navigate("/shop-setup"); // ✅ OTP সঠিক → শপ সেটআপ পেজে যাও
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f8f7] font-sans flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[440px] bg-white p-8 rounded-xl shadow-sm border border-slate-200 space-y-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#13ec6d]/20">
            <MdAccountBalanceWallet className="text-3xl text-[#13ec6d]" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">OTP যাচাই করো</h2>
          <p className="mt-2 text-sm text-slate-500">
            তোমার ফোনে একটা OTP পাঠানো হয়েছে
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-900">OTP কোড</label>
            <input
              type="number"
              placeholder="6 সংখ্যার OTP দাও"
              className="flex w-full rounded-xl border border-slate-200 bg-white h-14 px-4 text-center text-xl font-bold tracking-widest focus:border-[#13ec6d] focus:ring-1 focus:ring-[#13ec6d] focus:outline-none placeholder:text-slate-400 placeholder:text-sm placeholder:font-normal placeholder:tracking-normal"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#13ec6d] hover:bg-[#11d662] text-slate-900 font-bold text-base h-14 rounded-xl shadow-lg shadow-[#13ec6d]/20 transition-all active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? "যাচাই হচ্ছে..." : "OTP যাচাই করো ✓"}
          </button>
        </form>

      </div>

      {/* ✅ reCAPTCHA এখানে থাকবে — দেখা যাবে না */}
      <div id="recaptcha-container"></div>
    </div>
  );
}