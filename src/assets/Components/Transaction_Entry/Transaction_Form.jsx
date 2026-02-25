import React, { useState } from "react";
import {IoCalendarOutline} from "react-icons/io5";
import { FiChevronDown, FiCamera } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import MobileDatePicker from "../../Components/Common/MobileDatePicker";

export default function Transaction_Form() {

   const [sell, setSell] = useState("");
  const [buy, setBuy] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSubmit = () => {
    const transaction = {
      id: Date.now(),
      sell,
      buy,
      details,
      date,
    };
  };

  return (
    // <main className="flex-1 px-4 py-6 space-y-6">
    //   {/* Sell / দিলাম */}
    //   <div className="space-y-2">
    //     <label className="block text-sm font-bold text-red-600 flex items-center gap-1">
    //       Sell / দিলাম
    //       <IoTrendingUp className="text-xs" />
    //     </label>

    //     <div className="relative flex items-center">
    //       <span className="absolute left-4 text-2xl font-bold text-red-400">
    //         ৳
    //       </span>

    //       <input
    //         type="number"
    //         placeholder="0.00"
    //         className="w-full pl-10 pr-4 py-4 bg-red-50 border-2 border-transparent focus:border-red-300 rounded-2xl text-2xl font-bold text-red-600 placeholder:text-red-300 transition-all focus:outline-none"
    //       />
    //     </div>
    //   </div>

    //   {/* Buy / পেলাম */}
    //   <div className="space-y-2">
    //     <label className="block text-sm font-bold text-green-600 flex items-center gap-1">
    //       Buy / পেলাম
    //       <IoTrendingDown className="text-xs" />
    //     </label>

    //     <div className="relative flex items-center">
    //       <span className="absolute left-4 text-2xl font-bold text-green-400">
    //         ৳
    //       </span>

    //       <input
    //         type="number"
    //         placeholder="0.00"
    //         className="w-full pl-10 pr-4 py-4 bg-green-50 border-2 border-transparent focus:border-green-300 rounded-2xl text-2xl font-bold text-green-600 placeholder:text-green-300 transition-all focus:outline-none"
    //       />
    //     </div>
    //   </div>

    //   {/* Details */}
    //   <div className="space-y-2">
    //     <label className="block text-sm font-bold text-gray-600">
    //       Details / বিবরণ
    //     </label>

    //     <textarea
    //       rows="3"
    //       placeholder="Enter transaction items or notes..."
    //       className="w-full px-4 py-4 bg-gray-100 border-2 border-transparent focus:border-gray-300 rounded-2xl text-gray-800 placeholder:text-gray-400 resize-none transition-all focus:outline-none"
    //     />
    //   </div>

    //   {/* Date & Camera */}
    //   <div className="flex gap-4">
    //     {/* Date Button */}
    //     <button className="flex-1 flex items-center justify-between px-4 py-4 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors">
    //       <div className="flex items-center gap-3">
    //         <IoCalendarOutline className="text-gray-500" />
    //         <span className="text-sm font-medium text-gray-700">
    //           May 24, 2024
    //         </span>
    //       </div>

    //       <FiChevronDown className="text-gray-400 text-sm" />
    //     </button>

    //     {/* Camera Button */}
    //     <button className="flex items-center justify-center aspect-square px-4 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors">
    //       <FiCamera className="text-gray-500" />
    //     </button>
    //   </div>
    // </main>
    // <main className="flex-1 px-5 py-6 space-y-5 bg-white">
    //   {/* ইনপুট ফিল্ড থেকে অ্যারো লুকানোর জন্য CSS */}
    //   <style>
    //     {`
    //   input::-webkit-outer-spin-button,
    //   input::-webkit-inner-spin-button {
    //     -webkit-appearance: none;
    //     margin: 0;
    //   }
    //   input[type=number] {
    //     -moz-appearance: textfield;
    //   }
    // `}
    //   </style>

    //   {/* Sell / দিলাম */}
    //   <div className="space-y-1.5">
    //     <label className="text-[13px] font-semibold text-red-600 ml-1">
    //       Sell / দিলাম
    //     </label>
    //     <input
    //       type="number"
    //       placeholder="0.00"
    //       className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-xl font-semibold text-red-600 placeholder:text-red-200 placeholder:text-[16px] transition-all focus:border-red-500 focus:bg-white focus:ring-1 focus:ring-red-500 focus:outline-none"
    //     />
    //   </div>

    //   {/* Buy / পেলাম */}
    //   <div className="space-y-1.5">
    //     <label className="text-[13px] font-semibold text-green-600 ml-1">
    //       Buy / পেলাম
    //     </label>
    //     <input
    //       type="number"
    //       placeholder="0.00"
    //       className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-xl font-semibold text-green-600 placeholder:text-green-200 placeholder:text-[16px] transition-all focus:border-green-500 focus:bg-white focus:ring-1 focus:ring-green-500 focus:outline-none"
    //     />
    //   </div>

    //   {/* Details / বিবরণ */}
    //   <div className="space-y-1.5">
    //     <label className="text-[13px] font-semibold text-gray-500 ml-1">
    //       Details
    //     </label>
    //     <textarea
    //       rows="2"
    //       placeholder="Transaction details or notes..."
    //       className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 placeholder:text-[14px] resize-none transition-all focus:border-blue-400 focus:bg-white focus:outline-none"
    //     />
    //   </div>

    //   {/* Date & Camera - ইউআই আরেকটু মডার্ন করার জন্য হালকা শ্যাডো ও কালার চেঞ্জ করা হয়েছে */}
    //   <div className="flex gap-3 pt-2">
    //     <button className="flex-1 flex items-center justify-between px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all active:scale-[0.98]">
    //       <div className="flex items-center gap-2.5">
    //         <IoCalendarOutline className="text-gray-400 text-lg" />
    //         <span className="text-sm font-medium text-gray-600">
    //           May 24, 2024
    //         </span>
    //       </div>
    //       <FiChevronDown className="text-gray-400 text-xs" />
    //     </button>

    //     <button className="flex items-center justify-center aspect-square w-[54px] bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-all active:scale-[0.98]">
    //       <FiCamera className="text-gray-500 text-lg" />
    //     </button>
    //   </div>
    // </main>

    <main className="flex-1 px-5 py-6 space-y-6 bg-white">
  {/* ইনপুট ফিল্ড থেকে অ্যারো লুকানোর জন্য CSS */}
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

  {/* Sell / দিলাম */}
  <div className="relative">
    <input
      type="number"
      id="sell"
      placeholder=" "
      className="peer w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-xl font-semibold text-red-600 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none transition-all"
    />
    <label
      htmlFor="sell"
      className="absolute left-3 -top-2.5 px-1.5 bg-white text-[13px] font-semibold text-red-600 transition-all 
      peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4.5 peer-placeholder-shown:left-4 
      peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[13px] peer-focus:font-semibold peer-focus:text-red-600 cursor-text"
    >
      Sell / দিলাম
    </label>
  </div>

  {/* Buy / পেলাম */}
  <div className="relative">
    <input
      type="number"
      id="buy"
      placeholder=" "
      className="peer w-full px-4 py-4 bg-white border border-gray-200 rounded-xl text-xl font-semibold text-green-600 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none transition-all"
    />
    <label
      htmlFor="buy"
      className="absolute left-3 -top-2.5 px-1.5 bg-white text-[13px] font-semibold text-green-600 transition-all 
      peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4.5 peer-placeholder-shown:left-4 
      peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-[13px] peer-focus:font-semibold peer-focus:text-green-600 cursor-text"
    >
      Buy / পেলাম
    </label>
  </div>

  {/* Details / বিবরণ */}
  <div className="relative">
  <textarea
    id="details"
    rows="2"
    placeholder=" "
    className="peer w-full px-4 py-4 bg-white border border-gray-200 rounded-xl 
    text-gray-700 resize-none 
    focus:border-black focus:ring-1 focus:ring-black 
    focus:outline-none transition-all"
  />
  <label
    htmlFor="details"
    className="absolute left-3 -top-2.5 px-1.5 bg-white text-[13px] font-semibold text-gray-500 transition-all 
    peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-400 
    peer-placeholder-shown:top-4.5 peer-placeholder-shown:left-4 
    peer-focus:-top-2.5 peer-focus:left-3 
    peer-focus:text-[13px] peer-focus:font-normal peer-focus:text-black 
    cursor-text"
  >
    Details / বিবরণ
  </label>
</div>
 {/* Date & Camera */}
       <div className="flex gap-4">
        {/* Date Button */}
        <MobileDatePicker value={date} onChange={setDate} />

         {/* Camera Button */}
         <button className="flex items-center justify-center aspect-square px-4 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors">
           <FiCamera className="text-gray-500" />
         </button>
       </div>

        {/* submit button */}
      
               <button className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] transition-all text-white h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-green-600/20">
                 <FaUserPlus size={18} />
                 Submit
               </button>
       
           
</main>
  );
}

