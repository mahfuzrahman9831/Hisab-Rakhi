import React from "react";
import ShareButton from "./ShareButton";
import TransactionSuccessCard from "./CompleteTransactionMainCard";
import PageHeader from "../Common/Header";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const TransactionSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[380px] mx-auto h-screen overflow-hidden bg-[#f4f7f6] text-gray-800 font-['Hind_Siliguri',_sans-serif] flex flex-col">
      <PageHeader title="Transaction Complete" backTo="AUTO" />

      <div className="flex-1 flex flex-col items-center px-4 relative">
        {/* Close Button */}
        <div className="w-full flex justify-end pt-4">
          <button
            onClick={() => navigate("/customer")}
            className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 active:scale-90 transition-all duration-200"
          >
            <IoClose className="text-gray-500 text-2xl" />
          </button>
        </div>

        {/* Success Check */}
        <div className="z-10 -mb-8 mt-4">
          <div className="success-circle">
            <svg className="success-check" viewBox="0 0 52 52">
              <circle
                className="success-circle-bg"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="success-check-path"
                fill="none"
                d="M14 27l7 7 16-16"
              />
            </svg>
          </div>
        </div>

        {/* Main Card */}
        <TransactionSuccessCard />

        {/* Share Section */}
        <ShareButton />

        {/* Bottom Home Bar */}
        <div className="absolute bottom-4 w-32 h-1.5 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default TransactionSuccess;
