import React, { useMemo, useEffect } from "react";
import { useCustomers } from "../../../Context/CustomerContext";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { cardVariants, slideUpVariants } from "../../../utils/animations";

// ✅ Animated number counter
function AnimatedNumber({ value, formatter }) {
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => formatter(v));

  useEffect(() => {
    const c = animate(count, value, { duration: 1.0, ease: "easeOut" });
    return c.stop;
  }, [value]);

  return <motion.span>{display}</motion.span>;
}

export default function SummaryCardNew() {
  const { transactions } = useCustomers();

  const todayStats = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayTxns = transactions.filter((t) => {
      const txnDate = new Date(t.date);
      txnDate.setHours(0, 0, 0, 0);
      return txnDate.getTime() === today.getTime();
    });

    const dilam = todayTxns.reduce((sum, t) => sum + (Number(t.sell) || 0), 0);
    const pelam = todayTxns.reduce((sum, t) => sum + (Number(t.buy) || 0), 0);
    const net = pelam - dilam;

    const MAX = 50000;
    const pelamPct = Math.min((pelam / MAX) * 100, 100);
    const dilamPct = Math.min((dilam / MAX) * 100, 100);

    return { pelam, dilam, net, pelamPct, dilamPct };
  }, [transactions]);

  const formatTaka = (amount) => {
    if (amount >= 100000) return "৳" + (amount / 100000).toFixed(1) + "L";
    if (amount >= 1000) return "৳" + (amount / 1000).toFixed(1) + "K";
    return "৳" + Math.round(amount).toLocaleString("en-BD");
  };

  const getGaugeDash = (pct) => {
    const total = 87.96;
    const filled = (pct / 100) * total;
    return `${filled}, 100`;
  };

  return (
    // ✅ Card slide in
    <motion.section
      variants={cardVariants}
      initial="initial"
      animate="animate"
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="flex justify-between items-center mb-6"
      >
        <h2 className="font-semibold text-slate-700">আজকের হিসাব</h2>
        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
          আজ
        </span>
      </motion.div>

      {/* Gauges */}
      <div className="grid grid-cols-2 gap-8 items-center justify-center">

        {/* ✅ দিলাম Gauge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-slate-200 stroke-current"
                d="M4 20a14 14 0 1 1 28 0"
                fill="none"
                strokeWidth="3"
              />
              <path
                className="text-red-500 stroke-current"
                d="M4 20a14 14 0 1 1 28 0"
                fill="none"
                strokeDasharray={getGaugeDash(todayStats.dilamPct)}
                strokeLinecap="round"
                strokeWidth="3"
                style={{ transition: "stroke-dasharray 0.8s ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
              <span className="text-lg font-bold text-slate-800">
                {/* ✅ Animated counter */}
                <AnimatedNumber value={todayStats.dilam} formatter={formatTaka} />
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                দিলাম
              </span>
            </div>
          </div>
        </motion.div>

        {/* ✅ পেলাম Gauge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
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
                style={{ transition: "stroke-dasharray 0.8s ease" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
              <span className="text-lg font-bold text-slate-800">
                {/* ✅ Animated counter */}
                <AnimatedNumber value={todayStats.pelam} formatter={formatTaka} />
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                পেলাম
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ✅ Net Balance — slide up */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.35 }}
        className="border-t border-slate-100 pt-3 mt-2 flex justify-between items-center"
      >
        <div className="flex items-center gap-2">
          <motion.span
            animate={{
              backgroundColor: todayStats.net < 0 ? "#ef4444" : "#22c55e",
            }}
            transition={{ duration: 0.5 }}
            className="w-2 h-2 rounded-full"
          />
          <span className="text-sm text-slate-500">নেট ব্যালেন্স</span>
        </div>

        <motion.span
          key={todayStats.net} // ✅ value বদলালে re-animate
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ color: todayStats.net < 0 ? "#ef4444" : "#16a34a" }}
          className="text-sm font-bold"
        >
          <AnimatedNumber value={Math.abs(todayStats.net)} formatter={formatTaka} />
        </motion.span>
      </motion.div>
    </motion.section>
  );
}