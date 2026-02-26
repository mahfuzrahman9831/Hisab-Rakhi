import React from 'react';

const ShareOption = ({ icon, label, bgColor, isHighlighted, isImo }) => (
  <div className="flex flex-col items-center gap-2 group cursor-pointer">
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${isHighlighted ? 'bg-emerald-50' : 'bg-transparent'}`}>
      <div className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center shadow-sm group-active:scale-90 transition-transform`}>
        {isImo ? (
          <span className="text-white font-bold text-[10px] uppercase">imo</span>
        ) : (
          <span className="material-icons text-white text-xl">{icon}</span>
        )}
      </div>
    </div>
    <span className="text-[12px] text-gray-600 font-medium">{label}</span>
  </div>
);

export default function ShareButton() {
  return (
    <div className="w-full mt-8">
      <div className="flex items-center w-full mb-6">
        <div className="flex-grow h-[1px] bg-gray-200"></div>
        <span className="px-4 text-sm text-gray-400 font-medium">লেনদেন রেকর্ড শেয়ার করি</span>
        <div className="flex-grow h-[1px] bg-gray-200"></div>
      </div>

      <div className="flex justify-between items-center px-1">
        <ShareOption icon="chat" label="হোয়াটসঅ্যাপ" bgColor="bg-[#25D366]" isHighlighted={true} />
        <ShareOption icon="arrow_upward" label="টালি-মেসেজ" bgColor="bg-[#d32f2f]" />
        <ShareOption icon="sms" label="এসএমএস" bgColor="bg-[#f9a825]" />
        <ShareOption icon="bolt" label="মেসেঞ্জার" bgColor="bg-gradient-to-tr from-[#006AFF] to-[#A033FF]" />
        <ShareOption label="ইমো" bgColor="bg-[#00A9E7]" isImo={true} />
      </div>
    </div>
  );
}