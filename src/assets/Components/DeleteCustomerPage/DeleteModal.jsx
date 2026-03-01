import { FiAlertTriangle } from "react-icons/fi";

export default function DeleteCustomerModal({
  open,
  onClose,
  onConfirm,
  customerName = "Customer",
}) {
  if (!open) return null;

  return (
    // fixed এবং z-50 নিশ্চিত করে যে এটি সবকিছুর উপরে থাকবে
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* ব্যাকগ্রাউন্ড ওভারলে - ফটোর মতো গ্রে ইফেক্ট */}
      <div 
        className="fixed inset-0 bg-gray-500/75 transition-opacity" 
        onClick={onClose} 
      />

      {/* মোডাল কন্টেইনার */}
      <div className="relative w-full max-w-[320px] bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Content */}
        <div className="p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 mb-4 border border-red-100">
            <FiAlertTriangle className="text-red-500 text-3xl" />
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Delete Customer?
          </h2>

          <p className="text-[14px] text-gray-500 leading-relaxed px-2">
            Are you sure you want to delete{" "}
            <span className="font-bold text-gray-800">
              {customerName}
            </span>
            ? This action cannot be undone.
          </p>
        </div>

        {/* Actions - ফটোর মতো ডিজাইন */}
        <div className="flex flex-col border-t border-gray-100">
          <button
            onClick={onConfirm}
            className="w-full py-4 text-[16px] font-bold text-red-600 hover:bg-red-50 active:bg-red-100 transition-colors border-b border-gray-100"
          >
            Delete Customer
          </button>

          <button
            onClick={onClose}
            className="w-full py-4 text-[16px] font-semibold text-gray-500 hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}