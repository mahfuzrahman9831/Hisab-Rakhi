import React from 'react';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { MdSms } from 'react-icons/md';
import { SiMessenger } from 'react-icons/si';
import { motion } from "framer-motion";

function formatBanglaDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("bn-BD", {
    year: "numeric", month: "long", day: "numeric",
  }) + " , " + date.toLocaleTimeString("bn-BD", {
    hour: "2-digit", minute: "2-digit",
  });
}

export default function ShareButton({ sell, buy, previousBalance, currentBalance }) {

  const buildText = () => {
    const now = new Date();
    const date = now.toLocaleDateString("bn-BD", { year: "numeric", month: "long", day: "numeric" });
    const time = now.toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" });
    const lines = [];
    lines.push("লেনদেন রেকর্ড");
    lines.push(`${date} , ${time}`);
    lines.push("");
    lines.push(`পূর্বের বাকি ${Math.abs(previousBalance).toLocaleString("en-BD")}`);
    if (sell > 0) lines.push(`বিক্রয় / দিলাম ${sell.toLocaleString("en-BD")}`);
    if (buy > 0) lines.push(`পরিশোধ ${buy.toLocaleString("en-BD")}`);
    lines.push(`বর্তমান বাকি ${Math.abs(currentBalance).toLocaleString("en-BD")}`);
    lines.push("");
    lines.push("MAHFUZ SHU & BOSTRALOY");
    return lines.join("\n");
  };

  const shareText = buildText();
  const encoded = encodeURIComponent(shareText);

  const platforms = [
    {
      label: "WhatsApp",
      bgColor: "bg-[#25D366]",
      icon: <IoLogoWhatsapp className="text-white text-xl" />,
      url: `https://wa.me/?text=${encoded}`,
    },
    {
      label: "SMS",
      bgColor: "bg-[#f9a825]",
      icon: <MdSms className="text-white text-xl" />,
      url: `sms:?body=${encoded}`,
    },
    {
      label: "Messenger",
      bgColor: "bg-gradient-to-tr from-[#006AFF] to-[#A033FF]",
      icon: <SiMessenger className="text-white text-xl" />,
      url: `https://www.facebook.com/dialog/send?link=https://hisab-rakhi.com&quote=${encoded}`,
    },
    {
      label: "Imo",
      bgColor: "bg-[#00A9E7]",
      icon: <span className="text-white font-bold text-[10px] uppercase">imo</span>,
      url: `https://wa.me/?text=${encoded}`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.35 }}
      className="w-full mt-8"
    >
      {/* ✅ Divider — fade in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="flex items-center w-full mb-6"
      >
        <div className="flex-grow h-[1px] bg-gray-200"></div>
        <span className="px-4 text-sm text-gray-400 font-medium tracking-tight">
          লেনদেন রেকর্ড শেয়ার করি
        </span>
        <div className="flex-grow h-[1px] bg-gray-200"></div>
      </motion.div>

      {/* ✅ Icon Row — stagger */}
      <div className="flex justify-between items-center px-1">
        {platforms.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 16,
              delay: 0.35 + i * 0.07,
            }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => window.open(p.url, "_blank")}
          >
            {/* ✅ Icon button */}
            <motion.div
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.1 }}
              className={`w-10 h-10 ${p.bgColor} rounded-full flex items-center justify-center shadow-sm`}
            >
              {p.icon}
            </motion.div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 + i * 0.07, duration: 0.2 }}
              className="text-[12px] text-gray-600 font-medium"
            >
              {p.label}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}