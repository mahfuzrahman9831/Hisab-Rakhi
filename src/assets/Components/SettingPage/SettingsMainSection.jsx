import {
  FiUser,
  FiLock,
  FiBell,
  FiGlobe,
  FiChevronRight,
  FiLogOut,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { useAuth } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

export default function SettingsMainSection() {
  const { logout, pin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ✅ Forget PIN — pinSetupDone রিসেট করে PIN পেজে পাঠাবে
  const handleForgetPin = () => {
    localStorage.removeItem("userPin");
    localStorage.removeItem("pinSetupDone");
    navigate("/pin-setup");
  };

  return (
    <main className="flex-1 overflow-y-auto pb-24 bg-gray-50 max-w-md mx-auto">
      {/* Account Section */}
      <section className="mt-6 px-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 px-2 mb-2">
          Account Settings
        </h2>

        <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
          {/* Profile */}
          <button
            onClick={() => navigate("/profile")} // ✅ navigate যোগ করো
            className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 w-full text-left"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <FiUser size={18} />
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-gray-900">Profile</p>
              <p className="text-xs text-gray-500">
                Business and NID information
              </p>
            </div>
            <FiChevronRight className="text-gray-400" />
          </button>

          {/* ✅ Security — PIN আছে কিনা দেখে দুটো আলাদা UI দেখাবে */}
          {pin ? (
            // ✅ PIN আছে — "Already Created" দেখাবে + Forget PIN অপশন
            <div className="border-t border-gray-100">
              <div className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <FiCheckCircle size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-base font-semibold text-gray-900">
                    Security PIN
                  </p>
                  <p className="text-xs text-green-500 font-medium">
                    ✓ Security PIN Already Created
                  </p>
                </div>
              </div>
              {/* Forget PIN বাটন */}
              <button
                onClick={handleForgetPin}
                className="w-full flex items-center gap-4 px-4 py-3 bg-orange-50 hover:bg-orange-100 transition-colors border-t border-orange-100"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
                  <FiAlertCircle size={16} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-orange-500">
                    Forgot PIN? Reset it
                  </p>
                  <p className="text-xs text-orange-400">
                    এখানে ক্লিক করে নতুন PIN সেট করো
                  </p>
                </div>
                <FiChevronRight className="text-orange-400" />
              </button>
            </div>
          ) : (
            // ✅ PIN নেই — "Create PIN" দেখাবে
            <button
              onClick={() => navigate("/pin-setup")}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-t border-gray-100"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
                <FiLock size={18} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-base font-semibold text-gray-900">
                  Security Settings
                </p>
                <p className="text-xs text-orange-400 font-medium">
                  ⚠ Create Your Security PIN
                </p>
              </div>
              <FiChevronRight className="text-gray-400" />
            </button>
          )}
        </div>
      </section>

      {/* Preferences Section */}
      <section className="mt-8 px-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 px-2 mb-2">
          Preferences
        </h2>

        <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
          {/* Notifications */}
          <a
            href="#"
            className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <FiBell size={18} />
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-gray-900">
                Notifications
              </p>
              <p className="text-xs text-gray-500">Reminders and alerts</p>
            </div>
            <FiChevronRight className="text-gray-400" />
          </a>

          <button
            onClick={() => navigate("/trash")}
            className="flex items-center gap-4 p-4 hover:bg-red-50 transition-colors w-full text-left"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-500">
              <FiTrash2 size={18} />
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-black-500">Trash</p>
              <p className="text-xs text-gray-500">মুছে ফেলা লেনদেন দেখুন</p>
            </div>
            <FiChevronRight className="text-gray-400" />
          </button>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="mt-8 px-4">
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
          {/* ✅ onClick যোগ হয়েছে শুধু */}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-4 p-4 hover:bg-red-50 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
              <FiLogOut size={18} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-base font-semibold text-red-600">Log Out</p>
            </div>
          </button>
        </div>
      </section>

      {/* App Version */}
      <div className="mt-12 text-center px-4 pb-10">
        <p className="text-sm text-gray-400">Ledger App v2.4.12 (Premium)</p>
        <p className="text-xs text-gray-400 mt-1">
          © 2024 Business Solutions Inc.
        </p>
      </div>
    </main>
  );
}
