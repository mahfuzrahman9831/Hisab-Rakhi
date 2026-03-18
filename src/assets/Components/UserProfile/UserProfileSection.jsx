import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { useBusiness } from "../../../Context/BusinessContext";
import {
  FiCamera,
  FiEdit2,
  FiMapPin,
  FiUploadCloud,
  FiEyeOff,
  FiEye,
  FiCheck,
  FiX,
} from "react-icons/fi";

export default function ProfilePage({ onSaveRef }) {
  const { user, shopInfo, saveShopInfo } = useAuth();
  const { activeBusiness } = useBusiness();
  const saveRef = useRef(null);

  // ✅ Profile
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || null,
  );
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [tempName, setTempName] = useState("");
  const profileImgRef = useRef();

  // ✅ Business Info
  const [editingBiz, setEditingBiz] = useState(false);
  const [bizName, setBizName] = useState(
    activeBusiness?.name || shopInfo?.shopName || "",
  );
  const [bizAddress, setBizAddress] = useState(shopInfo?.shopAddress || "");
  const [shopImage, setShopImage] = useState(
    localStorage.getItem("shopImage") || null,
  );
  const shopImgRef = useRef();

  // ✅ NID
  const [showNID, setShowNID] = useState(false);
  const [nidNumber, setNidNumber] = useState(
    localStorage.getItem("nidNumber") || "",
  );
  const [editingNID, setEditingNID] = useState(false);
  const [tempNID, setTempNID] = useState("");
  const [nidFront, setNidFront] = useState(
    localStorage.getItem("nidFront") || null,
  );
  const [nidBack, setNidBack] = useState(
    localStorage.getItem("nidBack") || null,
  );
  const frontUploadRef = useRef();
  const backUploadRef = useRef();
  const frontCameraRef = useRef();
  const backCameraRef = useRef();

  // ✅ Toast
  const [showToast, setShowToast] = useState(false);

  // ✅ Image handler
  const handleImageChange = (e, setter, key) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setter(reader.result);
      localStorage.setItem(key, reader.result);
    };
    reader.readAsDataURL(file);
  };

  // ✅ Save Business (inline)
  const handleSaveBiz = () => {
    saveShopInfo({ ...shopInfo, shopName: bizName, shopAddress: bizAddress });
    setEditingBiz(false);
  };

  // ✅ Save NID (inline)
  const handleSaveNID = () => {
    setNidNumber(tempNID);
    localStorage.setItem("nidNumber", tempNID);
    setEditingNID(false);
  };

  // ✅ Save All — Save বাটনে ক্লিক করলে
  const handleSaveAll = () => {
    // Business info
    saveShopInfo({ ...shopInfo, shopName: bizName, shopAddress: bizAddress });

    // Name
    if (name) localStorage.setItem("profileName", name);

    // NID
    if (nidNumber) localStorage.setItem("nidNumber", nidNumber);

    // ✅ Toast দেখাও
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  // ✅ onSaveRef এ handleSaveAll assign করো
  useEffect(() => {
    if (onSaveRef) {
      onSaveRef.current = handleSaveAll;
    }
  }, [bizName, bizAddress, nidNumber, name]);

  const maskedNID = nidNumber
    ? nidNumber.slice(0, -4).replace(/\d/g, "*") + nidNumber.slice(-4)
    : "";

  return (
    <main className="flex-1 w-full max-w-md mx-auto pb-32 bg-gray-50">
      {/* ✅ Success Toast */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2 text-sm font-semibold">
          <FiCheck size={16} />
          সফলভাবে সেভ হয়েছে!
        </div>
      )}

      {/* ✅ Profile Header */}
      <div className="flex p-6">
        <div className="flex w-full flex-col gap-4 items-center">
          <div className="relative">
            <img
              src={
                profileImage ||
                "https://lh3.googleusercontent.com/aida-public/AB6AXuAT5j47Pnqm0lqadDeNfnUypp1NXrOTioJIj0cVEIlYajxPWtu3FLHVIS_LprDLXw3Z_cWKvAcluwiUqTmJ-ODgKB4vAlJmpH7hMgkzJSroYQfyrdYI2KFUO8u0Rzvu1onqMSxjBA0VSqVLKjtnrpCfdu5HD_ZRRHzpS8c8zWjaIRdbCB6KkjK-XGipTXkeVdkvLXvVgMAT34QuSFIgJz1dh-hjg-a7WvPY9z1sd0xQZsI4bAgZbAPoXNz_JG7XhJ4-uKZsCFeEgR8O"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-green-200"
            />
            <button
              onClick={() => profileImgRef.current.click()}
              className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full shadow-md active:scale-95 transition"
            >
              <FiCamera size={16} />
            </button>
            <input
              ref={profileImgRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                handleImageChange(e, setProfileImage, "profileImage")
              }
            />
          </div>

          {/* ✅ Editable Name */}
          <div className="text-center">
            {editingName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="border border-green-400 rounded-xl px-3 py-2 text-base font-bold focus:outline-none focus:ring-2 focus:ring-green-500/30"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setName(tempName);
                    setEditingName(false);
                  }}
                  className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center"
                >
                  <FiCheck size={14} />
                </button>
                <button
                  onClick={() => setEditingName(false)}
                  className="w-8 h-8 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center"
                >
                  <FiX size={14} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 justify-center">
                <p className="text-[22px] font-bold">
                  {name || user?.name || "নাম যোগ করুন"}
                </p>
                <button
                  onClick={() => {
                    setTempName(name || user?.name || "");
                    setEditingName(true);
                  }}
                  className="text-green-500"
                >
                  <FiEdit2 size={16} />
                </button>
              </div>
            )}
            <p className="text-gray-500 text-base">{user?.phone || ""}</p>
          </div>
        </div>
      </div>

      {/* ✅ Business Info */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-lg font-bold">Business Info</h2>

          {/* ✅ Edit / Save / Cancel */}
          {!editingBiz ? (
            <button
              onClick={() => setEditingBiz(true)}
              className="text-green-600 flex items-center gap-1 text-sm font-medium"
            >
              <FiEdit2 size={16} /> Edit
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleSaveBiz}
                className="text-green-600 flex items-center gap-1 text-sm font-medium"
              >
                <FiCheck size={16} /> Save
              </button>
              <button
                onClick={() => setEditingBiz(false)}
                className="text-gray-400 flex items-center gap-1 text-sm font-medium"
              >
                <FiX size={16} /> Cancel
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-4 flex gap-3 items-center">
            {/* Shop Image */}
            <div className="relative shrink-0">
              <img
                src={
                  shopImage ||
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuBNtksEcRj6vGLpTnEvtAX6v2FTAAErtgk5NgctOnNF_PDdJ2rFC2LciRGacCGHYWJ_LJqrijVnIuaE-nHL1beODVuCaDKBmiAfmh5ysq0imSWt2FBxDLKLjPHXH_eFxAt5Mi4dO3S2NsY3OUiDQc_4LrHSc9OD_OXBO1GcktcfDHDWVrE2lsxBtU9kdL1q87FgJrNoIuBqtKcNufipsVCSB5__x0Iq16p35rXeKzXDYH2mTq4vd2dWD2etvwMUWZF8CLtmczCLKXv3"
                }
                alt="Shop"
                className="w-16 h-16 rounded-lg object-cover" // ✅ w-20 → w-16
              />
              {editingBiz && (
                <>
                  <button
                    onClick={() => shopImgRef.current.click()}
                    className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full shadow active:scale-95"
                  >
                    <FiCamera size={11} />
                  </button>
                  <input
                    ref={shopImgRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleImageChange(e, setShopImage, "shopImage")
                    }
                  />
                </>
              )}
            </div>

            <div className="flex flex-col justify-center flex-1 min-w-0">
              <p className="text-xs font-medium uppercase text-gray-500">
                Shop Name
              </p>
              {editingBiz ? (
                <input
                  type="text"
                  value={bizName}
                  onChange={(e) => setBizName(e.target.value)}
                  className="w-full text-sm font-bold border border-green-400 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500/30 mt-1"
                />
              ) : (
                <p className="text-base font-bold truncate">
                  {bizName || "দোকানের নাম"}
                </p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="px-4 pb-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <div className="text-green-600 bg-green-100 p-1.5 rounded-lg shrink-0">
                <FiMapPin size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs uppercase text-gray-500 font-medium">
                  Business Address
                </p>
                {editingBiz ? (
                  <input
                    type="text"
                    value={bizAddress}
                    onChange={(e) => setBizAddress(e.target.value)}
                    placeholder="ঠিকানা লিখুন"
                    className="w-full text-sm font-medium border border-green-400 rounded-xl px-3 py-1.5 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                  />
                ) : (
                  <p className="text-sm font-medium truncate">
                    {bizAddress || "ঠিকানা যোগ করুন"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Identification */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-lg font-bold">Identification</h2>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-5">
          {/* NID Number */}
          <div>
            <label className="text-xs uppercase text-gray-500 font-medium">
              NID Number
            </label>
            <div className="relative mt-2">
              {editingNID ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tempNID}
                    onChange={(e) => setTempNID(e.target.value)}
                    placeholder="NID নম্বর লিখুন"
                    autoFocus
                    className="flex-1 bg-white border border-green-400 rounded-lg py-3 px-4 text-sm font-mono tracking-widest focus:outline-none"
                  />
                  <button
                    onClick={handleSaveNID}
                    className="w-11 h-11 rounded-xl bg-green-500 text-white flex items-center justify-center"
                  >
                    <FiCheck size={16} />
                  </button>
                  <button
                    onClick={() => setEditingNID(false)}
                    className="w-11 h-11 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={nidNumber ? (showNID ? nidNumber : maskedNID) : ""}
                      readOnly
                      placeholder="NID নম্বর যোগ করুন"
                      className="w-full bg-gray-50 rounded-lg py-3 px-4 pr-10 text-sm font-mono tracking-widest border border-gray-100 placeholder:text-gray-300"
                    />
                    {nidNumber && (
                      <button
                        onClick={() => setShowNID(!showNID)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showNID ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setTempNID(nidNumber);
                      setEditingNID(true);
                    }}
                    className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0"
                  >
                    <FiEdit2 size={15} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* NID Photos */}
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                label: "NID Front",
                image: nidFront,
                setter: setNidFront,
                uploadRef: frontUploadRef,
                cameraRef: frontCameraRef,
                key: "nidFront",
              },
              {
                label: "NID Back",
                image: nidBack,
                setter: setNidBack,
                uploadRef: backUploadRef,
                cameraRef: backCameraRef,
                key: "nidBack",
              },
            ].map(({ label, image, setter, uploadRef, cameraRef, key }) => (
              <div key={label} className="space-y-2">
                <p className="text-xs uppercase text-gray-500 text-center font-medium">
                  {label}
                </p>

                {image ? (
                  <div className="relative aspect-[3/2] rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={image}
                      alt={label}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        setter(null);
                        localStorage.removeItem(key);
                      }}
                      className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                    >
                      <FiX size={12} />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => uploadRef.current.click()}
                    className="aspect-[3/2] rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 transition"
                  >
                    <FiUploadCloud size={20} className="text-green-600" />
                    <span className="text-[10px] font-bold text-green-600">
                      UPDATE
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-1">
                  <button
                    type="button"
                    onClick={() => uploadRef.current.click()}
                    className="flex items-center justify-center gap-1 py-1.5 rounded-lg bg-green-50 text-green-600 text-[10px] font-bold hover:bg-green-100 transition"
                  >
                    <FiUploadCloud size={11} /> আপলোড
                  </button>
                  <button
                    type="button"
                    onClick={() => cameraRef.current.click()}
                    className="flex items-center justify-center gap-1 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-bold hover:bg-blue-100 transition"
                  >
                    <FiCamera size={11} /> ক্যামেরা
                  </button>
                </div>

                <input
                  ref={uploadRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, setter, key)}
                />
                <input
                  ref={cameraRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, setter, key)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
