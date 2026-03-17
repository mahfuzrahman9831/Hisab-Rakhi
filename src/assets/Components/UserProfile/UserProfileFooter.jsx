import { FiSave } from "react-icons/fi";

export default function SaveFooter() {
  return (
   <div className="px-4 py-4">
      <button className="w-full bg-green-500 text-white font-bold py-4 rounded-xl shadow-[0_8px_20px_-4px_rgba(34,197,94,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
        <FiSave size={18} />
        Save Changes
      </button>
    </div>
  );
}