import React, { useMemo } from "react";
import { useCustomers } from "../../../Context/CustomerContext";

export default function SummaryCardNew() {
  const { transactions } = useCustomers();

  // ✅ আজকের transactions ফিল্টার করো
  const todayStats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayTxns = transactions.filter((t) => {
      const txnDate = new Date(t.date); // ✅ createdAt → date
      txnDate.setHours(0, 0, 0, 0);
      return txnDate.getTime() === today.getTime();
    });

    // ✅ t.type নেই — সরাসরি t.sell / t.buy amount
    const dilam = todayTxns.reduce((sum, t) => sum + (Number(t.sell) || 0), 0); // sell = দিলাম
    const pelam = todayTxns.reduce((sum, t) => sum + (Number(t.buy) || 0), 0); // buy = পেলাম

    const net = pelam - dilam;

    console.log("pelam:", pelam, "dilam:", dilam, "net:", net);

    const MAX = 50000;
    const pelamPct = Math.min((pelam / MAX) * 100, 100);
    const dilamPct = Math.min((dilam / MAX) * 100, 100);

    return { pelam, dilam, net, pelamPct, dilamPct };
  }, [transactions]);

  const formatTaka = (amount) => {
    if (amount >= 100000) return "৳" + (amount / 100000).toFixed(1) + "L";
    if (amount >= 1000) return "৳" + (amount / 1000).toFixed(1) + "K";
    return "৳" + amount.toLocaleString("en-BD");
  };

  // ✅ SVG gauge path — আধা-বৃত্ত
  const getGaugeDash = (pct) => {
    const total = 87.96; // আধা-বৃত্তের circumference
    const filled = (pct / 100) * total;
    return `${filled}, 100`;
  };

  return (
    <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold text-slate-700">আজকের হিসাব</h2>
        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
          আজ
        </span>
      </div>

      <div className="grid grid-cols-2 gap-8 items-center justify-center">
        {/* দিলাম Gauge */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-slate-200 stroke-current"
                d="M4 20a14 14 0 1 1 28 0"
                fill="none"
                strokeWidth="3"
              />
              // দিলাম Gauge path
              <path
                className="text-red-500 stroke-current" // ✅ orange → red
                d="M4 20a14 14 0 1 1 28 0"
                fill="none"
                strokeDasharray={getGaugeDash(todayStats.dilamPct)}
                strokeLinecap="round"
                strokeWidth="3"
                style={{ transition: "stroke-dasharray 0.6s ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
              <span className="text-lg font-bold text-slate-800">
                {formatTaka(todayStats.dilam)}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                দিলাম
              </span>
            </div>
          </div>
        </div>

        {/* পেলাম Gauge */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-slate-200 stroke-current"
                d="M4 20a14 14 0 1 1 28 0"
                fill="none"
                strokeWidth="3"
              />
              <path
                className="text-green-500 stroke-current"
                d="M4 20a14 14 0 1 1 28 0"
                fill="none"
                strokeDasharray={getGaugeDash(todayStats.pelamPct)}
                strokeLinecap="round"
                strokeWidth="3"
                style={{ transition: "stroke-dasharray 0.6s ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
              <span className="text-lg font-bold text-slate-800">
                {formatTaka(todayStats.pelam)}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                পেলাম
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Net */}
      <div className="border-t border-slate-100 pt-3 mt-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              todayStats.net < 0 ? "bg-red-500" : "bg-green-500"
            }`}
          ></span>
          <span className="text-sm text-slate-500">নেট ব্যালেন্স</span>
        </div>

        <span
          className={`text-sm font-bold ${
            todayStats.net < 0 ? "text-red-500" : "text-green-600"
          }`}
        >
          {formatTaka(Math.abs(todayStats.net))}
        </span>
      </div>
    </section>
  );
}
