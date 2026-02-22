import {
  FiCamera,
  FiEdit2,
  FiMapPin,
  FiUploadCloud,
  FiEyeOff,
} from "react-icons/fi";

export default function ProfilePage() {
  return (
    <main className="flex-1 w-full max-w-md mx-auto pb-32 bg-gray-50">

      {/* Profile Header */}
      <div className="flex p-6">
        <div className="flex w-full flex-col gap-4 items-center">

          <div className="relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAT5j47Pnqm0lqadDeNfnUypp1NXrOTioJIj0cVEIlYajxPWtu3FLHVIS_LprDLXw3Z_cWKvAcluwiUqTmJ-ODgKB4vAlJmpH7hMgkzJSroYQfyrdYI2KFUO8u0Rzvu1onqMSxjBA0VSqVLKjtnrpCfdu5HD_ZRRHzpS8c8zWjaIRdbCB6KkjK-XGipTXkeVdkvLXvVgMAT34QuSFIgJz1dh-hjg-a7WvPY9z1sd0xQZsI4bAgZbAPoXNz_JG7XhJ4-uKZsCFeEgR8O"
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-green-200"
            />

            <button className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full shadow-md">
              <FiCamera size={16} />
            </button>
          </div>

          <div className="text-center">
            <p className="text-[22px] font-bold">
              Alex Johnson
            </p>
            <p className="text-gray-500 text-base">
              alex.johnson@business.com
            </p>
          </div>

        </div>
      </div>

      {/* Business Info */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-lg font-bold">
            Business Info
          </h2>

          <button className="text-green-600 flex items-center gap-1 text-sm font-medium">
            <FiEdit2 size={16} />
            Edit
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">

          {/* Shop Preview */}
          <div className="p-4 flex gap-4">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNtksEcRj6vGLpTnEvtAX6v2FTAAErtgk5NgctOnNF_PDdJ2rFC2LciRGacCGHYWJ_LJqrijVnIuaE-nHL1beODVuCaDKBmiAfmh5ysq0imSWt2FBxDLKLjPHXH_eFxAt5Mi4dO3S2NsY3OUiDQc_4LrHSc9OD_OXBO1GcktcfDHDWVrE2lsxBtU9kdL1q87FgJrNoIuBqtKcNufipsVCSB5__x0Iq16p35rXeKzXDYH2mTq4vd2dWD2etvwMUWZF8CLtmczCLKXv3"
              alt="Shop"
              className="w-20 h-20 rounded-lg object-cover"
            />

            <div className="flex flex-col justify-center">
              <p className="text-xs font-medium uppercase text-gray-500">
                Shop Name
              </p>
              <p className="text-lg font-bold">
                Green Grocery
              </p>
              <p className="text-gray-500 text-sm">
                Retail • Founded 2021
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="px-4 pb-4">
            <div className="flex items-start gap-4 p-3 rounded-lg bg-gray-50">
              <div className="text-green-600 bg-green-100 p-2 rounded-lg">
                <FiMapPin size={18} />
              </div>

              <div>
                <p className="text-xs uppercase text-gray-500 font-medium">
                  Business Address
                </p>
                <p className="text-sm font-medium">
                  123 Business St, New York, NY 10001
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Identification */}
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

          {/* NID */}
          <div>
            <label className="text-xs uppercase text-gray-500 font-medium">
              NID Number
            </label>

            <div className="relative mt-2">
              <input
                type="text"
                value="****-****-1234"
                readOnly
                className="w-full bg-gray-50 rounded-lg py-3 px-4 text-sm font-mono tracking-widest"
              />

              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FiEyeOff size={18} />
              </button>
            </div>
          </div>

          {/* Document Uploads */}
          <div className="grid grid-cols-2 gap-4">

            {["NID Front", "NID Back"].map((label, index) => (
              <div key={index} className="space-y-2">

                <p className="text-xs uppercase text-gray-500 text-center font-medium">
                  {label}
                </p>

                <div className="aspect-[3/2] rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-100 transition">
                  <FiUploadCloud size={20} className="text-green-600" />
                  <span className="text-[10px] font-bold text-green-600">
                    UPDATE
                  </span>
                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </main>
  );
}