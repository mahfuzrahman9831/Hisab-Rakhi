import React from "react";

export default function CustomerTransactionHeaderCard() {
  return (
    <div className="pt-8 px-4 pb-4">
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
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl border border-green-300 shadow-sm">
          AR
        </div>

        <div>
          <h1 className="text-green-600 text-xl font-bold tracking-tight">
            আবদুর রাজ্জাক
          </h1>

          
        </div>
      </div>

      {/* Balance */}
      <div className="text-center">
        <div className="text-red-400 text-4xl font-bold flex items-center justify-center gap-1">
          <span className="text-2xl font-semibold">৳</span>
          11,930.00
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