import React, { useState } from "react";
import {
  MdAccountBalanceWallet,
  MdPerson,
  MdEmail,
  MdLock,
} from "react-icons/md";
import { MdArrowForward } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { pageVariants, pageTransition } from "../../../utils/animations";


const RegistrationPage = () => {

  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // আগের handleRegister এর জায়গায় এটা দাও:
  const handleRegister = async (e) => {
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

    const result = await sendOTP(phone);

    if (result.success) {
      // ✅ OTP পেজে যাও, name আর password পাঠাও
      navigate("/otp", { state: { name, password } });
    } else {
      setError(result.message);
    }
  };

  // ✅ import এ sendOTP যোগ করো:
  const { sendOTP } = useAuth();

  return (


     <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={pageTransition}
    className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24"
  >
     
     
      <div className="relative flex min-h-screen w-full flex-col bg-[#f6f8f7] font-sans text-slate-900 antialiased overflow-x-hidden">
        {/* Top Navigation */}
        <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center bg-[#f6f8f7] p-4 pb-2 justify-between"
      >
         
          {/* ✅ Link যোগ হয়েছে */}
          <Link
            to="/login"
            className="text-slate-900 flex size-12 shrink-0 items-center justify-center cursor-pointer hover:bg-slate-200/50 rounded-full transition-colors"
          >
            <MdArrowBack className="text-2xl" />
          </Link>
          <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-12">
            Create Account
          </h2>
        </motion.div>

        {/* Hero Branding Section */}
          <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
        className="flex flex-col items-center px-4 py-8"
      >
          
           <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.15 }}
          className="w-20 h-20 bg-[#13ec6d]/20 rounded-2xl flex items-center justify-center mb-6"
        >
            
           
            <MdAccountBalanceWallet className="text-[#13ec6d] text-5xl" />
          </motion.div>

          <h1 className="text-slate-900 tracking-tight text-[32px] font-bold leading-tight text-center pb-2">
            Join Hisab-Rakhi
          </h1>
          <p className="text-slate-600 text-base font-normal leading-normal text-center max-w-[320px]">
            Register for premium financial tracking and smart insights.
          </p>


        </motion.div>

        {/* ✅ onSubmit যোগ হয়েছে */}


        <form
          onSubmit={handleRegister}
          className="flex flex-col max-w-[480px] mx-auto w-full px-4 gap-y-4"
        >
          {/* ✅ শুধু এই error বক্সটা নতুন */}
          <AnimatePresence>
          {error && (
             <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-lg text-center"
            >
              
              {error}
              
            </motion.div>
          )}
            </AnimatePresence>

           {/* Full Name */}
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3, duration: 0.3 }}
    className="flex flex-col gap-2"
  >
    <label className="text-slate-900 text-sm font-semibold leading-normal">Full Name</label>
    <div className="relative">
      <MdPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
      <input
        type="text"
        placeholder="Enter your full name"
        className="flex w-full rounded-xl text-slate-900 border border-slate-200 bg-white h-14 pl-12 pr-4 focus:border-[#13ec6d] focus:ring-1 focus:ring-[#13ec6d] focus:outline-none placeholder:text-slate-400 transition-all"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
    </div>
  </motion.div>

  {/* Phone */}
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.38, duration: 0.3 }}
    className="flex flex-col gap-2"
  >
    <label className="text-slate-900 text-sm font-semibold leading-normal">Phone number</label>
    <div className="relative">
      <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
      <input
        type="tel"
        placeholder="Enter your phone number"
        className="flex w-full rounded-xl text-slate-900 border border-slate-200 bg-white h-14 pl-12 pr-4 focus:border-[#13ec6d] focus:ring-1 focus:ring-[#13ec6d] focus:outline-none placeholder:text-slate-400 transition-all"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
    </div>
  </motion.div>

  {/* Password */}
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.46, duration: 0.3 }}
    className="flex flex-col gap-2"
  >
    <label className="text-slate-900 text-sm font-semibold leading-normal">Password</label>
    <div className="relative">
      <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Create a strong password"
        className="flex w-full rounded-xl text-slate-900 border border-slate-200 bg-white h-14 pl-12 pr-12 focus:border-[#13ec6d] focus:ring-1 focus:ring-[#13ec6d] focus:outline-none placeholder:text-slate-400 transition-all"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <motion.button
        whileTap={{ scale: 0.85 }}
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
      >
        {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
      </motion.button>
    </div>
  </motion.div>

  {/* Confirm Password */}
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.54, duration: 0.3 }}
    className="flex flex-col gap-2"
  >
    <label className="text-slate-900 text-sm font-semibold leading-normal">Confirm Password</label>
    <div className="relative">
      <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
      <input
        type="password"
        placeholder="Repeat your password"
        className="flex w-full rounded-xl text-slate-900 border border-slate-200 bg-white h-14 pl-12 pr-4 focus:border-[#13ec6d] focus:ring-1 focus:ring-[#13ec6d] focus:outline-none placeholder:text-slate-400 transition-all"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
    </div>
  </motion.div>

  {/* ✅ Premium Badge — fade + scale */}
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.62, duration: 0.3 }}
    className="flex items-center gap-3 p-4 bg-[#13ec6d]/10 rounded-xl mt-2 border border-[#13ec6d]/20"
  >
    <motion.div
      initial={{ rotate: -20, scale: 0 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.7 }}
    >
      <MdVerifiedUser className="text-[#13ec6d] text-xl" />
    </motion.div>
    <p className="text-slate-700 text-xs font-medium">
      By registering, you get a 14-day trial of our Premium Features.
    </p>
  </motion.div>

          {/* ✅ type="submit" যোগ হয়েছে */}
            <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full bg-[#13ec6d] hover:bg-[#11d662] text-slate-900 font-bold text-base h-14 rounded-xl shadow-lg shadow-[#13ec6d]/20 transition-all flex items-center justify-center gap-2 mt-4"
        >
            <span>Create Premium Account</span>
            <MdArrowForward className="text-xl" />
          </motion.button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-slate-200"></div>
            <span className="px-3 text-slate-400 text-sm font-medium">OR</span>
            <div className="flex-grow h-px bg-slate-200"></div>
          </div>

          {/* Footer Login Link */}
          <div className="text-center pb-12">
            <p className="text-slate-600 text-sm">
              Already have an account? {/* ✅ href এর বদলে Link যোগ হয়েছে */}
              <Link
                to="/login"
                className="text-[#13ec6d] font-bold hover:underline decoration-2 underline-offset-4"
              >
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
     </motion.div>
  );
};

export default RegistrationPage;
