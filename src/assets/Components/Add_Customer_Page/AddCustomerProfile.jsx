import { FiUser, FiCamera, FiUserPlus } from "react-icons/fi";

export default function ProfileAndImportSection() {
  return (
    <div className="flex flex-col items-center justify-center pt-4 pb-2 space-y-6 bg-white">

      {/* Profile Photo Section */}
      <div className="flex flex-col items-center">

        <div className="relative group">

          {/* Avatar */}
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-sm overflow-hidden">
            <FiUser className="text-gray-400 text-5xl" />
          </div>

          {/* Camera Button */}
          <button
            className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full shadow-lg border-2 border-white flex items-center justify-center active:scale-90 transition-transform"
          >
            <FiCamera size={18} />
          </button>

        </div>

        <p className="text-xs font-medium text-gray-500 mt-3">
          Add profile photo (Optional)
        </p>
      </div>

      {/* Import From Contacts Button */}
      <div className="w-full px-2">
        <button
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border-2 border-gray-200 bg-transparent text-gray-700 font-semibold hover:bg-gray-50 transition-all active:scale-[0.98]"
        >
          <FiUserPlus size={18} />
          Import from Contacts
        </button>
      </div>

    </div>
  );
}