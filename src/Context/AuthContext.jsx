import { createContext, useContext, useState } from "react";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("loggedInUser");
    return stored ? JSON.parse(stored) : null;
  });

  // ✅ নতুন — shopInfo যোগ হয়েছে
  const [shopInfo, setShopInfo] = useState(() => {
    const stored = localStorage.getItem("shopInfo");
    return stored ? JSON.parse(stored) : null;
  });

  const [pin, setPin] = useState(() => {
  return localStorage.getItem("userPin") || null;
});

  const [confirmationResult, setConfirmationResult] = useState(null);

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
      window.recaptchaVerifier.render();
    }
  };

  const sendOTP = async (phone) => {
    try {
      setupRecaptcha();
      const phoneNumber = "+88" + phone;
      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier,
      );
      setConfirmationResult(result);
      return { success: true };
    } catch (error) {
      console.error(error);
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

  const verifyOTP = async (otp, name, password) => {
    try {
      await confirmationResult.confirm(otp);
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };


  const savePin = (newPin) => {
  setPin(newPin);
  if (newPin) {
    localStorage.setItem("userPin", newPin);
  }
  //  প্রথমবার লগইন হয়েছে মার্ক করো
  localStorage.setItem("pinSetupDone", "true");
};

  //  নতুন — দোকানের তথ্য সেভ করার ফাংশন
  const saveShopInfo = (info) => {
    setShopInfo(info);
    localStorage.setItem("shopInfo", JSON.stringify(info));
  };

  return (
    // shopInfo আর saveShopInfo যোগ হয়েছে
    <AuthContext.Provider value={{ user, shopInfo, pin, savePin, saveShopInfo, sendOTP, verifyOTP, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}