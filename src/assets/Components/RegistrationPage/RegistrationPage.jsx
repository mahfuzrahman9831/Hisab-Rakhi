import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';

const HisabRakhiRegister = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("পাসওয়ার্ড দুটো মিলছে না!");
      return;
    }
    if (password.length < 6) {
      setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!");
      return;
    }
    const result = register(name, phone, password);
    if (result.success) {
      navigate("/login");
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#f6f8f7] font-sans text-slate-900 antialiased overflow-x-hidden">
      
      {/* Top Navigation */}
      <div className="flex items-center bg-[#f6f8f7] p-4 pb-2 justify-between">
        {/* ✅ Link যোগ হয়েছে */}
        <Link to="/login" className="text-slate-900 flex size-12 shrink-0 items-center justify-center cursor-pointer hover:bg-slate-200/50 rounded-full transition-colors">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </Link>
        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">
          Create Account
        </h2>
      </div>

      {/* Hero Branding Section */}
      <div className="flex flex-col items-center px-4 py-8">
        <div className="w-20 h-20 bg-[#13ec6d]/20 rounded-2xl flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-[#13ec6d] text-5xl">account_balance_wallet</span>
        </div>
        <h1 className="text-slate-900 tracking-tight text-[32px] font-bold leading-tight text-center pb-2">
          Join Hisab-Rakhi
        </h1>
        <p className="text-slate-600 text-base font-normal leading-normal text-center max-w-[320px]">
          Register for premium financial tracking and smart insights.
        </p>
      </div>

      {/* ✅ onSubmit যোগ হয়েছে */}
      <form onSubmit={handleRegister} className="flex flex-col max-w-[480px] mx-auto w-full px-4 gap-y-4">

        {/* ✅ শুধু এই error বক্সটা নতুন */}
        {error && (
          <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-900 text-sm font-semibold leading-normal">Full Name</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">person</span>
            {/* ✅ value + onChange যোগ হয়েছে */}
            <input
              type="text"
              placeholder="Enter your full name"
              className="flex w-full rounded-xl text-slate-900 border border-slate-200 bg-white h-14 pl-12 pr-4 focus:border-[#13ec6d] focus:ring-1 focus:ring-[#13ec6d] focus:outline-none placeholder:text-slate-400 transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Email or Phone */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-900 text-sm font-semibold leading-normal">Email or Phone</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
            {/* ✅ value + onChange যোগ হয়েছে */}
            <input
              type="text"
              placeholder="example@mail.com"
              className="flex w-full rounded-xl text-slate-900 border border-slate-200 bg-white h-14 pl-12 pr-4 focus:border-[#13ec6d] focus:ring-1 focus:ring-[#13ec6d] focus:outline-none placeholder:text-slate-400 transition-all"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-900 text-sm font-semibold leading-normal">Password</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">lock</span>
            {/* ✅ value + onChange + type যোগ হয়েছে */}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              className="flex w-full rounded-xl text-slate-900 border border-slate-200 bg-white h-14 pl-12 pr-12 focus:border-[#13ec6d] focus:ring-1 focus:ring-[#13ec6d] focus:outline-none placeholder:text-slate-400 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* ✅ onClick যোগ হয়েছে */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-slate-600"
            >
              {showPassword ? "visibility_off" : "visibility"}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <label className="text-slate-900 text-sm font-semibold leading-normal">Confirm Password</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">lock_reset</span>
            {/* ✅ value + onChange যোগ হয়েছে */}
            <input
              type="password"
              placeholder="Repeat your password"
              className="flex w-full rounded-xl text-slate-900 border border-slate-200 bg-white h-14 pl-12 pr-4 focus:border-[#13ec6d] focus:ring-1 focus:ring-[#13ec6d] focus:outline-none placeholder:text-slate-400 transition-all"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Premium Badge Notice */}
        <div className="flex items-center gap-3 p-4 bg-[#13ec6d]/10 rounded-xl mt-2 border border-[#13ec6d]/20">
          <span className="material-symbols-outlined text-[#13ec6d]">verified_user</span>
          <p className="text-slate-700 text-xs font-medium">
            By registering, you get a 14-day trial of our Premium Features.
          </p>
        </div>

        {/* ✅ type="submit" যোগ হয়েছে */}
        <button
          type="submit"
          className="w-full bg-[#13ec6d] hover:bg-[#11d662] text-slate-900 font-bold text-base h-14 rounded-xl shadow-lg shadow-[#13ec6d]/20 transition-all flex items-center justify-center gap-2 mt-4 active:scale-[0.98]"
        >
          <span>Create Premium Account</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-slate-200"></div>
          <span className="px-3 text-slate-400 text-sm font-medium">OR</span>
          <div className="flex-grow h-px bg-slate-200"></div>
        </div>

        {/* Footer Login Link */}
        <div className="text-center pb-12">
          <p className="text-slate-600 text-sm">
            Already have an account?{' '}
            {/* ✅ href এর বদলে Link যোগ হয়েছে */}
            <Link to="/login" className="text-[#13ec6d] font-bold hover:underline decoration-2 underline-offset-4">
              Login here
            </Link>
          </p>
        </div>

      </form>
    </div>
  );
};

export default HisabRakhiRegister;