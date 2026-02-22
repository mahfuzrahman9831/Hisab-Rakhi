import { FiArrowLeft } from "react-icons/fi";

export default function ProfileHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      
      <div className="flex items-center p-4 justify-between max-w-md mx-auto w-full relative">

        {/* Back Button */}
        <button className="text-gray-900 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 transition-colors">
          <FiArrowLeft size={20} />
        </button>

        {/* Title (Perfectly Centered) */}
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold tracking-tight text-gray-900">
          Profile Details
        </h1>

      </div>

    </header>
  );
}