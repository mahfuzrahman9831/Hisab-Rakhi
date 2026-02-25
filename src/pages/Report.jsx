import React from "react";
import ReportActions from "../assets/Components/Reports/ReportAction";
import MonthlyOverview from "../assets/Components/Reports/MonthlyOverview";
import IncomeVSExpense from "../assets/Components/Reports/IncomeVSExpense";
import CategoryDistribution from "../assets/Components/Reports/CategoryDistribution";
import TopState from "../assets/Components/Reports/TopState";
import Header from "../assets/Components/Common/Header";

export default function Report() {
  return (
    <div className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] pb-24">
      <Header title="Reports" backTo="AUTO"></Header>
      <ReportActions></ReportActions>
      <MonthlyOverview></MonthlyOverview>
      <IncomeVSExpense></IncomeVSExpense>
      <CategoryDistribution></CategoryDistribution>
      <TopState></TopState>
      {/* <Footer_Nav></Footer_Nav> */}
    </div>
  );
}
