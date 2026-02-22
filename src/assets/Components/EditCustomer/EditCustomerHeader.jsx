import { IoChevronBack } from "react-icons/io5";

export default function EditCustomerHeader({ onBack }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-md border-b border-gray-200">

      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-green-600 transition-colors hover:opacity-70"
      >
        <IoChevronBack size={26} />
        <span className="text-base font-medium -ml-1">
          Back
        </span>
      </button>

      {/* Center Title */}
      <h1 className="text-lg font-semibold tracking-tight absolute left-1/2 -translate-x-1/2 text-gray-900">
        Edit Customer
      </h1>

      {/* Spacer for symmetry */}
      <div className="w-10"></div>

    </header>
  );
}