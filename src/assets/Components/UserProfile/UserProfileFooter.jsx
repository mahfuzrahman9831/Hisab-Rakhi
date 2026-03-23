import { FiSave } from "react-icons/fi";
import { motion } from "framer-motion"; 

export default function SaveFooter({ onSave }) {
  return (
    <div className="px-4 py-4">
      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.01 }}
        onClick={onSave}
        className="w-full bg-green-500 text-white font-bold py-4 rounded-xl shadow-[0_8px_20px_-4px_rgba(34,197,94,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        <motion.div
          initial={{ rotate: 0 }}
          whileTap={{ rotate: -15 }}
          transition={{ duration: 0.2 }}
        >
          <FiSave size={18} />
        </motion.div>
        Save Changes
      </motion.button>
    </div>
  );
}