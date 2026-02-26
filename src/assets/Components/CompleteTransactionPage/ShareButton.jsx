import React from 'react';
import { IoLogoWhatsapp, IoChatbubbleEllipsesSharp } from 'react-icons/io5';
import { MdOutlineArrowUpward, MdSms } from 'react-icons/md';
import { SiMessenger } from 'react-icons/si';

const ShareOption = ({ icon: Icon, label, bgColor, isHighlighted, isImo }) => (
  <div className="flex flex-col items-center gap-2 group cursor-pointer">
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${isHighlighted ? 'bg-emerald-50' : 'bg-transparent'}`}>
      <div className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center shadow-sm group-active:scale-90 transition-transform`}>
        {isImo ? (
          <span className="text-white font-bold text-[10px] uppercase">imo</span>
        ) : (
          <Icon className="text-white text-xl" />
        )}
      </div>
    </div>
    <span className="text-[12px] text-gray-600 font-medium">{label}</span>
  </div>
);

export default function ShareButton() {
  return (
    <div className="w-full mt-8">
      {/* Divider with Text */}
      <div className="flex items-center w-full mb-6">
        <div className="flex-grow h-[1px] bg-gray-200"></div>
        <span className="px-4 text-sm text-gray-400 font-medium tracking-tight">লেনদেন রেকর্ড শেয়ার করি</span>
        <div className="flex-grow h-[1px] bg-gray-200"></div>
      </div>

      {/* Icon Row */}
      <div className="flex justify-between items-center px-1">
        <ShareOption 
          icon={IoLogoWhatsapp} 
          label="WhatsApp" 
          bgColor="bg-[#25D366]" 
          isHighlighted={true} 
        />
        <ShareOption 
          icon={MdSms} 
          label="SMS" 
          bgColor="bg-[#f9a825]" 
        />
        <ShareOption 
          icon={SiMessenger} 
          label="Messenger" 
          bgColor="bg-gradient-to-tr from-[#006AFF] to-[#A033FF]" 
        />
        <ShareOption 
          label="Imo" 
          bgColor="bg-[#00A9E7]" 
          isImo={true} 
        />
      </div>
    </div>
  );
}