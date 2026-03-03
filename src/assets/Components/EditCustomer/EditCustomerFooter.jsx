import { IoCheckmarkCircle } from "react-icons/io5";

export default function UpdateCustomerFooter({ onSave, disabled }) {
  return (
    <footer className="p-6 bg-white border-t border-gray-200 justify-end">
      <div className="max-w-md mx-auto">
        {/* Update Button */}
        <button
          onClick={onSave}
          disabled={disabled}
          className={`w-full h-14 rounded-xl font-bold text-lg transition-all
    ${
      disabled
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-green-600 text-white hover:bg-green-700 active:scale-[0.98]"
    }`}
        >
          Update Details
        </button>
      </div>
    </footer>
  );
}
