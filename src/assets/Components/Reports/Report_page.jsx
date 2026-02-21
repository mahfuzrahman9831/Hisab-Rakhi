import React from 'react'
import Footer_Nav from '../Dashboard/Footer_Nav'
import TopState from './TopState'
import CategoryDistribution from './CategoryDistribution'
import IncomeVSExpense from './IncomeVSExpense'
import MonthlyOverview from './MonthlyOverview'
import ReportActions from './ReportAction'
import ReportsHeader from './ReportHeader'

export default function Report_page() {
  return (
    <div className="max-w-[380px] mx-auto min-h-screen bg-[#f3f4f6] relative pb-24">
        <ReportsHeader></ReportsHeader>
        <ReportActions></ReportActions>
        <MonthlyOverview></MonthlyOverview>
        <IncomeVSExpense></IncomeVSExpense>
        <CategoryDistribution></CategoryDistribution>
        <TopState></TopState>
        <Footer_Nav></Footer_Nav>
    </div>
  )
}
