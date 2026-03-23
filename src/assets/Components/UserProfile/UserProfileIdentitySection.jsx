import React from 'react'
import { FiEdit2, FiEyeOff, FiUploadCloud } from 'react-icons/fi'
import { useState, useRef } from "react";

export default function UserProfileIdentitySection() {
  return (
    <div className="px-4 py-6">

        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-lg font-bold">
            Identification
          </h2>

          <button className="text-green-600 flex items-center gap-1 text-sm font-medium">
            <FiEdit2 size={16} />
            Edit
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-5">

          // ✅ NID Section Component
export default function NIDSection() {
  const [showNID, setShowNID] = useState(false);
  const [nidNumber, setNidNumber] = useState("****-****-1234");
  const [editingNID, setEditingNID] = useState(false);
  const [tempNID, setTempNID] = useState("");
  const [nidFront, setNidFront] = useState(null);
  const [nidBack, setNidBack] = useState(null);

  const frontUploadRef = useRef();
  const backUploadRef = useRef();
  const frontCameraRef = useRef();
  const backCameraRef = useRef();

  const handleImageSelect = (e, setter) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setter(reader.result);
    reader.readAsDataURL(file);
  };

  const handleEditNID = () => {
    setTempNID(nidNumber.replace(/\*/g, ""));
    setEditingNID(true);
    setShowNID(true);
  };

  const handleSaveNID = () => {
    setNidNumber(tempNID);
    setEditingNID(false);
  };

  const handleCancelNID = () => {
    setEditingNID(false);
  };

  const NIDCard = ({ label, image, uploadRef, cameraRef, setter }) => (
    <div className="space-y-2">
      <p className="text-xs uppercase text-gray-500 text-center font-medium">{label}</p>

      {/* ✅ Preview */}
      {image ? (
        <div className="relative aspect-[3/2] rounded-xl overflow-hidden border border-gray-200">
          <img src={image} alt={label} className="w-full h-full object-cover" />
          <button
            onClick={() => setter(null)}
            className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
          >
            <FiX size={12} />
          </button>
        </div>
      ) : (
        <div className="aspect-[3/2] rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-1">
          <FiUploadCloud size={18} className="text-gray-300" />
          <span className="text-[10px] text-gray-400">ছবি নেই</span>
        </div>
      )}

      {/* ✅ Upload + Camera buttons */}
      <div className="grid grid-cols-2 gap-1.5">
        {/* Upload */}
        <button
          type="button"
          onClick={() => uploadRef.current.click()}
          className="flex items-center justify-center gap-1 py-2 rounded-xl bg-green-50 text-green-600 text-[11px] font-bold hover:bg-green-100 transition active:scale-95"
        >
          <FiUploadCloud size={13} />
          আপলোড
        </button>
        <input
          ref={uploadRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleImageSelect(e, setter)}
        />

        {/* Camera */}
        <button
          type="button"
          onClick={() => cameraRef.current.click()}
          className="flex items-center justify-center gap-1 py-2 rounded-xl bg-blue-50 text-blue-600 text-[11px] font-bold hover:bg-blue-100 transition active:scale-95"
        >
          <FiCamera size={13} />
          ক্যামেরা
        </button>
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => handleImageSelect(e, setter)}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-4">

      {/* NID Number */}
      <div>
        <label className="text-xs uppercase text-gray-500 font-medium">NID Number</label>

        <div className="relative mt-2">
          {editingNID ? (
            // ✅ Edit mode
            <div className="flex gap-2">
              <input
                type="text"
                value={tempNID}
                onChange={(e) => setTempNID(e.target.value)}
                placeholder="NID নম্বর লিখুন"
                className="flex-1 bg-white border border-green-400 rounded-xl py-3 px-4 text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-green-500/30"
                autoFocus
              />
              <button
                onClick={handleSaveNID}
                className="w-11 h-11 rounded-xl bg-green-500 text-white flex items-center justify-center active:scale-95 transition"
              >
                <FiCheck size={16} />
              </button>
              <button
                onClick={handleCancelNID}
                className="w-11 h-11 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center active:scale-95 transition"
              >
                <FiX size={16} />
              </button>
            </div>
          ) : (
            // ✅ View mode
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={showNID ? nidNumber : nidNumber.replace(/\d/g, "*")}
                  readOnly
                  className="w-full bg-gray-50 rounded-xl py-3 px-4 pr-10 text-sm font-mono tracking-widest border border-gray-200"
                />
                <button
                  onClick={() => setShowNID(!showNID)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNID ? <FiEye size={16} /> : <FiEyeOff size={16} />}
                </button>
              </div>
              <button
                onClick={handleEditNID}
                className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-100 active:scale-95 transition shrink-0"
              >
                <FiEdit2 size={15} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* NID Photos */}
      <div className="grid grid-cols-2 gap-4">
        <NIDCard
          label="NID Front"
          image={nidFront}
          uploadRef={frontUploadRef}
          cameraRef={frontCameraRef}
          setter={setNidFront}
        />
        <NIDCard
          label="NID Back"
          image={nidBack}
          uploadRef={backUploadRef}
          cameraRef={backCameraRef}
          setter={setNidBack}
        />
      </div>
    </div>
  );
}

        </div>

      </div>
  )
}
