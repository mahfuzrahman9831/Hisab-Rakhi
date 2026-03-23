import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion"; // ✅

export default function PageHeader({
  title,
  showBack = true,
  backTo = "/",
  showMenu = false,
  onDelete,
  onEdit,
  onReport,
}) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBack = () => {
    if (backTo && backTo !== "AUTO") {
      navigate(backTo);
      return;
    }
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    // ✅ Header slide down
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="sticky top-0 bg-white border-b shadow-sm border-gray-200 px-4 py-4 flex items-center justify-between z-10 w-full"
    >

      {/* ✅ Back button */}
      {showBack ? (
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
        >
          <MdArrowBackIosNew size={20} />
        </motion.button>
      ) : (
        <div className="w-10" />
      )}

      {/* ✅ Title fade in */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="text-lg font-bold text-center flex-1"
      >
        {title}
      </motion.h1>

      {/* ✅ Right menu */}
      {showMenu ? (
        <div className="relative w-10 flex justify-end" ref={menuRef}>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          >
            <IoEllipsisVertical size={20} />
          </motion.button>

          {/* ✅ Dropdown — scale + fade */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute right-0 top-12 w-30 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden"
                style={{ transformOrigin: "top right" }}
              >
                <motion.button
                  whileTap={{ backgroundColor: "#f9fafb" }}
                  onClick={() => { setMenuOpen(false); onReport?.(); }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                >
                  Report
                </motion.button>

                <motion.button
                  whileTap={{ backgroundColor: "#f9fafb" }}
                  onClick={() => { setMenuOpen(false); onEdit?.(); }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                >
                  Edit
                </motion.button>

                <motion.button
                  whileTap={{ backgroundColor: "#fef2f2" }}
                  onClick={() => { setMenuOpen(false); onDelete?.(); }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Delete
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="w-10" />
      )}
    </motion.header>
  );
}