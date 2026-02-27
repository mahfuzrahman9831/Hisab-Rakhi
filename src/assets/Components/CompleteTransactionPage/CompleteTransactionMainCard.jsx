import React from "react";
import { useLocation } from "react-router-dom";
import { useCustomers } from "../../../Context/CustomerContext";

const DetailRow = ({
  label,
  value,
  colorClass = "text-gray-700",
  isBold = false,
}) => (
  <div className="flex justify-between items-center py-1">
    <span className="text-gray-600 font-medium">{label}</span>
    <span
      className={`${isBold ? "font-bold" : "font-semibold"} ${colorClass} font-sans`}
    >
      {value}
    </span>
  </div>
);

const TransactionSuccessCard = () => {
  const location = useLocation();
  const { customers } = useCustomers();

  const {
    customerId,
    sell = 0,
    buy = 0,
    previousBalance = 0,
    currentBalance = 0,
  } = location.state || {};

  const customer = customers.find((c) => c.id === Number(customerId));

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div className="w-full bg-white rounded-[2.5rem] pt-12 pb-8 px-6 shadow-sm border border-gray-100">
      <h1 className="text-xl font-bold text-center mb-8 text-gray-800">
        Transaction recorded.
      </h1>

      <div className="bg-[#f8faf9] rounded-2xl p-5 space-y-4 border border-gray-50">
        {/* User Info */}
        <div className="flex items-center space-x-3 border-b border-gray-100 pb-4">
          <div className="w-12 h-12 rounded-full bg-[#005a9e] flex items-center justify-center text-white font-bold text-lg">
            {getInitials(customer?.name)}
          </div>
          <div>
            <div className="font-bold text-gray-800 leading-tight">
              {customer?.name}
            </div>
            <div className="text-xs text-gray-400 font-sans">
              {customer?.phone}
            </div>
          </div>
        </div>

        {/* Table Details */}
        <div className="space-y-3">
          <DetailRow
            label="Previous Balance"
            value={Math.abs(previousBalance).toLocaleString("en-BD", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          />

          {/* ✅ Show Sell only if entered */}
          {sell > 0 && (
            <DetailRow
              label="Sell / দিলাম"
              value={sell.toLocaleString("en-BD")}
              colorClass="text-rose-500"
              isBold
            />
          )}

          {/* ✅ Show Buy only if entered */}
          {buy > 0 && (
            <DetailRow
              label="Buy / পেলাম"
              value={buy.toLocaleString("en-BD")}
              colorClass="text-[#00a65a]"
              isBold
            />
          )}

          <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
            <span className="text-gray-700 font-bold">Current Balance</span>

            <div className="flex flex-col items-end leading-tight">
              <span
                className={`font-bold text-xl font-sans ${
                  currentBalance > 0
                    ? "text-red-600"
                    : currentBalance < 0
                      ? "text-green-600"
                      : "text-gray-400"
                }`}
              >
                ৳{Math.abs(currentBalance).toLocaleString("en-BD")}
              </span>

              <span
                className={`text-[12px] font-semibold ${
                  currentBalance > 0
                    ? "text-red-500"
                    : currentBalance < 0
                      ? "text-green-500"
                      : "text-gray-400"
                }`}
              >
                {currentBalance > 0
                  ? "You'll Get"
                  : currentBalance < 0
                    ? "You'll Give"
                    : "Settled"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSuccessCard;
