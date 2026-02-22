import { IoChevronBack } from "react-icons/io5";

export default function AddCustomerHeader({ onBack }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100">

      {/* Back Button */}
      <button
        aria-label="Go back"
        onClick={onBack}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors text-gray-900"
      >
        <IoChevronBack size={18} />
      </button>

      {/* Title */}
      <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10 text-gray-900">
        Add New Customer
      </h1>

    </header>
  );
}