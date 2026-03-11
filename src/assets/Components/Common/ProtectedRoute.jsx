import { Navigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // লগইন না থাকলে → লগইন পেজে পাঠাও
  if (!user) return <Navigate to="/login" replace />;

  return children;
}