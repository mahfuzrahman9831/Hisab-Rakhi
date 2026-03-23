import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../Context/AuthContext";
import { useBusiness } from "../../../Context/BusinessContext";
import {
  FiCamera, FiEdit2, FiMapPin, FiUploadCloud,
  FiEyeOff, FiEye, FiCheck, FiX,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion"; // ✅

export default function ProfilePage({ onSaveRef }) {
  const { user, shopInfo, saveShopInfo } = useAuth();
  const { activeBusiness } = useBusiness();
  const saveRef = useRef(null);

  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || null);
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [tempName, setTempName] = useState("");
  const profileImgRef = useRef();

  const [editingBiz, setEditingBiz] = useState(false);
  const [bizName, setBizName] = useState(activeBusiness?.name || shopInfo?.shopName || "");
  const [bizAddress, setBizAddress] = useState(shopInfo?.shopAddress || "");
  const [shopImage, setShopImage] = useState(localStorage.getItem("shopImage") || null);
  const shopImgRef = useRef();

  const [showNID, setShowNID] = useState(false);
  const [nidNumber, setNidNumber] = useState(localStorage.getItem("nidNumber") || "");
  const [editingNID, setEditingNID] = useState(false);
  const [tempNID, setTempNID] = useState("");
  const [nidFront, setNidFront] = useState(localStorage.getItem("nidFront") || null);
  const [nidBack, setNidBack] = useState(localStorage.getItem("nidBack") || null);
  const frontUploadRef = useRef();
  const backUploadRef = useRef();
  const frontCameraRef = useRef();
  const backCameraRef = useRef();

  const [showToast, setShowToast] = useState(false);

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

  const handleSaveBiz = () => {
    saveShopInfo({ ...shopInfo, shopName: bizName, shopAddress: bizAddress });
    setEditingBiz(false);
  };

  const handleSaveNID = () => {
    setNidNumber(tempNID);
    localStorage.setItem("nidNumber", tempNID);
    setEditingNID(false);
  };

  const handleSaveAll = () => {
    saveShopInfo({ ...shopInfo, shopName: bizName, shopAddress: bizAddress });
    if (name) localStorage.setItem("profileName", name);
    if (nidNumber) localStorage.setItem("nidNumber", nidNumber);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  useEffect(() => {
    if (onSaveRef) onSaveRef.current = handleSaveAll;
  }, [bizName, bizAddress, nidNumber, name]);

  const maskedNID = nidNumber
    ? nidNumber.slice(0, -4).replace(/\d/g, "*") + nidNumber.slice(-4)
    : "";

  return (
    <main className="flex-1 w-full max-w-md mx-auto pb-32 bg-gray-50">

      {/* ✅ Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2 text-sm font-semibold"
          >
            <FiCheck size={16} />
            সফলভাবে সেভ হয়েছে!
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex p-6"
      >
        <div className="flex w-full flex-col gap-4 items-center">

          {/* ✅ Profile Image — bounce in */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.15 }}
            className="relative"
          >
            <img
              src={profileImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuAT5j47Pnqm0lqadDeNfnUypp1NXrOTioJIj0cVEIlYajxPWtu3FLHVIS_LprDLXw3Z_cWKvAcluwiUqTmJ-ODgKB4vAlJmpH7hMgkzJSroYQfyrdYI2KFUO8u0Rzvu1onqMSxjBA0VSqVLKjtnrpCfdu5HD_ZRRHzpS8c8zWjaIRdbCB6KkjK-XGipTXkeVdkvLXvVgMAT34QuSFIgJz1dh-hjg-a7WvPY9z1sd0xQZsI4bAgZbAPoXNz_JG7XhJ4-uKZsCFeEgR8O"}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-green-200"
            />
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => profileImgRef.current.click()}
              className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full shadow-md transition"
            >
              <FiCamera size={16} />
            </motion.button>
            <input ref={profileImgRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => handleImageChange(e, setProfileImage, "profileImage")} />
          </motion.div>

          {/* ✅ Editable Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.3 }}
            className="text-center"
          >
            <AnimatePresence mode="wait">
              {editingName ? (
                <motion.div
                  key="editing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="border border-green-400 rounded-xl px-3 py-2 text-base font-bold focus:outline-none focus:ring-2 focus:ring-green-500/30"
                    autoFocus
                  />
                  <motion.button whileTap={{ scale: 0.85 }}
                    onClick={() => { setName(tempName); setEditingName(false); }}
                    className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center"
                  >
                    <FiCheck size={14} />
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.85 }}
                    onClick={() => setEditingName(false)}
                    className="w-8 h-8 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center"
                  >
                    <FiX size={14} />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="display"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 justify-center"
                >
                  <p className="text-[22px] font-bold">{name || user?.name || "নাম যোগ করুন"}</p>
                  <motion.button whileTap={{ scale: 0.85 }}
                    onClick={() => { setTempName(name || user?.name || ""); setEditingName(true); }}
                    className="text-green-500"
                  >
                    <FiEdit2 size={16} />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
            <p className="text-gray-500 text-base">{user?.phone || ""}</p>
          </motion.div>
        </div>
      </motion.div>

      {/* ✅ Business Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="px-4 py-2"
      >
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-lg font-bold">Business Info</h2>
          <AnimatePresence mode="wait">
            {!editingBiz ? (
              <motion.button
                key="edit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setEditingBiz(true)}
                className="text-green-600 flex items-center gap-1 text-sm font-medium"
              >
                <FiEdit2 size={16} /> Edit
              </motion.button>
            ) : (
              <motion.div
                key="save-cancel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-3"
              >
                <motion.button whileTap={{ scale: 0.9 }} onClick={handleSaveBiz}
                  className="text-green-600 flex items-center gap-1 text-sm font-medium"
                >
                  <FiCheck size={16} /> Save
                </motion.button>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => setEditingBiz(false)}
                  className="text-gray-400 flex items-center gap-1 text-sm font-medium"
                >
                  <FiX size={16} /> Cancel
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          layout
          className="bg-white rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="p-4 flex gap-3 items-center">
            <div className="relative shrink-0">
              <img
                src={shopImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuBNtksEcRj6vGLpTnEvtAX6v2FTAAErtgk5NgctOnNF_PDdJ2rFC2LciRGacCGHYWJ_LJqrijVnIuaE-nHL1beODVuCaDKBmiAfmh5ysq0imSWt2FBxDLKLjPHXH_eFxAt5Mi4dO3S2NsY3OUiDQc_4LrHSc9OD_OXBO1GcktcfDHDWVrE2lsxBtU9kdL1q87FgJrNoIuBqtKcNufipsVCSB5__x0Iq16p35rXeKzXDYH2mTq4vd2dWD2etvwMUWZF8CLtmczCLKXv3"}
                alt="Shop"
                className="w-16 h-16 rounded-lg object-cover"
              />
              <AnimatePresence>
                {editingBiz && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={() => shopImgRef.current.click()}
                    className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full shadow"
                  >
                    <FiCamera size={11} />
                  </motion.button>
                )}
              </AnimatePresence>
              <input ref={shopImgRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => handleImageChange(e, setShopImage, "shopImage")} />
            </div>

            <div className="flex flex-col justify-center flex-1 min-w-0">
              <p className="text-xs font-medium uppercase text-gray-500">Shop Name</p>
              <AnimatePresence mode="wait">
                {editingBiz ? (
                  <motion.input
                    key="input"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    type="text"
                    value={bizName}
                    onChange={(e) => setBizName(e.target.value)}
                    className="w-full text-sm font-bold border border-green-400 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500/30 mt-1"
                  />
                ) : (
                  <motion.p
                    key="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-base font-bold truncate"
                  >
                    {bizName || "দোকানের নাম"}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="px-4 pb-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <div className="text-green-600 bg-green-100 p-1.5 rounded-lg shrink-0">
                <FiMapPin size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs uppercase text-gray-500 font-medium">Business Address</p>
                <AnimatePresence mode="wait">
                  {editingBiz ? (
                    <motion.input
                      key="input"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      type="text"
                      value={bizAddress}
                      onChange={(e) => setBizAddress(e.target.value)}
                      placeholder="ঠিকানা লিখুন"
                      className="w-full text-sm font-medium border border-green-400 rounded-xl px-3 py-1.5 mt-1 focus:outline-none focus:ring-2 focus:ring-green-500/30"
                    />
                  ) : (
                    <motion.p
                      key="text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium truncate"
                    >
                      {bizAddress || "ঠিকানা যোগ করুন"}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ✅ Identification */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="px-4 py-6"
      >
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-lg font-bold">Identification</h2>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 space-y-5">

          {/* NID Number */}
          <div>
            <label className="text-xs uppercase text-gray-500 font-medium">NID Number</label>
            <div className="relative mt-2">
              <AnimatePresence mode="wait">
                {editingNID ? (
                  <motion.div
                    key="editing"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={tempNID}
                      onChange={(e) => setTempNID(e.target.value)}
                      placeholder="NID নম্বর লিখুন"
                      autoFocus
                      className="flex-1 bg-white border border-green-400 rounded-lg py-3 px-4 text-sm font-mono tracking-widest focus:outline-none"
                    />
                    <motion.button whileTap={{ scale: 0.85 }} onClick={handleSaveNID}
                      className="w-11 h-11 rounded-xl bg-green-500 text-white flex items-center justify-center"
                    >
                      <FiCheck size={16} />
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.85 }} onClick={() => setEditingNID(false)}
                      className="w-11 h-11 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center"
                    >
                      <FiX size={16} />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="display"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={nidNumber ? (showNID ? nidNumber : maskedNID) : ""}
                        readOnly
                        placeholder="NID নম্বর যোগ করুন"
                        className="w-full bg-gray-50 rounded-lg py-3 px-4 pr-10 text-sm font-mono tracking-widest border border-gray-100 placeholder:text-gray-300"
                      />
                      {nidNumber && (
                        <motion.button whileTap={{ scale: 0.85 }}
                          onClick={() => setShowNID(!showNID)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                          {showNID ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                        </motion.button>
                      )}
                    </div>
                    <motion.button whileTap={{ scale: 0.85 }}
                      onClick={() => { setTempNID(nidNumber); setEditingNID(true); }}
                      className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0"
                    >
                      <FiEdit2 size={15} />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ✅ NID Photos — stagger */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "NID Front", image: nidFront, setter: setNidFront, uploadRef: frontUploadRef, cameraRef: frontCameraRef, key: "nidFront" },
              { label: "NID Back", image: nidBack, setter: setNidBack, uploadRef: backUploadRef, cameraRef: backCameraRef, key: "nidBack" },
            ].map(({ label, image, setter, uploadRef, cameraRef, key }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08, duration: 0.3 }}
                className="space-y-2"
              >
                <p className="text-xs uppercase text-gray-500 text-center font-medium">{label}</p>

                <AnimatePresence mode="wait">
                  {image ? (
                    <motion.div
                      key="image"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.25 }}
                      className="relative aspect-[3/2] rounded-lg overflow-hidden border border-gray-200"
                    >
                      <img src={image} alt={label} className="w-full h-full object-cover" />
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => { setter(null); localStorage.removeItem(key); }}
                        className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                      >
                        <FiX size={12} />
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => uploadRef.current.click()}
                      className="aspect-[3/2] rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 transition"
                    >
                      <FiUploadCloud size={20} className="text-green-600" />
                      <span className="text-[10px] font-bold text-green-600">UPDATE</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid grid-cols-2 gap-1">
                  <motion.button whileTap={{ scale: 0.93 }} type="button"
                    onClick={() => uploadRef.current.click()}
                    className="flex items-center justify-center gap-1 py-1.5 rounded-lg bg-green-50 text-green-600 text-[10px] font-bold hover:bg-green-100 transition"
                  >
                    <FiUploadCloud size={11} /> আপলোড
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.93 }} type="button"
                    onClick={() => cameraRef.current.click()}
                    className="flex items-center justify-center gap-1 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-bold hover:bg-blue-100 transition"
                  >
                    <FiCamera size={11} /> ক্যামেরা
                  </motion.button>
                </div>

                <input ref={uploadRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => handleImageChange(e, setter, key)} />
                <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden"
                  onChange={(e) => handleImageChange(e, setter, key)} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </main>
  );
}