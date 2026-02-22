import {
  FiUser,
  FiLock,
  FiBell,
  FiGlobe,
  FiChevronRight,
  FiLogOut,
} from "react-icons/fi";


export default function SettingsMainSection() {
  return (
    <main className="flex-1 overflow-y-auto pb-24 bg-gray-50 max-w-md mx-auto">

      {/* Account Section */}
      <section className="mt-6 px-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 px-2 mb-2">
          Account Settings
        </h2>

        <div className="bg-white rounded-xl overflow-hidden border border-gray-200">

          {/* Profile */}
          <a
            href="#"
            className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <FiUser size={18} />
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-gray-900">
                Profile
              </p>
              <p className="text-xs text-gray-500">
                Business and NID information
              </p>
            </div>
            <FiChevronRight className="text-gray-400" />
          </a>

          {/* Security */}
          <a
            href="#"
            className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <FiLock size={18} />
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-gray-900">
                Security Settings
              </p>
              <p className="text-xs text-gray-500">
                Passwords and 2FA
              </p>
            </div>
            <FiChevronRight className="text-gray-400" />
          </a>

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
              <p className="text-xs text-gray-500">
                Reminders and alerts
              </p>
            </div>
            <FiChevronRight className="text-gray-400" />
          </a>

          {/* Language */}
          <a
            href="#"
            className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600">
              <FiGlobe size={18} />
            </div>
            <div className="flex-1">
              <p className="text-base font-semibold text-gray-900">
                Language
              </p>
              <p className="text-xs text-gray-500">
                English (US)
              </p>
            </div>
            <FiChevronRight className="text-gray-400" />
          </a>

        </div>
      </section>

      {/* Danger Zone */}
      <section className="mt-8 px-4">
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
          <button className="flex w-full items-center gap-4 p-4 hover:bg-red-50 transition-colors">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
              <FiLogOut size={18} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-base font-semibold text-red-600">
                Log Out
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* App Version */}
      <div className="mt-12 text-center px-4 pb-10">
        <p className="text-sm text-gray-400">
          Ledger App v2.4.12 (Premium)
        </p>
        <p className="text-xs text-gray-400 mt-1">
          © 2024 Business Solutions Inc.
        </p>
      </div>

    </main>
  );
}