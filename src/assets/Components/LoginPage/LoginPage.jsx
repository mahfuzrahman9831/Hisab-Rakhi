import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { MdAccountBalanceWallet, MdCall, MdLock } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { pageVariants, pageTransition } from "../../../utils/animations";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const result = login(phone, password);
    if (result.success) {
      const pinSetupDone = localStorage.getItem("pinSetupDone");
      if (!pinSetupDone) {
        navigate("/pin-setup");
      } else {
        navigate("/");
      }
    } else {
      setError(result.message);
    }
  };

  return (
    // ✅ Page transition
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="min-h-screen bg-[#f6f8f7] font-sans text-slate-900 antialiased flex flex-col items-center justify-center px-4 py-12"
    >
      {/* ✅ Card slide up */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[440px] space-y-8 bg-white p-8 rounded-xl shadow-sm border border-slate-200"
      >
        {/* ✅ Icon + Title */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#13ec6d]/20"
          >
            <MdAccountBalanceWallet className="text-3xl text-[#13ec6d]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="text-2xl font-bold tracking-tight text-slate-900"
          >
            Hisab-Rakhi
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="mt-2 text-sm text-slate-500"
          >
            Welcome back! Please enter your details.
          </motion.p>
        </div>

        {/* ✅ Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: [0, -8, 8, -8, 8, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-lg text-center"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ✅ Form */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.3 }}
          className="space-y-6"
          onSubmit={handleLogin}
        >
          <div className="space-y-4">

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="flex flex-col gap-2"
            >
              <label className="text-sm font-medium leading-none text-slate-900" htmlFor="phone">
                Phone Number
              </label>
              <div className="relative">
                <MdCall className="text-slate-400 text-xl absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="phone"
                  type="tel"
                  placeholder="+8801XXXXXXXXX"
                  className="flex h-12 w-full rounded-lg border border-slate-200 bg-white px-10 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13ec6d] focus-visible:ring-offset-2"
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
              transition={{ delay: 0.48, duration: 0.3 }}
              className="flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium leading-none text-slate-900" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-[#13ec6d] hover:underline underline-offset-4">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <MdLock className="text-slate-400 text-xl absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="flex h-12 w-full rounded-lg border border-slate-200 bg-white px-10 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13ec6d] focus-visible:ring-offset-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword
                    ? <FaEyeSlash className="text-lg" />
                    : <FaEye className="text-lg" />
                  }
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Remember me */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.54, duration: 0.3 }}
            className="flex items-center space-x-2"
          >
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-[#13ec6d] focus:ring-[#13ec6d]"
            />
            <label htmlFor="remember" className="text-sm font-medium leading-none text-slate-500">
              Keep me logged in
            </label>
          </motion.div>

          {/* Submit */}
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.3 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-[#13ec6d] px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-[#13ec6d]/90 w-full shadow-lg shadow-[#13ec6d]/20"
          >
            Log in
          </motion.button>
        </motion.form>

        {/* Divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-200"></span>
          </div>
        </div>

        {/* Register link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.3 }}
          className="text-center text-sm text-slate-500"
        >
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-[#13ec6d] hover:underline underline-offset-4">
            Create an Account
          </Link>
        </motion.p>
      </motion.div>

      {/* Footer links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.3 }}
        className="mt-8 flex items-center gap-6 text-slate-400 text-xs"
      >
        <a href="#" className="hover:text-slate-600">Privacy Policy</a>
        <a href="#" className="hover:text-slate-600">Terms of Service</a>
        <a href="#" className="hover:text-slate-600">Support</a>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;