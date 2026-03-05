import React from 'react'
import PageHeader from '../Common/Header'

export default function SingleTransactionPage() {
  return (
    <main className="max-w-[380px] mx-auto w-full pb-24">

        <PageHeader title="Transaction Report" backTo="AUTO"></PageHeader>

    <div className="bg-gray-50 text-slate-900 antialiased min-h-screen">


  {/* Main */}
  <main className="px-4 mt-2">

    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

      {/* Table Header */}
      <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100">

        <div className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
          বিবরণ
        </div>

        <div className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
          দিলাম
        </div>

        <div className="py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
          পেলাম
        </div>

      </div>


      {/* Transaction Row */}
      <div className="grid grid-cols-3 items-stretch">

        {/* Description */}
        <div className="py-5 px-4 flex flex-col justify-center">

          <span className="text-[15px] font-semibold text-slate-800">
            ০৫ মার্চ, ২০২৫
          </span>

          <div className="flex items-center gap-1.5 mt-0.5">

            <span className="text-xs text-slate-400">
              ০৮:৫৫ AM
            </span>

            <span className="inline-block w-1 h-1 bg-slate-300 rounded-full"></span>

            <span className="text-xs text-slate-400">
              04/03
            </span>

          </div>

        </div>


        {/* Debit */}
        <div className="py-5 px-4 flex items-center justify-center bg-red-50 border-x border-gray-100">

          <div className="flex flex-col items-center">

            <span className="text-red-600 font-bold text-lg">
              ৬৫০.০০
            </span>

            <span className="text-[10px] text-red-400 font-medium uppercase mt-1">
              Debit
            </span>

          </div>

        </div>


        {/* Credit */}
        <div className="py-5 px-4 flex items-center justify-end">

          <div className="flex flex-col items-end opacity-20">
            <span className="text-slate-300 font-bold text-lg">
              —
            </span>
          </div>

        </div>

      </div>

    </div>


    {/* Buttons */}
    <div className="mt-8 flex gap-4">

      <button className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 border border-slate-200 bg-white text-slate-600 font-semibold rounded-xl hover:bg-gray-50 transition-all active:scale-[0.98]">

        <span className="material-symbols-outlined text-xl">
          delete_outline
        </span>

        <span className="text-[15px]">
          ডিলিট
        </span>

      </button>


      <button className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 border border-slate-900 bg-slate-900 text-white font-semibold rounded-xl hover:opacity-90 transition-all active:scale-[0.98]">

        <span className="material-symbols-outlined text-xl">
          edit
        </span>

        <span className="text-[15px]">
          এডিট
        </span>

      </button>

    </div>


    {/* Share */}
    <div className="mt-4">

      <button className="w-full flex items-center justify-center gap-2 py-3.5 px-4 border border-amber-200 bg-amber-50 text-amber-800 font-semibold rounded-xl transition-all active:scale-[0.98]">

        <span className="material-symbols-outlined text-xl">
          share
        </span>

        <span className="text-[15px]">
          শেয়ার করুন
        </span>

      </button>

    </div>

  </main>


  {/* Bottom Handle */}
  <div className="fixed bottom-0 w-full h-8 flex justify-center items-end pb-2 pointer-events-none">

    <div className="w-32 h-1.5 bg-slate-200 rounded-full"></div>

  </div>

</div>


  {/* Header */}
  {/* <div className="grid grid-cols-3 bg-gray-50 dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">

    <div className="py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
      বিবরণ
    </div>

    <div className="py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400 text-center">
      দিলাম
    </div>

    <div className="py-3 px-4 text-sm font-semibold text-slate-600 dark:text-slate-400 text-right">
      পেলাম
    </div>

  </div> */}


  {/* Transaction Row */}
  {/* <div className="grid grid-cols-3 border-b border-gray-100 dark:border-slate-800 items-stretch">

    <div className="py-4 px-4 flex flex-col justify-center">
      <span className="text-sm font-medium">
        ০৫ মার্চ, ২০২৫
      </span>

      <span className="text-xs text-slate-500 dark:text-slate-400">
        ০৮:৫৫ AM
      </span>

      <span className="text-xs text-slate-400 dark:text-slate-500">
        04/03
      </span>
    </div>


    <div className="py-4 px-4 flex items-center justify-center bg-red-50 dark:bg-red-950/20 border-x border-gray-100 dark:border-slate-800">
      <span className="text-primary font-bold text-lg leading-none">
        ৬৫০.০০
      </span>
    </div>

    <div className="py-4 px-4"></div>

  </div> */}


  {/* Buttons */}
  {/* <div className="p-6 flex gap-4">

    <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border-2 border-primary text-primary font-bold rounded-full hover:bg-red-50 dark:hover:bg-red-950/20 transition-all active:scale-95">

      <span className="material-icons-outlined text-xl">
        delete_outline
      </span>

      <span>ডিলিট</span>

    </button>


    <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border-2 border-primary text-primary font-bold rounded-full hover:bg-red-50 dark:hover:bg-red-950/20 transition-all active:scale-95">

      <span className="material-icons-outlined text-xl">
        edit
      </span>

      <span>এডিট</span>

    </button>

  </div> */}

</main>
  )
}
