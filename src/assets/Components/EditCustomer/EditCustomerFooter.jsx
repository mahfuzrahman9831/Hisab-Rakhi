import { IoCheckmarkCircle } from "react-icons/io5";

export default function UpdateCustomerFooter({ onUpdate }) {
  return (
    <footer className="p-6 bg-white border-t border-gray-200 justify-end">

      <div className="max-w-md mx-auto">

        {/* Update Button */}
        <button
          onClick={onUpdate}
          className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg shadow-green-600/20 hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <IoCheckmarkCircle size={20} />
          Update Details
        </button>

       

      </div>

    </footer>
  );
}