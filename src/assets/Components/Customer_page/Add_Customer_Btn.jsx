import React from "react";

export default function Add_Customer_Btn() {
  return (
    <div>
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md px-6 pointer-events-none">
        <button className="pointer-events-auto w-full flex items-center justify-center gap-2 bg-green-500 text-white font-semibold py-4 rounded-xl shadow-2xl shadow-green-500/30 hover:scale-[1.02] active:scale-95 transition-transform">
          <span className="text-lg font-bold">+</span>
          Add New Customer
        </button>
      </div>
    </div>
  );
}
