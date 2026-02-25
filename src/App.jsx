import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./assets/Components/Dashboard/Dashboard";
import Footer_Nav from "./assets/Components/Dashboard/Footer_Nav";
import Settings from "./pages/Settings";
import AddCustomerPage from "./pages/AddCustomerPage";
import Customer from "./pages/Customer";
import Report from "./pages/Report";
import CustomerDetails from "./pages/CustomerDetails";




function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const allowedRoutes = ["/", "/customer"];
  const showButton = allowedRoutes.includes(location.pathname);


  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/report" element={<Report />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/add-customer" element={<AddCustomerPage />} />
            <Route path="/customer/:id" element={<CustomerDetails />} />
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

        {/* Navbar */}
        <Footer_Nav></Footer_Nav>
      </div>
    </>
  );
}

export default App;
