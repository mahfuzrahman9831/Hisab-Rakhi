import { FaUserPlus } from "react-icons/fa";
import CustomCalendar from "../../Components/Common/MobileDatePicker";
import CameraButton from "../Common/CameraButton";
import { useCustomers } from "../../../Context/CustomerContext";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Transaction_Form({ onSubmit, customer, editTransaction }) {
  const navigate = useNavigate();

  // ✅ sessionStorage key — customer এর জন্য unique
  const formKey = `txn_form_${customer?.id}`;

  // ✅ state restore from sessionStorage
  const [sell, setSell] = useState(() => {
    if (editTransaction?.sell) return editTransaction.sell;
    return sessionStorage.getItem(`${formKey}_sell`) || "";
  });

  const [buy, setBuy] = useState(() => {
    if (editTransaction?.buy) return editTransaction.buy;
    return sessionStorage.getItem(`${formKey}_buy`) || "";
  });

  const [details, setDetails] = useState(() => {
    if (editTransaction?.details) return editTransaction.details;
    return sessionStorage.getItem(`${formKey}_details`) || "";
  });

  const [date, setDate] = useState(() => {
    if (editTransaction?.date) return editTransaction.date;
    const saved = sessionStorage.getItem(`${formKey}_date`);
    return saved ? new Date(saved) : new Date();
  });

  const [image, setImage] = useState(() => {
    if (editTransaction?.image) return editTransaction.image;
    return sessionStorage.getItem(`${formKey}_image`) || null;
  });

  const { setCustomers, addTransaction, updateTransaction } = useCustomers();

  // ✅ state বদলালে sessionStorage এ save করো
  useEffect(() => {
    sessionStorage.setItem(`${formKey}_sell`, sell);
  }, [sell, formKey]);

  useEffect(() => {
    sessionStorage.setItem(`${formKey}_buy`, buy);
  }, [buy, formKey]);

  useEffect(() => {
    sessionStorage.setItem(`${formKey}_details`, details);
  }, [details, formKey]);

  useEffect(() => {
    sessionStorage.setItem(`${formKey}_date`, date);
  }, [date, formKey]);

  useEffect(() => {
    if (image) sessionStorage.setItem(`${formKey}_image`, image);
  }, [image, formKey]);

  const handleSubmit = useCallback(() => {
    const sellAmount = sell ? Number(sell) : 0;
    const buyAmount = buy ? Number(buy) : 0;
    if (sellAmount === 0 && buyAmount === 0) return;

    const previousBalance = customer?.balance || 0;
    const currentBalance = previousBalance + sellAmount - buyAmount;

    const transaction = {
      id: editTransaction ? editTransaction.id : Date.now(),
      customerId: customer.id,
      sell: sellAmount,
      buy: buyAmount,
      details, date, image,
    };

    if (editTransaction) {
      updateTransaction(transaction);
    } else {
      addTransaction(transaction);
    }

    setCustomers(prev =>
      prev.map(c =>
        c.id === customer.id
          ? { ...c, balance: currentBalance, updatedAt: new Date().toISOString() }
          : c
      )
    );

    // ✅ submit হলে sessionStorage clear করো
    sessionStorage.removeItem(`${formKey}_sell`);
    sessionStorage.removeItem(`${formKey}_buy`);
    sessionStorage.removeItem(`${formKey}_details`);
    sessionStorage.removeItem(`${formKey}_date`);
    sessionStorage.removeItem(`${formKey}_image`);

    navigate("/transaction-complete", {
      state: {
        customerId: customer.id,
        sell: sellAmount,
        buy: buyAmount,
        previousBalance,
        currentBalance,
      },
    });
  }, [sell, buy, details, date, image, customer, editTransaction, addTransaction, updateTransaction, setCustomers, navigate, formKey]);

  useEffect(() => {
    if (onSubmit) onSubmit(() => handleSubmit);
  }, [onSubmit, handleSubmit]);

  return (
    <main className="flex-1 px-5 py-6 space-y-6 bg-white">
      <style>{`
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>

      {/* ✅ Sell */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="relative"
      >
        <input
          type="number"
          id="sell"
          value={sell}
          onChange={(e) => { setSell(e.target.value); setBuy(""); }}
          placeholder=" "
          className="peer w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-xl font-semibold text-red-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-all"
        />
        <label htmlFor="sell" className="absolute left-3 -top-2.5 px-1.5 bg-white text-[13px] font-semibold text-red-600">
          Sell / দিলাম
        </label>
      </motion.div>

      {/* ✅ Buy */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.18, duration: 0.3 }}
        className="relative"
      >
        <input
          type="number"
          id="buy"
          value={buy}
          onChange={(e) => { setBuy(e.target.value); setSell(""); }}
          placeholder=" "
          className="peer w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-xl font-semibold text-green-600 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition-all"
        />
        <label htmlFor="buy" className="absolute left-3 -top-2.5 px-1.5 bg-white text-[13px] font-semibold text-green-600">
          Buy / পেলাম
        </label>
      </motion.div>

      {/* ✅ Details */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.26, duration: 0.3 }}
        className="relative"
      >
        <textarea
          id="details"
          rows="2"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder=" "
          className="peer w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-gray-700 resize-none focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition-all"
        />
        <label htmlFor="details" className="absolute left-3 -top-2.5 px-1.5 bg-white text-[13px] font-semibold text-gray-500">
          Details / বিবরণ
        </label>
      </motion.div>

      {/* ✅ Date & Camera */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.34, duration: 0.3 }}
        className="flex gap-4"
      >
        <CustomCalendar value={date} onChange={setDate} />
        <CameraButton onImageSelect={setImage} />
      </motion.div>

      {/* ✅ Image Preview */}
      <AnimatePresence>
        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative w-24 h-24"
          >
            <img
              src={image}
              alt="preview"
              className="w-full h-full rounded-xl object-cover"
            />
            {/* ✅ Remove image button */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => {
                setImage(null);
                sessionStorage.removeItem(`${formKey}_image`);
              }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow"
            >
              ✕
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Submit */}
      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleSubmit}
        className="w-full bg-green-600 hover:bg-green-700 transition-all text-white h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
      >
        <FaUserPlus size={18} />
        {editTransaction ? "Update" : "Submit"}
      </motion.button>
    </main>
  );
}