import { IoChevronBack } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function CustomerHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-4 bg-white">

      {/* Left Side */}
      <div className="flex items-center gap-3">
        <IoChevronBack className="text-gray-600 text-lg cursor-pointer" />

        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Customer Ledger
          </h1>
          <p className="text-xs text-gray-500 font-medium">
            42 active customers
          </p>
        </div>
      </div>

      {/* Right Button */}
      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <HiOutlineDotsVertical className="text-gray-600 text-lg" />
      </button>

    </div>
  );
}