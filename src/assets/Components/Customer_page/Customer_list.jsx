import React, { useState } from "react";
import { useCustomers } from "../../../Context/CustomerContext";
import { MdChevronRight } from "react-icons/md";
import { IoStar } from "react-icons/io5"; // ✅ Star icon
import { useNavigate } from "react-router-dom";
import Search_Sort from "./Search_Sort";
import { getCustomerBalance } from "../../../utils/ledger";
import FavoriteConfirmModal from "../Common/FavoriteConfirmModal";
import { motion, AnimatePresence } from "framer-motion";
import { listVariants, listItemVariants } from "../../../utils/animations";

function timeAgo(date) {
  if (!date) return "Just now";
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];
  for (let i = 0; i < intervals.length; i++) {
    const interval = Math.floor(seconds / intervals[i].seconds);
    if (interval > 1) return interval + " " + intervals[i].label + "s ago";
    if (interval === 1) return interval + " " + intervals[i].label + " ago";
  }
  return "Just now";
}

export default function Customer_list() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalMode, setModalMode] = useState("add"); // ✅ "add" or "remove"

  function getInitials(name) {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  const [searchTerm, setSearchTerm] = useState("");
  const { customers, transactions, toggleFavoriteCustomer } = useCustomers();
  const navigate = useNavigate();
  const [dueOnly, setDueOnly] = useState(false);
  const [sortType, setSortType] = useState(null);
  const [pressTimer, setPressTimer] = useState(null);

  let processedCustomers = customers.map((customer) => ({
    ...customer,
    balance: getCustomerBalance(transactions, customer.id),
  }));

  if (searchTerm.trim() !== "") {
    processedCustomers = processedCustomers.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
    );
  }

  processedCustomers.sort((a, b) => {
    const dateA = new Date(a.updatedAt || a.createdAt || 0);
    const dateB = new Date(b.updatedAt || b.createdAt || 0);
    return dateB - dateA;
  });

  if (dueOnly) processedCustomers = processedCustomers.filter((c) => c.balance > 0);
  if (sortType === "high") processedCustomers.sort((a, b) => b.balance - a.balance);
  if (sortType === "low") processedCustomers.sort((a, b) => a.balance - b.balance);

  // ✅ Long press — favorite হলে remove mode, না হলে add mode
  const handlePressStart = (customer) => {
    const timer = setTimeout(() => {
      setSelectedCustomer(customer);
      setModalMode(customer.favorite ? "remove" : "add"); // ✅
    }, 600);
    setPressTimer(timer);
  };

  const handlePressEnd = () => clearTimeout(pressTimer);

  const handleConfirmFavorite = () => {
    toggleFavoriteCustomer(selectedCustomer.id);
    setSelectedCustomer(null);
  };

  const handleCancelFavorite = () => setSelectedCustomer(null);

return (
  <>
    <FavoriteConfirmModal
      customer={selectedCustomer}
      mode={modalMode}
      onConfirm={handleConfirmFavorite}
      onCancel={handleCancelFavorite}
    />

    <Search_Sort
      dueOnly={dueOnly}
      setDueOnly={setDueOnly}
      sortType={sortType}
      setSortType={setSortType}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      displayedCustomers={processedCustomers}
    />

    {/* ✅ Animated list wrapper */}
    <motion.div
      variants={listVariants}
      initial="initial"
      animate="animate"
      className="bg-white rounded-xl overflow-hidden shadow-sm"
    >
      {processedCustomers.length === 0 && (
        <motion.p
          variants={listItemVariants}
          className="text-center text-gray-400 py-10 text-sm"
        >
          কোনো কাস্টমার পাওয়া যায়নি
        </motion.p>
      )}

      <AnimatePresence>
        {processedCustomers.map((customer) => (
          <motion.div
            key={customer.id}
            variants={listItemVariants}
            layout
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/customer/${customer.id}`)}
            onMouseDown={() => handlePressStart(customer)}
            onMouseUp={handlePressEnd}
            onTouchStart={() => handlePressStart(customer)}
            onTouchEnd={handlePressEnd}
            className="flex items-center justify-between px-4 py-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 cursor-pointer"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                {customer.profileImage ? (
                  <img src={customer.profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-green-700 font-semibold text-sm">{getInitials(customer.name)}</span>
                )}
              </div>

              <div className="flex flex-col items-start justify-center">
                <div className="flex items-center gap-1">
                  <span className="text-[15px] font-medium text-gray-800 leading-tight">
                    {customer.name}
                  </span>
                  {customer.favorite && (
                    <IoStar className="text-green-500 text-xs" />
                  )}
                </div>
                <span className="text-[11px] text-gray-400 mt-0.5 tracking-wide">
                  {timeAgo(customer.updatedAt || customer.createdAt)}
                </span>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
              <span className={`text-[15px] font-semibold ${
                customer.balance > 0 ? "text-red-600"
                : customer.balance < 0 ? "text-green-600"
                : "text-gray-400"
              }`}>
                {Math.abs(customer.balance).toLocaleString("en-BD", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <MdChevronRight className="text-gray-400 text-xl" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  </>
);
}