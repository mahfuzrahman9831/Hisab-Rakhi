import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("loggedInUser");
    return stored ? JSON.parse(stored) : null;
  });

  // ✅ রেজিস্ট্রেশন
  const register = (name, phone, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // একই ফোন নম্বর আগে আছে কিনা চেক
    const exists = users.find((u) => u.phone === phone);
    if (exists) return { success: false, message: "এই নম্বরে আগেই অ্যাকাউন্ট আছে!" };

    const newUser = { id: Date.now(), name, phone, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return { success: true };
  };

  // ✅ লগইন
  const login = (phone, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find((u) => u.phone === phone && u.password === password);

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
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}