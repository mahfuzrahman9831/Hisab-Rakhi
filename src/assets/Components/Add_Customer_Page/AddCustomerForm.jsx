import { FiUser, FiPhone, FiMapPin } from "react-icons/fi";

export default function AddCustomerForm() {
  return (
    <section className="space-y-6 px-4 py-6 bg-white">

      {/* Full Name */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="full-name"
          className="text-sm font-semibold text-gray-700 ml-1"
        >
          Full Name
        </label>

        <div className="relative group">
          <input
            id="full-name"
            type="text"
            placeholder="Enter customer name..."
            className="w-full h-14 px-4 pr-12 rounded-xl border border-gray-200 bg-white text-gray-900 text-base transition-all outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
          />

          <FiUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />
        </div>
      </div>

      {/* Phone Number */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="phone-number"
          className="text-sm font-semibold text-gray-700 ml-1"
        >
          Phone Number
        </label>

        <div className="relative group">
          <input
            id="phone-number"
            type="tel"
            placeholder="e.g. +8801..."
            className="w-full h-14 px-4 pr-12 rounded-xl border border-gray-200 bg-white text-gray-900 text-base transition-all outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
          />

          <FiPhone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />
        </div>
      </div>

      {/* Address */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="address"
          className="text-sm font-semibold text-gray-700 ml-1"
        >
          Business/Home Address
        </label>

        <div className="relative group">
          <textarea
            id="address"
            placeholder="Street, City, Zip..."
            className="w-full min-h-[140px] p-4 pr-12 rounded-xl border border-gray-200 bg-white text-gray-900 text-base resize-none transition-all outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
          />

          <FiMapPin className="absolute right-4 top-4 text-gray-400 group-focus-within:text-green-600 transition-colors" />
        </div>
      </div>

    </section>
  );
}