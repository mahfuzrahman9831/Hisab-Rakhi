import { FiChevronLeft } from "react-icons/fi";

export default function SettingsHeader() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 bg-white/80 backdrop-blur-md border-b border-gray-200">

      {/* Back Button */}
      <button className="flex items-center gap-1 text-green-600 hover:opacity-80 transition-opacity">
        <FiChevronLeft size={20} />
        <span className="text-base font-medium">
          Dashboard
        </span>
      </button>

      {/* Title */}
      <h1 className="text-lg font-bold tracking-tight text-gray-900">
        Settings
      </h1>

      {/* Spacer for center alignment */}
      <div className="w-16"></div>

    </header>
  );
}