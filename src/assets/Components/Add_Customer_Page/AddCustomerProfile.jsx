import { FiUser, FiCamera, FiUserPlus, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfileAndImportSection({ profileImage, setProfileImage }) {

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => setProfileImage(null);

  return (
    <div className="flex flex-col items-center justify-center pt-4 pb-2 space-y-6 bg-white">

      {/* ✅ Profile Photo — bounce in */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="flex flex-col items-center"
      >
        <div className="relative group">

          {/* Avatar */}
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow-sm overflow-hidden">
            <AnimatePresence mode="wait">
              {profileImage ? (
                <motion.img
                  key="image"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <motion.div
                  key="icon"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <FiUser className="text-gray-400 text-5xl" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <input type="file" accept="image/*" onChange={handleImageChange} id="profileUpload" className="hidden" />

          {/* ✅ Camera button */}
          <motion.label
            htmlFor="profileUpload"
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.1 }}
            className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full shadow-lg border-2 border-white flex items-center justify-center cursor-pointer"
          >
            <FiCamera size={18} />
          </motion.label>

          {/* ✅ Remove button */}
          <AnimatePresence>
            {profileImage && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                whileTap={{ scale: 0.85 }}
                onClick={handleRemoveImage}
                className="absolute top-0 right-0 bg-red-500 text-white p-1.5 rounded-full border-2 border-white shadow-md"
              >
                <FiX size={14} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.3 }}
          className="text-xs font-medium text-gray-500 mt-3"
        >
          Add profile photo (Optional)
        </motion.p>
      </motion.div>

      {/* ✅ Import button — slide up */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.35 }}
        className="w-full px-2"
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border-2 border-gray-200 bg-transparent text-gray-700 font-semibold hover:bg-gray-50 transition-all"
        >
          <FiUserPlus size={18} />
          Import from Contacts
        </motion.button>
      </motion.div>
    </div>
  );
}