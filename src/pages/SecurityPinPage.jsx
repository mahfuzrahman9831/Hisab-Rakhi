import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBackIosNew, MdBackspace, MdArrowForward } from "react-icons/md";
import { FaShieldAlt } from "react-icons/fa";
import { useAuth } from '../Context/AuthContext';

const SecurityPinPage = () => {
  const { savePin } = useAuth();
  const navigate = useNavigate();

  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [step, setStep] = useState(1); // 1 = পিন দাও, 2 = কনফার্ম করো
  const [error, setError] = useState("");

  // ✅ যে pin টা active সেটা step অনুযায়ী
  const activePin = step === 1 ? pin : confirmPin;
  const setActivePin = step === 1 ? setPin : setConfirmPin;

  // ✅ Number বাটনে ক্লিক
  const handlePress = (num) => {
    if (activePin.length < 6) {
      setActivePin((prev) => prev + String(num));
      setError("");
    }
  };

  // ✅ Backspace
  const handleBackspace = () => {
    setActivePin((prev) => prev.slice(0, -1));
    setError("");
  };

  // ✅ Confirm বাটন
  const handleConfirm = () => {
    if (step === 1) {
      if (pin.length < 6) {
        setError("৬ সংখ্যার পিন দাও!");
        return;
      }
      setStep(2); // ✅ Step 2 তে যাও
    } else {
      if (confirmPin.length < 6) {
        setError("৬ সংখ্যার পিন দাও!");
        return;
      }
      if (pin !== confirmPin) {
        setError("পিন মিলছে না! আবার চেষ্টা করো।");
        setConfirmPin("");
        return;
      }
      savePin(pin); // ✅ পিন সেভ করো
      navigate("/");
    }
  };

  // ✅ Skip
  const handleSkip = () => {
    savePin(null);
    navigate("/");
  };

  // ✅ Back বাটন
  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setConfirmPin("");
      setError("");
    } else {
      handleSkip();
    }
  };

  return (
    <div className='max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24'>

   
        <div className="bg-[#f6f8f7] min-h-screen flex flex-col items-center justify-between font-sans text-slate-900 antialiased">
          
          {/* Top Navigation Area */}
          <div className="w-full max-w-md px-4 pt-6 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="p-2 rounded-full hover:bg-[#13ec6d]/10 transition-colors"
            >
              <MdArrowBackIosNew className="text-lg" />
            </button>
            {/* ✅ Step ডাইনামিক */}
            <span className="text-sm font-semibold opacity-60 uppercase tracking-widest text-slate-500">
              Step {step} of 2
            </span>
            {/* ✅ Skip বাটন */}
            <button
              onClick={handleSkip}
              className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
            >
              Skip
            </button>
          </div>

          {/* Main Content Area */}
          <main className="w-full max-w-md flex-1 flex flex-col items-center px-8 text-center mt-4">
            
            {/* Illustration Section */}
            <div className="relative mb-8 flex items-center justify-center">
              <div className="absolute w-32 h-32 bg-[#13ec6d]/10 rounded-full blur-2xl"></div>
              <div className="relative bg-white p-6 rounded-3xl shadow-xl shadow-[#13ec6d]/5 border border-[#13ec6d]/20">
                {/* <span className="material-symbols-outlined text-[#13ec6d] text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  shield_lock
                </span> */}
                <FaShieldAlt className="text-[#13ec6d] text-6xl" />

              </div>
            </div>

            {/* ✅ Title ডাইনামিক */}
            <h1 className="text-2xl font-bold mb-3 text-slate-900">
              {step === 1 ? "Create Your Security PIN" : "Confirm Your PIN"}
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed mb-4 max-w-[280px]">
              {step === 1
                ? "This PIN will be required to access your business ledger and keep your financial data safe."
                : "Please enter your PIN again to confirm."}
            </p>

            {/* ✅ Error Message */}
            {error && (
              <p className="text-red-500 text-sm mb-4 font-medium">{error}</p>
            )}

            {/* ✅ PIN Dots ডাইনামিক */}
            <div className="flex gap-4 mb-12">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                    i < activePin.length
                      ? "border-[#13ec6d] bg-[#13ec6d]"
                      : "border-slate-300"
                  }`}
                />
              ))}
            </div>

            {/* Numeric Keypad */}
            <div className="w-full grid grid-cols-3 gap-y-4 gap-x-8 mb-8">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handlePress(num)} // ✅ onClick যোগ হয়েছে
                  className="h-16 flex items-center justify-center text-2xl font-semibold rounded-xl hover:bg-slate-200/50 active:scale-95 transition-all"
                >
                  {num}
                </button>
              ))}
              <div className="h-16"></div>
              <button
                onClick={() => handlePress(0)} // ✅ onClick যোগ হয়েছে
                className="h-16 flex items-center justify-center text-2xl font-semibold rounded-xl hover:bg-slate-200/50 active:scale-95 transition-all"
              >
                0
              </button>
              <button
                onClick={handleBackspace} // ✅ onClick যোগ হয়েছে
                className="h-16 flex items-center justify-center text-2xl font-semibold rounded-xl hover:bg-slate-200/50 active:scale-95 transition-all"
              >
                <MdBackspace className="text-slate-500 text-2xl" />
              </button>
            </div>
          </main>

          {/* Bottom Action Section */}
          <footer className="w-full max-w-md px-6 pb-10">
            <button
              onClick={handleConfirm} // ✅ onClick যোগ হয়েছে
              className="w-full py-4 bg-[#13ec6d] text-slate-900 font-bold rounded-xl shadow-lg shadow-[#13ec6d]/20 flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all"
            >
              {step === 1 ? "Next" : "Confirm PIN"} {/* ✅ ডাইনামিক */}
              <MdArrowForward className="text-sm" />
            </button>
            <p className="text-center mt-4 text-xs text-slate-400 font-medium">
              By setting a PIN, you agree to our{' '}
              <a className="underline hover:text-slate-600" href="#">Security Terms</a>
            </p>
          </footer>
        </div>
     </div>
  );
};

export default SecurityPinPage;
