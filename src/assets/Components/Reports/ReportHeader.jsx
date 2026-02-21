import { IoChevronBack } from "react-icons/io5";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BsTable } from "react-icons/bs";

export default function ReportsHeader() {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-4 pt-6 pb-4 flex items-center justify-between border-b border-gray-100">

      {/* Left Side */}
      <div className="flex items-center gap-3">
        <button className="p-1 -ml-1">
          <IoChevronBack className="text-gray-600 text-lg" />
        </button>

        <div>
          <h1 className="text-lg font-bold leading-tight text-gray-900">
            Financial Reports
          </h1>
          <p className="text-xs text-gray-500">
            Analysis for June 2024
          </p>
        </div>
      </div>

      {/* Right Buttons */}
      <div className="flex gap-2">
        
        <button className="p-2 rounded-xl bg-white border border-gray-100 shadow-sm transition-transform active:scale-95 hover:bg-gray-50">
          <HiOutlineDocumentText className="text-gray-600 text-lg" />
        </button>

        <button className="p-2 rounded-xl bg-white border border-gray-100 shadow-sm transition-transform active:scale-95 hover:bg-gray-50">
          <BsTable className="text-gray-600 text-lg" />
        </button>

      </div>
    </header>
  );
}