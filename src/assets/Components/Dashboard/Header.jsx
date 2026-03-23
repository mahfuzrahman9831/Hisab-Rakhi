import { useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useAuth } from "../../../Context/AuthContext";
import { useBusiness } from "../../../Context/BusinessContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ✅

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
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const shopName = activeBusiness?.name || shopInfo?.shopName || "আমার দোকান";

  return (
    // ✅ Header slide down
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-4 pt-6 pb-4 flex items-center justify-between border-b border-gray-100"
    >
      {/* ✅ Left Side — slide from left */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        className="flex items-center gap-3 flex-1 min-w-0"
      >
        {/* ✅ Avatar — bounce in */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
          className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border border-blue-200 shrink-0"
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAX2H_fay-rzVNicx0KewIPIL6ccnFvjJJpzUdHbkItYGlBoxCMvnXCCrnQt4v37zpjlt6QlXzZx_7--3Pu9RIb6FsYVvxRwZTpU8QLwc6fnccgz84Di9ZqsTYcvfOaxoIiI2YJWkd5wlX1I1U4hzlB1pXhWUluP9Z4JDZBIYLVpqYZpp0yluJ7TDAYvt7-yneYMqAiqgJLV86sAK1bBrjXn2lwJ9iOUCopwUiw9v0dvk5HOIUzVyzvW-aSR3Uescy3y3LU6O4DXUpm"
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Shop name + greeting */}
        <div className="flex flex-col items-start min-w-0">
          <motion.h1
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            onClick={() => setExpanded(!expanded)}
            className={`text-lg font-bold leading-tight text-slate-900 cursor-pointer w-full ${
              expanded ? "whitespace-normal" : "truncate"
            }`}
          >
            {shopName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28, duration: 0.3 }}
            className="text-xs text-gray-500"
          >
            {getGreeting()}, {user?.name}
          </motion.p>
        </div>
      </motion.div>

      {/* ✅ Right Side — slide from right */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        className="flex gap-2 shrink-0"
      >
        {/* ✅ Bell button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => navigate("/notifications")}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <IoNotificationsOutline size={20} className="text-gray-600" />
        </motion.button>

        {/* ✅ Menu button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1 }}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <HiOutlineDotsVertical size={20} className="text-gray-600" />
        </motion.button>
      </motion.div>
    </motion.header>
  );
}