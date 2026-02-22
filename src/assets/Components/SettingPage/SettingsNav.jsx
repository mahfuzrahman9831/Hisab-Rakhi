import {
  FiHome,
  FiBookOpen,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";

export default function BottomNav({ active = "settings" }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-md bg-white/90 backdrop-blur-lg border-t border-gray-200">

      <div className="flex h-20 items-center justify-around px-2 pb-4 pt-2">

        {/* Dashboard */}
        <a
          href="#"
          className={`flex flex-1 flex-col items-center gap-1 ${
            active === "dashboard"
              ? "text-green-600 font-semibold"
              : "text-gray-400"
          }`}
        >
          <FiHome size={24} />
          <span className="text-[10px] font-medium">
            Dashboard
          </span>
        </a>

        {/* Ledger */}
        <a
          href="#"
          className={`flex flex-1 flex-col items-center gap-1 ${
            active === "ledger"
              ? "text-green-600 font-semibold"
              : "text-gray-400"
          }`}
        >
          <FiBookOpen size={24} />
          <span className="text-[10px] font-medium">
            Ledger
          </span>
        </a>

        {/* Reports */}
        <a
          href="#"
          className={`flex flex-1 flex-col items-center gap-1 ${
            active === "reports"
              ? "text-green-600 font-semibold"
              : "text-gray-400"
          }`}
        >
          <FiBarChart2 size={24} />
          <span className="text-[10px] font-medium">
            Reports
          </span>
        </a>

        {/* Settings */}
        <a
          href="#"
          className={`flex flex-1 flex-col items-center gap-1 ${
            active === "settings"
              ? "text-green-600 font-semibold"
              : "text-gray-400"
          }`}
        >
          <FiSettings size={24} />
          <span className="text-[10px] font-medium">
            Settings
          </span>
        </a>

      </div>
    </nav>
  );
}