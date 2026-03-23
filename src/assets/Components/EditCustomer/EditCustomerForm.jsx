import { useRef } from "react";
import { FiUser, FiPhone, FiCamera } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion"; 

export default function EditCustomerMain({ formData, setFormData }) {
  const fileInputRef = useRef();

  return (
    <main className="flex-1 max-w-md mx-auto w-full px-5 py-8 bg-white">

      {/* ✅ Profile Picture — bounce in */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.15 }}
        className="flex justify-center mb-10"
      >
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200">
            <AnimatePresence mode="wait">
              {formData.profileImage ? (
                <motion.img
                  key="image"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  src={formData.profileImage}
                  alt="Customer profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <FiUser size={40} className="text-gray-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ✅ Camera button */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.1 }}
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="absolute bottom-0 right-0 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center shadow-md border-2 border-white cursor-pointer"
          >
            <FiCamera size={18} />
          </motion.button>
        </div>
      </motion.div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onloadend = () => setFormData((prev) => ({ ...prev, profileImage: reader.result }));
          reader.readAsDataURL(file);
        }}
        className="hidden"
      />

      {/* ✅ Form fields — stagger */}
      <form className="space-y-6">

        {/* Customer Name */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="space-y-2"
        >
          <label htmlFor="customer-name" className="block text-sm font-semibold text-gray-700 ml-1">
            Customer Name
          </label>
          <div className="relative group">
            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />
            <input
              id="customer-name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="e.g. John Doe"
              className="w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 py-4 text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:ring-1 focus:ring-green-600/30 transition-all outline-none"
            />
          </div>
        </motion.div>

        {/* Phone Number */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.28, duration: 0.3 }}
          className="space-y-2"
        >
          <label htmlFor="phone-number" className="block text-sm font-semibold text-gray-700 ml-1">
            Phone Number
          </label>
          <div className="relative group">
            <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" />
            <input
              id="phone-number"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              placeholder="+1 234 567 890"
              className="w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 py-4 text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:ring-1 focus:ring-green-600/30 transition-all outline-none"
            />
          </div>
        </motion.div>

        {/* Address */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.36, duration: 0.3 }}
          className="space-y-2"
        >
          <label className="block text-sm font-semibold text-gray-700 ml-1">Address</label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:ring-1 focus:ring-green-600/30 transition-all outline-none"
          />
        </motion.div>
      </form>
    </main>
  );
}