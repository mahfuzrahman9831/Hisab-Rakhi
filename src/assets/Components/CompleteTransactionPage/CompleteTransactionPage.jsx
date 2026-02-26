import React from "react";
import ShareButton from "./ShareButton";
import TransactionSuccessCard from "./CompleteTransactionMainCard";
import PageHeader from "../Common/Header";

const TransactionSuccess = () => {
  return (
    <div className="max-w-[380px] mx-auto w-full pb-24">
      <PageHeader title="Transaction Complete" backTo="AUTO"> </PageHeader>
      <div className="bg-[#f4f7f6] text-gray-800 min-h-screen flex flex-col items-center justify-start font-['Hind_Siliguri',_sans-serif]">
        <div className="w-full h-8 bg-transparent"></div>

        <div className="relative w-full max-w-md px-4 flex flex-col items-center">
          {/* Close Button */}
          <div className="w-full flex justify-end pt-2 pr-2 mb-4">
            <button className="bg-gray-200 p-1.5 rounded-full hover:bg-gray-300 transition-colors">
              <span className="material-icons text-gray-500 text-xl leading-none">
                close
              </span>
            </button>
          </div>

          {/* Success Check Icon */}
          <div className="z-10 -mb-8">
            <div className="bg-[#00a65a] w-16 h-16 rounded-full flex items-center justify-center border-4 border-[#f4f7f6] shadow-lg">
              <span className="material-icons text-white text-4xl">check</span>
            </div>
          </div>

          {/* Main Card Component */}
          <TransactionSuccessCard />

          {/* Share Section Component */}
          <ShareButton />

          {/* Bottom Indicator (Mobile Home Bar style) */}
          <div className="w-32 h-1.5 bg-gray-300 rounded-full mb-6 mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSuccess;
