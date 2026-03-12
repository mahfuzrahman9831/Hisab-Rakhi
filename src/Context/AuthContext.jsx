import { createContext, useContext, useState } from "react";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("loggedInUser");
    return stored ? JSON.parse(stored) : null;
  });

  const [confirmationResult, setConfirmationResult] = useState(null);

  // ✅ reCAPTCHA setup
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {},
        },
      );
      window.recaptchaVerifier.render(); // ✅ এই লাইনটা জরুরি
    }
  };

  // ✅ OTP পাঠাও
  const sendOTP = async (phone) => {
    try {
      setupRecaptcha();
      const phoneNumber = "+88" + phone; // বাংলাদেশ কোড
      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier,
      );
      setConfirmationResult(result);
      return { success: true };
    } catch (error) {
      console.error(error);
      // reCAPTCHA reset করো error হলে
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
      return {
        success: false,
        message: "OTP পাঠাতে সমস্যা হয়েছে: " + error.message,
      };
    }
  };

  // ✅ OTP যাচাই করো
  const verifyOTP = async (otp, name, password) => {
    try {
      await confirmationResult.confirm(otp);

      // ✅ LocalStorage এ ইউজার সেভ করো
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const phone = auth.currentUser?.phoneNumber?.replace("+88", "");
      const newUser = { id: Date.now(), name, phone, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      return { success: true };
    } catch (error) {
      return { success: false, message: "OTP ভুল হয়েছে!" };
    }
  };

  // ✅ লগইন
  const login = (phone, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(
      (u) => u.phone === phone && u.password === password,
    );
    if (!found) return { success: false, message: "ফোন বা পাসওয়ার্ড ভুল!" };
    setUser(found);
    localStorage.setItem("loggedInUser", JSON.stringify(found));
    return { success: true };
  };

  // ✅ লগআউট
  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <AuthContext.Provider value={{ user, sendOTP, verifyOTP, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
