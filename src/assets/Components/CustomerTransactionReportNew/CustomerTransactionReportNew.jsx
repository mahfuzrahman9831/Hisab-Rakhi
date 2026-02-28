import React from "react";
import { useParams } from "react-router-dom";
import { useCustomers } from "../../../Context/CustomerContext";
import CustomerTransactionHeaderCard from "./CustomerTransactionHeaderCard";
import CustomerTransactionActionBar from "./CustomerTransactionActionBar";
import CustomerTransactionList from "./CustomerTransactionList";
import PageHeader from "../Common/Header";

export default function CustomerTransactionReportNew() {

  const { id } = useParams();
  const { customers } = useCustomers();

  const customer = customers.find(c => c.id === Number(id));

  if (!customer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        Customer not found
      </div>
    );
  }

  return (
    <div className="max-w-[380px] mx-auto w-full pb-24">

        <PageHeader title="Transaction Details" backTo="AUTO"></PageHeader>

      {/* Header Card */}
      <CustomerTransactionHeaderCard customer={customer} />

      {/* Action Bar */}
      <CustomerTransactionActionBar />

      {/* Table Header */}
      <div className="px-6 py-3 flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-200 mt-2">
        <span>Transaction Details</span>
        <span>Amount</span>
      </div>

      {/* Transaction List */}
      <CustomerTransactionList customer={customer} />

    </div>
  );
}