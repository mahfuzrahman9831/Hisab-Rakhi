import { useRef } from "react";
import { FiCamera } from "react-icons/fi";

export default function CameraButton({ onImageSelect }) {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

const handleChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;

    img.onload = () => {

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const MAX_WIDTH = 400;
      const scale = MAX_WIDTH / img.width;

      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const compressed = canvas.toDataURL("image/jpeg", 0.6);

      onImageSelect(compressed);
    };
  };

  reader.readAsDataURL(file);
};

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center justify-center aspect-square px-4 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors active:scale-95"
      >
        <FiCamera className="text-gray-500 text-lg" />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleChange}
        className="hidden"
      />
    </>
  );
}