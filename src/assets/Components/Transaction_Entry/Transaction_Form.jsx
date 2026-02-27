import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import CustomCalendar from "../../Components/Common/MobileDatePicker";
import CameraButton from "../Common/CameraButton";
import { useCustomers } from "../../../Context/CustomerContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";




export default function Transaction_Form() {
  const navigate = useNavigate();
  const [sell, setSell] = useState("");
  const [buy, setBuy] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState(null);



  const { id } = useParams();

  const { customers, setCustomers, addTransaction } = useCustomers();

  const customer = customers.find(c => c.id === Number(id));



const handleSubmit = () => {
  if (!sell && !buy) {
    alert("Please enter Sell or Buy amount");
    return;
  }

  const sellAmount = sell ? Number(sell) : 0;
  const buyAmount = buy ? Number(buy) : 0;

  const previousBalance = customer?.balance || 0;

 const currentBalance =
  previousBalance + sellAmount - buyAmount;

  const transaction = {
    id: Date.now(),
    customerId: customer.id,
    sell: sellAmount,
    buy: buyAmount,
    details,
    date,
    image,
  };

  // Save transaction
  addTransaction(transaction);

  // Update customer balance
 setCustomers(prev =>
  prev.map(c =>
    c.id === customer.id
      ? {
          ...c,
          balance: currentBalance,
          updatedAt: new Date().toISOString(), // 🔥 important
        }
      : c
  )
);

  // Reset form
  setSell("");
  setBuy("");
  setDetails("");
  setDate(new Date());
  setImage(null);

  // 🔥 Send data to success page
  navigate("/transaction-complete", {
    state: {
      customerId: customer.id,
      sell: sellAmount,
      buy: buyAmount,
      previousBalance,
      currentBalance,
    }
  });
};



  return (
    <main className="flex-1 px-5 py-6 space-y-6 bg-white">
      <style>
        {`
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}
      </style>

      {/* Sell */}
      <div className="relative">
        <input
          type="number"
          id="sell"
          value={sell}
          onChange={(e) => {
            setSell(e.target.value);
            setBuy(""); // একসাথে দুইটা না দিতে চাইলে
          }}
          placeholder=" "
          className="peer w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-xl font-semibold text-red-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-all"
        />
        <label
          htmlFor="sell"
          className="absolute left-3 -top-2.5 px-1.5 bg-white text-[13px] font-semibold text-red-600"
        >
          Sell / দিলাম
        </label>
      </div>

      {/* Buy */}
      <div className="relative">
        <input
          type="number"
          id="buy"
          value={buy}
          onChange={(e) => {
            setBuy(e.target.value);
            setSell(""); // একসাথে দুইটা না দিতে চাইলে
          }}
          placeholder=" "
          className="peer w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-xl font-semibold text-green-600 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition-all"
        />
        <label
          htmlFor="buy"
          className="absolute left-3 -top-2.5 px-1.5 bg-white text-[13px] font-semibold text-green-600"
        >
          Buy / পেলাম
        </label>
      </div>

      {/* Details */}
      <div className="relative">
        <textarea
          id="details"
          rows="2"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder=" "
          className="peer w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-700 resize-none focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition-all"
        />
        <label
          htmlFor="details"
          className="absolute left-3 -top-2.5 px-1.5 bg-white text-[13px] font-semibold text-gray-500"
        >
          Details / বিবরণ
        </label>
      </div>

      {/* Date & Camera */}
      <div className="flex gap-4">
        <CustomCalendar value={date} onChange={setDate} />
        <CameraButton onImageSelect={setImage} />
      </div>

      {/* Image Preview */}
      {image && (
        <img
          src={image}
          alt="preview"
          className="w-24 h-24 rounded-xl object-cover"
        />
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] transition-all text-white h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
      >
        <FaUserPlus size={18} />
        Submit
      </button>
    </main>
  );
}