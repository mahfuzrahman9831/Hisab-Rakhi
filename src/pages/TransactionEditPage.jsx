import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCustomers } from "../Context/CustomerContext";
import PageHeader from "../assets/Components/Common/Header";

export default function TransactionEditPage() {

  const { transactionId } = useParams();
  const navigate = useNavigate();

  const { transactions, updateTransaction } = useCustomers();

  const transaction = transactions.find(
    (t) => t.id == transactionId
  );

  const [sell, setSell] = useState(transaction.sell);
  const [buy, setBuy] = useState(transaction.buy);
  const [details, setDetails] = useState(transaction.details);
  const [date, setDate] = useState(transaction.date);
  const [image, setImage] = useState(transaction.image);

  const handleUpdate = () => {

    const updatedTxn = {
      ...transaction,
      sell: Number(sell),
      buy: Number(buy),
      details,
      date,
      image
    };

    updateTransaction(updatedTxn);

    navigate(`/transaction/edit/${transaction.id}`);
  };

  return (
    <div className="max-w-[380px] mx-auto bg-gray-50 min-h-screen">

      <PageHeader
        title="Edit Transaction"
        backTo="AUTO"
      />

      <div className="p-4 space-y-4">

        {/* SELL */}
        <input
          type="number"
          value={sell}
          onChange={(e)=>setSell(e.target.value)}
          className="w-full border p-3 rounded-xl"
          placeholder="Sell"
        />

        {/* BUY */}
        <input
          type="number"
          value={buy}
          onChange={(e)=>setBuy(e.target.value)}
          className="w-full border p-3 rounded-xl"
          placeholder="Buy"
        />

        {/* DETAILS */}
        <textarea
          value={details}
          onChange={(e)=>setDetails(e.target.value)}
          className="w-full border p-3 rounded-xl"
          placeholder="Details"
        />

        {/* UPDATE BUTTON */}
        <button
          onClick={handleUpdate}
          className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold"
        >
          Update
        </button>

      </div>

    </div>
  );
}
