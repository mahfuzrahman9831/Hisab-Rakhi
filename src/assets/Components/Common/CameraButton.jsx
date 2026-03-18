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

        // ✅ আরো ছোট করো — max 600px
        const MAX = 600;
        let w = img.width;
        let h = img.height;

        if (w > h) {
          if (w > MAX) { h = (h * MAX) / w; w = MAX; }
        } else {
          if (h > MAX) { w = (w * MAX) / h; h = MAX; }
        }

        canvas.width = Math.round(w);
        canvas.height = Math.round(h);

        // ✅ সাদা background দাও — transparent PNG এর জন্য
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // ✅ quality 0.5 = 50% — আরো ছোট
        const compressed = canvas.toDataURL("image/jpeg", 0.5);

        // ✅ size check — console এ দেখবে কত KB হলো
        const kb = Math.round((compressed.length * 3) / 4 / 1024);
        console.log(`📷 Compressed image: ~${kb} KB`);

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