import React, { useState } from "react";
import { FaBuilding, FaUsers, FaQrcode, FaCloudUploadAlt, FaCheck } from "react-icons/fa";
import { MdClose, MdAdd, MdChevronRight } from "react-icons/md";
import { useBusiness } from "../../../Context/BusinessContext";

export default function Group_Business() {
  const { businesses, activeBusiness, switchBusiness, addBusiness } = useBusiness();

  const [showSheet, setShowSheet] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [bizName, setBizName] = useState("");
  const [bizAddress, setBizAddress] = useState("");

  const handleAddBusiness = () => {
    if (!bizName.trim()) return;
    const newBiz = addBusiness(bizName.trim(), bizAddress.trim());
    switchBusiness(newBiz.id);
    setBizName("");
    setBizAddress("");
    setShowAddForm(false);
    setShowSheet(false);
  };

  return (
    <>
      <section className="px-4 py-3">
        <div className="grid grid-cols-4 gap-3">

          {/* Multi Business ✅ */}
          <button
            onClick={() => setShowSheet(true)}
            className="flex flex-col items-center gap-2 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-green-500 hover:bg-green-600 text-white shadow-sm flex items-center justify-center border border-gray-200 group-active:scale-95 transition-transform">
              <FaBuilding size={20} />
            </div>
            <span className="text-[10px] font-semibold text-center leading-tight">
              Multi Business
            </span>
          </button>

          {/* বাকি buttons */}
          <button className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-2xl bg-green-500 hover:bg-green-600 text-white shadow-sm flex items-center justify-center border border-gray-200 group-active:scale-95 transition-transform">
              <FaUsers size={20} />
            </div>
            <span className="text-[10px] font-semibold text-center leading-tight">Group Collection</span>
          </button>

          <button className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-2xl bg-green-500 hover:bg-green-600 text-white shadow-sm flex items-center justify-center border border-gray-200 group-active:scale-95 transition-transform">
              <FaQrcode size={20} />
            </div>
            <span className="text-[10px] font-semibold text-center leading-tight">My QR</span>
          </button>

          <button className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-2xl bg-green-500 hover:bg-green-600 text-white shadow-sm flex items-center justify-center border border-gray-200 group-active:scale-95 transition-transform">
              <FaCloudUploadAlt size={20} />
            </div>
            <span className="text-[10px] font-semibold text-center leading-tight">Data Backup</span>
          </button>

        </div>
      </section>

      {/* ✅ Bottom Sheet */}
      {showSheet && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end items-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => { setShowSheet(false); setShowAddForm(false); }}
          />

          {/* Sheet */}
          <div className="relative bg-white rounded-t-3xl w-full max-w-[380px] px-5 pt-4 pb-24 z-10 max-h-[80vh] overflow-y-auto">

            {/* Handle */}
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-base">ব্যবসা সমূহ</h3>
                <p className="text-xs text-gray-400">{businesses.length} টি ব্যবসা</p>
              </div>
              <button
                onClick={() => { setShowSheet(false); setShowAddForm(false); }}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <MdClose size={20} />
              </button>
            </div>

            {/* Business List */}
            <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
              {businesses.map((biz) => (
                <button
                  key={biz.id}
                  onClick={() => { switchBusiness(biz.id); setShowSheet(false); }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition ${
                    activeBusiness?.id === biz.id
                      ? "border-green-500 bg-green-50"
                      : "border-gray-100 bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="text-left">
                    <p className="font-semibold text-sm text-slate-800">{biz.name}</p>
                    {biz.address && (
                      <p className="text-xs text-gray-400 mt-0.5">{biz.address}</p>
                    )}
                  </div>
                  {activeBusiness?.id === biz.id && (
                    <FaCheck className="text-green-500" size={14} />
                  )}
                </button>
              ))}
            </div>

            {/* Add Form */}
            {showAddForm ? (
              <div className="space-y-3 border-t pt-4">
                <p className="font-semibold text-sm text-slate-700">নতুন ব্যবসা যোগ করুন</p>
                <input
                  type="text"
                  placeholder="ব্যবসার নাম *"
                  value={bizName}
                  onChange={(e) => setBizName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  placeholder="ঠিকানা (ঐচ্ছিক)"
                  value={bizAddress}
                  onChange={(e) => setBizAddress(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-500"
                  >
                    বাতিল
                  </button>
                  <button
                    onClick={handleAddBusiness}
                    disabled={!bizName.trim()}
                    className="flex-1 py-3 rounded-xl bg-green-500 text-white text-sm font-semibold disabled:opacity-40"
                  >
                    যোগ করুন
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full py-3 rounded-xl border-2 border-dashed border-green-300 text-green-600 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-green-50 transition"
              >
                <MdAdd size={18} />
                + নতুন ব্যবসা যোগ করুন
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}