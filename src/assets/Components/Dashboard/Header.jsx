import { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useAuth } from "../../../Context/AuthContext";
import { useBusiness } from "../../../Context/BusinessContext";

// ✅ Dynamic greeting
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 21) return "Good Evening";
  return "Good Night";
};

export default function Header() {
  const { shopInfo, user } = useAuth();
  const { activeBusiness } = useBusiness();
  const [expanded, setExpanded] = useState(false); // ✅ expand state

  const shopName = activeBusiness?.name || shopInfo?.shopName || "আমার দোকান";

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-4 pt-6 pb-4 flex items-center justify-between border-b border-gray-100">
      {/* Left Side */}
      <div className="flex items-center gap-3 flex-1 min-w-0"> {/* ✅ min-w-0 truncate এর জন্য */}
        {/* Profile Image */}
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border border-blue-200 shrink-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX2H_fay-rzVNicx0KewIPIL6ccnFvjJJpzUdHbkItYGlBoxCMvnXCCrnQt4v37zpjlt6QlXzZx_7--3Pu9RIb6FsYVvxRwZTpU8QLwc6fnccgz84Di9ZqsTYcvfOaxoIiI2YJWkd5wlX1I1U4hzlB1pXhWUluP9Z4JDZBIYLVpqYZpp0yluJ7TDAYvt7-yneYMqAiqgJLV86sAK1bBrjXn2lwJ9iOUCopwUiw9v0dvk5HOIUzVyzvW-aSR3Uescy3y3LU6O4DXUpm"
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Store Info */}
        <div className="flex flex-col items-start min-w-0"> {/* ✅ items-start + min-w-0 */}
          <h1
            onClick={() => setExpanded(!expanded)} // ✅ tap to expand
            className={`text-lg font-bold leading-tight text-slate-900 cursor-pointer w-full ${
              expanded ? "whitespace-normal" : "truncate" // ✅ truncate / expand
            }`}
          >
            {shopName}
          </h1>
          <p className="text-xs text-gray-500">
            {getGreeting()}, {user?.name} {/* ✅ dynamic */}
          </p>
        </div>
      </div>

      {/* Right Side Buttons */}
      <div className="flex gap-2 shrink-0">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <IoNotificationsOutline size={20} className="text-gray-600" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <HiOutlineDotsVertical size={20} className="text-gray-600" />
        </button>
      </div>
    </header>
  );
}