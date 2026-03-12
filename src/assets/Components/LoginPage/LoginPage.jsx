import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { MdAccountBalanceWallet, MdCall, MdLock } from "react-icons/md";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

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
      navigate("/");
    } else {
      setError(result.message);
    }
  };

  return (

    <div className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24">
      <div className="min-h-screen bg-[#f6f8f7] font-sans text-slate-900 antialiased flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-[440px] space-y-8 bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#13ec6d]/20 text-[#13ec6d]">
              <MdAccountBalanceWallet className="text-3xl text-[#13ec6d]" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Hisab-Rakhi
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* ✅ শুধু এই error বক্সটা নতুন */}
          {error && (
            <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* ✅ onSubmit যোগ হয়েছে */}
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-medium leading-none text-slate-900"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <div className="relative">
                  {/* <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                    call
                  </span> */}
                  <MdCall className="text-slate-400 text-xl absolute left-3 top-1/2 -translate-y-1/2" />
                  {/* ✅ value + onChange যোগ হয়েছে */}
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="flex h-12 w-full rounded-lg border border-slate-200 bg-white px-10 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13ec6d] focus-visible:ring-offset-2"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label
                    className="text-sm font-medium leading-none text-slate-900"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm font-medium text-[#13ec6d] hover:underline underline-offset-4"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <MdLock className="text-slate-400 text-xl absolute left-3 top-1/2 -translate-y-1/2" />
                  {/* ✅ value + onChange + type যোগ হয়েছে */}
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="flex h-12 w-full rounded-lg border border-slate-200 bg-white px-10 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13ec6d] focus-visible:ring-offset-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {/* ✅ onClick যোগ হয়েছে */}
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-slate-400 text-lg" />
                    ) : (
                      <FaEye className="text-slate-400 text-lg" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-[#13ec6d] focus:ring-[#13ec6d]"
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none text-slate-500"
              >
                Keep me logged in
              </label>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-[#13ec6d] px-4 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-[#13ec6d]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13ec6d] focus-visible:ring-offset-2 w-full shadow-lg shadow-[#13ec6d]/20"
            >
              Log in
            </button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200"></span>
            </div>
           
          </div>

         

          <p className="text-center text-sm text-slate-500">
            Don't have an account? {/* ✅ href এর বদলে Link যোগ হয়েছে */}
            <Link
              to="/register"
              className="font-semibold text-[#13ec6d] hover:underline underline-offset-4"
            >
              Create an Account
            </Link>
          </p>
        </div>

        <div className="mt-8 flex items-center gap-6 text-slate-400 text-xs">
          <a href="#" className="hover:text-slate-600">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-slate-600">
            Terms of Service
          </a>
          <a href="#" className="hover:text-slate-600">
            Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
