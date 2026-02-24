import { useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";

export default function PageHeader({
  title,
  showBack = true,
  backTo = "/",
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    console.log("clicked");
    navigate("/");
  };

  return (
    <header className="sticky top-0 bg-white border-b shadow-sm border-gray-200 px-4 py-4 flex items-center justify-between z-10 w-full">

      {showBack && (
        <button
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
        >
           <MdArrowBackIosNew size={20} />
        </button>
      )}

      <h1 className="text-lg font-bold">{title}</h1>

      <div className="w-10"></div>
    </header>
  );
}