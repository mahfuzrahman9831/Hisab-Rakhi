import React from "react";

export default function CustomerTransactionHeaderCard({ customer }) {


   // Customer initials
  const getInitials = (name) => {
    if (!name) return "";

    const parts = name.trim().split(" ");

    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }

    return (
      parts[0][0] +
      parts[parts.length - 1][0]
    ).toUpperCase();
  };

  const balance = customer.balance || 0;




  return (
    <div className="pt-3 px-2 pb-1">
  <div className="relative rounded-3xl p-6 overflow-hidden
                  bg-white/10 
                  backdrop-blur-xl
                  border border-white/20
                  shadow-[0_8px_32px_rgba(0,0,0,0.25)]">

    {/* Soft Green Glow Background */}
    <div className="absolute -top-20 -right-20 w-60 h-60 bg-green-600/20 rounded-full blur-3xl"></div>
    <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-400/20 rounded-full blur-3xl"></div>

    <div className="relative z-10">

      {/* User Info */}
      <div className="text-center mb-6">
            {/* <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl border border-green-300 shadow-sm">
              {getInitials(customer.name)}
            </div> */}

            <div>
              <h1 className="text-green-600 text-2xl font-bold tracking-tight">
                {customer.name}
              </h1>
            </div>
          </div>

      {/* Balance */}
      <div className="text-center">
            <div
              className={`text-3xl font-bold flex items-center justify-center gap-1 ${
                balance > 0
                  ? "text-red-500"
                  : balance < 0
                  ? "text-green-500"
                  : "text-gray-400"
              }`}
            >
              <span className="text-2xl font-semibold">৳</span>
              {Math.abs(balance).toLocaleString("en-BD", {
                minimumFractionDigits: 2,
              })}
            </div>

        <p className="text-green-600 text-xs mt-1 uppercase tracking-widest">
          Current Balance
        </p>
      </div>

    </div>
  </div>
</div>
  );
}