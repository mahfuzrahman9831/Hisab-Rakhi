import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { IoEllipsisVertical } from "react-icons/io5";

export default function PageHeader({
  title,
  showBack = true,
  backTo = "/",
  showMenu = false,   // 🔥 এটা অবশ্যই থাকতে হবে
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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBack = () => {
   
    if (backTo && backTo !== "AUTO") {
      navigate(backTo);
      return;
    }

    // Professional safe back logic
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <header className="sticky top-0 bg-white border-b shadow-sm border-gray-200 px-4 py-4 flex items-center justify-between z-10 w-full">

      {/* LEFT SIDE */}
      {showBack ? (
        <button
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition"
        >
          <MdArrowBackIosNew size={20} />
        </button>
      ) : (
        <div className="w-10" />
      )}

      {/* TITLE */}
      <h1 className="text-lg font-bold text-center flex-1">
        {title}
      </h1>

      {/* RIGHT SIDE */}
      {showMenu ? (
        <div className="relative w-10 flex justify-end" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition"
          >
            <IoEllipsisVertical size={20} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-12 w-30 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden animate-fadeIn">

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onReport?.();
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
              >
                Report
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEdit?.();
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
              >
                Edit
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onDelete?.();
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Delete
              </button>

            </div>
          )}
        </div>
      ) : (
        <div className="w-10" />
      )}

    </header>
  );
}