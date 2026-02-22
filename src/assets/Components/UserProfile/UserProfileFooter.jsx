import { FiSave } from "react-icons/fi";

export default function SaveFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 pb-8 z-50">
      
      <div className="max-w-md mx-auto">
        <button className="w-full bg-green-500 text-white font-bold py-4 rounded-xl shadow-[0_8px_20px_-4px_rgba(34,197,94,0.4)] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          
          <FiSave size={18} />
          Save Changes
          
        </button>
      </div>

    </footer>
  );
}