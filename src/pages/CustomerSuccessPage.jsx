import React, { useEffect, useState  } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function CustomerSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // AddCustomerPage থেকে পাঠানো customer data
  const customer = location.state?.customer;

  // customer না থাকলে সরাসরি হোমে চলে যাবে
  const [countdown, setCountdown] = useState(5);

useEffect(() => {
  if (!customer) {
    navigate("/customer");
    return;
  }

  const timer = setInterval(() => {
    setCountdown((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        navigate("/customer");
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [customer, navigate]);

  if (!customer) return null;

  return (
    <div className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] flex flex-col items-center justify-center px-6">
      
      {/* Success Icon */}
      <div className="flex flex-col items-center gap-4 mb-8">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="w-14 h-14 text-green-500" strokeWidth={1.5} />
        </div>

        {/* Dynamic Customer Name */}
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          {customer.name}
        </h1>

        <p className="text-base text-gray-500 text-center">
          নতুন কাস্টমার হিসাবে সফলভাবে যোগ করা হয়েছে! 🎉
        </p>
      </div>

      {/* Customer Info Card */}
      <div className="w-full bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-3 mb-8">
        
        {customer.profileImage && (
          <div className="flex justify-center mb-2">
            <img
              src={customer.profileImage}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover border-2 border-green-400"
            />
          </div>
        )}

        <InfoRow label="নাম" value={customer.name} />
        <InfoRow label="ফোন" value={customer.phone} />
        {customer.address && (
          <InfoRow label="ঠিকানা" value={customer.address} />
        )}
        <InfoRow
          label="যোগ করা হয়েছে"
          value={new Date(customer.createdAt).toLocaleDateString("bn-BD", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        />
      </div>
    </div>
  );
}

// ছোট helper component
function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-sm font-medium text-gray-700">{value}</span>
    </div>
  );
}