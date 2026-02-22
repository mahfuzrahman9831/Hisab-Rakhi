import {
  IoArrowUp,
  IoArrowDown,
  IoFilter,
  IoDocumentText,
} from "react-icons/io5";
import { MdPayments } from "react-icons/md";
import { FaWallet } from "react-icons/fa";

export default function LedgerPage() {
  return (
    <main className="flex-1 overflow-y-auto pb-48">

      {/* Summary Cards */}
      <section className="p-4 grid grid-cols-2 gap-4">

        {/* Total Gave */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <IoArrowUp className="text-red-500 text-sm" />
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
              Total Gave
            </p>
          </div>
          <p className="text-gray-400 text-[10px] mb-2">মোট দিলাম</p>
          <p className="text-xl font-bold text-red-500">৳ 12,450</p>
        </div>

        {/* Total Received */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <IoArrowDown className="text-green-600 text-sm" />
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
              Total Received
            </p>
          </div>
          <p className="text-gray-400 text-[10px] mb-2">মোট পেলাম</p>
          <p className="text-xl font-bold text-green-600">৳ 8,200</p>
        </div>

      </section>

      {/* Net Balance */}
      <div className="mx-4 mb-6 p-4 bg-green-50 rounded-xl border border-green-100 flex justify-between items-center">
        <div>
          <p className="text-xs font-medium text-gray-600">
            Net Balance (অবশিষ্ট)
          </p>
          <p className="text-lg font-extrabold text-gray-900">
            ৳ 4,250
            <span className="text-xs font-normal text-red-500 ml-1">
              You'll Get
            </span>
          </p>
        </div>
        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
          <FaWallet className="text-green-600" />
        </div>
      </div>

      {/* Transactions */}
      <section className="px-4">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest">
            Transactions
          </h2>
          <button className="text-xs font-semibold text-green-600 flex items-center gap-1">
            <IoFilter size={14} />
            Filter
          </button>
        </div>

        {/* Example Transaction */}
        <div className="space-y-3">

          {/* Sell Example */}
          <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">

                {/* Date Box */}
                <div className="flex flex-col items-center justify-center bg-red-50 rounded-lg p-2 min-w-[50px]">
                  <span className="text-[10px] uppercase font-bold text-red-400">
                    Oct
                  </span>
                  <span className="text-lg font-black text-red-600 leading-none">
                    24
                  </span>
                </div>

                {/* Details */}
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Sell (দিলাম)
                  </p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <IoDocumentText size={14} />
                    2kg Sugar, 5L Oil
                  </p>
                  <p className="text-[10px] text-gray-400 mt-2 italic">
                    10:45 AM
                  </p>
                </div>
              </div>

              {/* Amount */}
              <div className="text-right">
                <p className="text-sm font-bold text-red-500">
                  - ৳ 850
                </p>
                <div className="mt-3 pt-2 border-t border-gray-100">
                  <p className="text-[9px] text-gray-400 uppercase font-semibold">
                    Balance
                  </p>
                  <p className="text-xs font-bold text-gray-600">
                    ৳ 4,250
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        

        <div className="py-10 text-center">
          <p className="text-gray-400 text-xs font-medium">
            End of transactions for October
          </p>
        </div>

      </section>
    </main>
  );
}