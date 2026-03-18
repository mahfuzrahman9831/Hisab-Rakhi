import React from "react";
import ReportActions from "../assets/Components/Reports/ReportAction";
import MonthlyOverview from "../assets/Components/Reports/MonthlyOverview";
import IncomeVSExpense from "../assets/Components/Reports/IncomeVSExpense";
import CategoryDistribution from "../assets/Components/Reports/CategoryDistribution";
import TopState from "../assets/Components/Reports/TopState";
import Header from "../assets/Components/Common/Header";
import { motion } from "framer-motion";
import { pageVariants, pageTransition, slideUpVariants } from "../utils/animations";

export default function Report() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] pb-24"
    >
      <Header title="Reports" backTo="AUTO" />

      {/* ✅ প্রতিটা section stagger এ আসবে */}
      {[ReportActions, MonthlyOverview, IncomeVSExpense, CategoryDistribution, TopState].map((Component, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.35, ease: "easeOut" }}
        >
          <Component />
        </motion.div>
      ))}
    </motion.div>
  );
}