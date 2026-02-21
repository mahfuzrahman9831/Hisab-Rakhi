import { IoCalendarOutline } from "react-icons/io5";
import { FaFilePdf } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

export default function ReportActions() {
  return (
    <section className="flex items-center justify-between bg-white p-3 rounded-2xl border border-gray-100 shadow-sm px-4 pt-4">

      {/* Left Side */}
      <div className="flex items-center gap-2">
        <IoCalendarOutline className="text-green-600 text-lg" />
        <span className="text-sm font-semibold text-gray-900">
          Last 30 Days
        </span>
      </div>

      {/* Right Buttons */}
      <div className="flex gap-2">

        {/* PDF Button */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-600 text-xs font-bold rounded-lg border border-green-200 hover:bg-green-200 transition">
          <FaFilePdf size={14} />
          PDF
        </button>

        {/* Excel Button */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-200 transition">
          <FiDownload size={14} />
          Excel
        </button>

      </div>
    </section>
  );
}