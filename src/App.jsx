import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./assets/Components/Dashboard/Dashboard";
import Footer_Nav from "./assets/Components/Dashboard/Footer_Nav";
import Settings from "./pages/Settings";
import AddCustomerPage from "./pages/AddCustomerPage";
import Customer from "./pages/Customer";
import Report from "./pages/Report";
import CustomerDetails from "./pages/CustomerDetails";
import CompleteTransactionPage from "./assets/Components/CompleteTransactionPage/CompleteTransactionPage";
import CustomerTransactionReportNew from "./assets/Components/CustomerTransactionReportNew/CustomerTransactionReportNew";
import EditCustomerPage from "./assets/Components/EditCustomer/EditCustomerPage";
import DeleteCustomerPage from "../src//assets/Components/DeleteCustomerPage/DeleteCustomerPage";
import SingleTransactionPage from "./assets/Components/SingleTransactionPage/SingleTransactionPage";
import CustomerTransactionPage from "./assets/Components/Transaction_Entry/CustomerTransactionPage";
import CustomerSuccessPage from "./pages/CustomerSuccessPage";
import OTPPage from "./pages/OTPPage";

// ✅ নতুন import
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./assets/Components/Common/ProtectedRoute";
import LoginPage from "./assets/Components/LoginPage/LoginPage";
import RegistrationPage from "./assets/Components/RegistrationPage/RegistrationPage";




function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const allowedRoutes = ["/", "/customer"];
  const showButton = allowedRoutes.includes(location.pathname);

  // ✅ এই লাইনটা যোগ করো
const hideNav = ["/login", "/register"].includes(location.pathname);

  return (
    // ✅ AuthProvider দিয়ে সব wrap করো
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="flex-1">
          <Routes>

           
            {/* ✅ Public Routes — যে কেউ দেখতে পারবে */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />

            {/* ✅ Protected Routes — শুধু লগইন করলে দেখা যাবে */}
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/customer" element={<ProtectedRoute><Customer /></ProtectedRoute>} />
            <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/add-customer" element={<ProtectedRoute><AddCustomerPage /></ProtectedRoute>} />
            <Route path="/customer/:id" element={<ProtectedRoute><CustomerDetails /></ProtectedRoute>} />
            <Route path="/transaction-complete" element={<ProtectedRoute><CompleteTransactionPage /></ProtectedRoute>} />
            <Route path="/customer/:id/report" element={<ProtectedRoute><CustomerTransactionReportNew /></ProtectedRoute>} />
            <Route path="/customer/:id/edit" element={<ProtectedRoute><EditCustomerPage /></ProtectedRoute>} />
            <Route path="/customer/:id/delete" element={<ProtectedRoute><DeleteCustomerPage /></ProtectedRoute>} />
            <Route path="/transaction/:transactionId" element={<ProtectedRoute><SingleTransactionPage /></ProtectedRoute>} />
            <Route path="/customer/:id/report/edit/:transactionId" element={<ProtectedRoute><CustomerTransactionPage /></ProtectedRoute>} />
            <Route path="/success" element={<ProtectedRoute><CustomerSuccessPage /></ProtectedRoute>} />
            <Route path="/otp" element={<OTPPage />} />

          </Routes>
        </div>

        {/* Floating Button */}
        {showButton && (
          <div className="pointer-events-none fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[380px] px-6 flex justify-end z-40">
            <button
              onClick={() => navigate("/add-customer")}
              className="pointer-events-auto w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl shadow-green-500/30 flex items-center justify-center transition active:scale-95"
            >
              <span className="text-3xl font-bold leading-none">+</span>
            </button>
          </div>
        )}

         {/* ✅ এই লাইনটা — আগের Footer_Nav এর জায়গায় */}
        {!hideNav && <Footer_Nav />}
      </div>
    </AuthProvider>
  );
}

export default App;