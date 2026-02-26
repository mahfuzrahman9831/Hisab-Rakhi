import React from 'react';

const DetailRow = ({ label, value, colorClass = "text-gray-700", isBold = false }) => (
  <div className="flex justify-between items-center py-1">
    <span className="text-gray-600 font-medium">{label}</span>
    <span className={`${isBold ? 'font-bold' : 'font-semibold'} ${colorClass} font-sans`}>
      {value}
    </span>
  </div>
);

const TransactionSuccessCard = () => {
  return (
    <div className="w-full bg-white rounded-[2.5rem] pt-12 pb-8 px-6 shadow-sm border border-gray-100">
      <h1 className="text-xl font-bold text-center mb-8 text-gray-800">
        লেনদেনটি রেকর্ড করা হয়েছে।
      </h1>

      <div className="bg-[#f8faf9] rounded-2xl p-5 space-y-4 border border-gray-50">
        {/* User Info */}
        <div className="flex items-center space-x-3 border-b border-gray-100 pb-4">
          <div className="w-12 h-12 rounded-full bg-[#005a9e] flex items-center justify-center text-white font-bold text-lg">
            AR
          </div>
          <div>
            <div className="font-bold text-gray-800 leading-tight">abdur razzak vai</div>
            <div className="text-xs text-gray-400 font-sans">+8801672214141</div>
          </div>
        </div>

        {/* Table Details */}
        <div className="space-y-3">
          <DetailRow label="পূর্বের দেবো" value="১১,৯৩১.০০" />
          <DetailRow label="দিলাম" value="১.০০" colorClass="text-rose-500" isBold />
          <DetailRow label="পেলাম" value="০.০০" colorClass="text-[#00a65a]" isBold />
          
          <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-gray-700 font-bold">বর্তমান দেবো</span>
            <span className="font-bold text-[#005a9e] text-xl font-sans">১১,৯৩০.০০</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSuccessCard;