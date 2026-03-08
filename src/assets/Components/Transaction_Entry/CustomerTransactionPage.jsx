import React from "react";
import { useParams } from "react-router-dom";
import { useCustomers } from "../../../Context/CustomerContext";
import Customer_Name from "./Customer_Name";
import Transaction_Form from "./Transaction_Form";
import PageHeader from "../Common/Header";

export default function CustomerTransactionPage() {

  const { id, transactionId } = useParams();
  const { customers, transactions } = useCustomers();

  const customer = customers.find(c => c.id == id);

  const editTransaction = transactions.find(
    t => t.id == transactionId
  );

  return (
    <main className="max-w-[380px] mx-auto w-full pb-24 bg-gray-50 min-h-screen">
      <PageHeader title={editTransaction ? "Edit Transaction" : "New Transaction"} />

      <Customer_Name customer={customer} />

      <Transaction_Form
        customer={customer}
        editTransaction={editTransaction}
      />

    </main>
  );
}