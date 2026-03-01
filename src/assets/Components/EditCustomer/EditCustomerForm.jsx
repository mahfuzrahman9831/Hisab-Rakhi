import { useState } from "react";
import { FiUser, FiPhone, FiMail, FiCamera } from "react-icons/fi";

export default function EditCustomerMain() {
  const [name, setName] = useState("Marcus Thompson");
  const [phone, setPhone] = useState("+1 (555) 0123-456");
  const [email, setEmail] = useState("marcus.t@business.com");

  return (
    <main className="flex-1 max-w-md mx-auto w-full px-5 py-8 bg-white">

      {/* Profile Picture Section */}
      <div className="flex flex-col items-center mb-10">
        <div className="relative group">

          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2L_KQDhgkgkeAz3YCE2ZGRucE6AdxzvWckRDddsY9EfZe3s7t79f25BK9xU_7ccjQNXBeEy0wRE2gWPVR9jGjgm9aLbeB1oOzf8Xboq4bTCqaxWRFDOS_xJr0dLLGJbYEqG2HT4I02KrrLAMHn6fXaYwxkLQoTGCnBka8NqrWwkIginNzKFFfRoFZaeiVavOabOjzH6cQEy6FGuD28njExKGV9iShyk0QWFJm-EsTJRULLe6ErlI37BvWS3C9fljCCwcB5fJCTfoT"
              alt="Customer profile"
              className="w-full h-full object-cover"
            />
          </div>

          <button
            className="absolute bottom-0 right-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center shadow-md border-2 border-white hover:scale-105 transition-transform active:scale-95"
          >
            <FiCamera size={18} />
          </button>
        </div>

        <p className="mt-4 text-sm font-medium text-green-600">
          Change Profile Photo
        </p>
      </div>

      {/* Edit Form */}
      <form className="space-y-6">

        {/* Customer Name */}
        <div className="space-y-2">
          <label
            htmlFor="customer-name"
            className="block text-sm font-semibold text-gray-700 ml-1"
          >
            Customer Name
          </label>

          <div className="relative group">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />

            <input
              id="customer-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 py-4 text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:ring-1 focus:ring-green-600/30 transition-all outline-none"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label
            htmlFor="phone-number"
            className="block text-sm font-semibold text-gray-700 ml-1"
          >
            Phone Number
          </label>

          <div className="relative group">
            <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />

            <input
              id="phone-number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 234 567 890"
              className="w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 py-4 text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:ring-1 focus:ring-green-600/30 transition-all outline-none"
            />
          </div>
        </div>

       

      </form>
    </main>
  );
}