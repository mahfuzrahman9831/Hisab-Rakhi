import { FiAlertTriangle } from "react-icons/fi";

export default function DeleteCustomerModal({
  open,
  onClose,
  onConfirm,
  customerName = "Marcus Thompson",
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 backdrop-blur-[2px]">

      {/* Dialog */}
      <div className="w-full max-w-xs animate-in fade-in zoom-in duration-200 bg-white rounded-xl shadow-2xl overflow-hidden">

        {/* Content */}
        <div className="p-6 text-center">

          {/* Warning Icon */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 mb-4">
            <FiAlertTriangle className="text-red-600 text-3xl" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Delete Customer?
          </h2>

          {/* Message */}
          <p className="text-sm text-gray-600 leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-900">
              {customerName}
            </span>
            ? This action cannot be undone and all transaction history will be
            permanently removed.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col border-t border-gray-100">

          {/* Delete Button */}
          <button
            onClick={onConfirm}
            className="w-full py-4 px-4 text-base font-bold text-red-600 hover:bg-red-50 active:bg-red-100 border-b border-gray-100 transition-colors"
          >
            Delete Customer
          </button>

          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="w-full py-4 px-4 text-base font-medium text-gray-500 hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}